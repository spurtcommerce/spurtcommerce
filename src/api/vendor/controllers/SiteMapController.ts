/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { JsonController, Post, Get, Delete, Req, Res, Authorized, Param, QueryParam } from 'routing-controllers';
import { SiteMapService } from '../../core/services/SiteMapService';
import { SiteMap } from '../../core/models/SiteMap';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { CategoryService } from '../../../../src/api/core/services/CategoryService';
import { PageService } from '../../../../src/api/core/services/PageService';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import * as fs from 'fs';
import * as path from 'path';
import { VendorUsersService } from '../../../../src/api/core/services/VendorUsersService';
import { Service } from 'typedi';
import { VendorSettingsService } from '../../../../src/api/core/services/VendorSettingsService';
@Service()
@JsonController('/vendor-site-map')
export class VendorSiteMapController {
    constructor(
        private siteMapService: SiteMapService,
        private productService: ProductService,
        private categoryService: CategoryService,
        private pageService: PageService,
        private vendorUsersService: VendorUsersService,
        private vendorSettingsService: VendorSettingsService
    ) { }

    /**
     * @api {post} /api/vendor-site-map Generate Vendor Sitemap
     * @apiGroup Vendor Site Map
     * @apiName CreateVendorSiteMap
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully created siteMap!",
     *         "data": {
     *             "siteMapId": 1,
     *             "userId": 1,
     *             "userName": "Vendor Admin",
     *             "pathName": "sitemap/",
     *             "fileName": "sitemap_1680000000.xml",
     *             "tenantId": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-User:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid user!"
     *     }
     *
     * @apiSampleRequest /api/vendor-site-map
     */
    @Post()
    @Authorized(['vendor', 'seo-site-map'])
    public async createSiteMap(@Req() request: any, @Res() response: any): Promise<any> {
        const userData = await this.vendorUsersService.findOne({
            where: {
                id: request.user.id,
                deleteFlag: 0,
            },
        });

        if (!userData) {
            const errorMessage = {
                status: 0,
                message: 'Invalid user!',
            };
            return response.status(400).send(errorMessage);
        }

        const allURLs = [];
        const vendorSetting = await this.vendorSettingsService.findOne({ where: { vendorId: request.user.tenantId } });
        const redirectUrl = vendorSetting.storeUrl;

        allURLs.push(redirectUrl);
        const findProduct = await this.productService.find({ select: ['productSlug'], where: { isActive: 1 } });
        const productDefaultUrl = redirectUrl + '/products/';
        findProduct.map((val) => {
            if (val.productSlug) {
                const productUrl = productDefaultUrl + val.productSlug;
                allURLs.push(productUrl);
            }
        });
        const findCategory = await this.categoryService.find({ select: ['categorySlug'], where: { isActive: 1 } });
        const categoryDefaultUrl = redirectUrl + '/product/';
        findCategory.map((val) => {
            if (val.categorySlug) {
                const categoryUrl = categoryDefaultUrl + val.categorySlug;
                allURLs.push(categoryUrl);
            }
        });
        const findPages = await this.pageService.findAll({ select: ['slugName'], where: { isActive: 1 } });
        const pageDefaultUrl = redirectUrl + '/page-detail/';
        findPages.map((val) => {
            if (val.slugName) {
                const pagesUrl = pageDefaultUrl + val.slugName;
                allURLs.push(pagesUrl);
            }
        });
        const arr = ['/buyer-login', '/buyer-signup', '/contact', '/seller', '/wishlist'];
        arr.map((val) => {
            if (val) {
                const staticUrl = redirectUrl + val;
                allURLs.push(staticUrl);
            }
        });
        if (allURLs) {
            const currentDate = Date.now();
            const pathName = 'sitemap/';
            const fileName = 'sitemap_' + currentDate + '.xml';
            await this.urlsToSitemap(redirectUrl, allURLs.sort(), pathName, fileName);
            const newSiteMap = new SiteMap();
            newSiteMap.userId = userData.id;
            newSiteMap.userName = userData.firstName + ' ' + userData.lastName;
            newSiteMap.pathName = pathName;
            newSiteMap.fileName = fileName;
            newSiteMap.tenantId = request.user.tenantId;
            const createSiteMap = await this.siteMapService.create(newSiteMap);
            if (createSiteMap) {
                const successExample = {
                    status: 1,
                    message: 'Successfully created siteMap!',
                    data: createSiteMap,
                };
                return response.status(200).send(successExample);
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to created the data!!',
            };
            return response.status(400).send(errorResponse);
        }
    }
    /**
     * @api {get} /api/vendor-site-map List Vendor Sitemaps
     * @apiGroup Vendor Site Map
     * @apiName VendorSiteMapList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {Number} [count] Return count only if 1
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got the list !!",
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "fileName": "sitemap_1680000000.xml",
     *                 "pathName": "sitemap/",
     *                 "createdDate": "2024-01-01T00:00:00.000Z"
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-site-map
     */
    @Get()
    @Authorized(['vendor', 'seo-site-map'])
    public async listSiteMap(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const whereConditions = [
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
        ];
        const siteMapList = await this.siteMapService.list(limit, offset, [], [], whereConditions, count);
        if (count) {
            const successResponse = {
                status: 1,
                message: 'Successfully got the count !!',
                count: siteMapList,
            };
            return response.status(200).send(successResponse);
        } else {
            const successResponse = {
                status: 1,
                message: 'Successfully got the list !!',
                data: siteMapList,
            };
            return response.status(200).send(successResponse);
        }
    }

    /**
     * @api {delete} /api/vendor-site-map/:id Delete Vendor Sitemap
     * @apiGroup Vendor Site Map
     * @apiName DeleteVendorSiteMap
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} id Sitemap ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully Deleted the data !!"
     *     }
     *
     * @apiErrorExample {json} Delete-Failed:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Unable to Deleted the data !!"
     *     }
     *
     * @apiSampleRequest /api/vendor-site-map/:id
     */
    @Delete('/:id')
    @Authorized(['vendor', 'seo-site-map'])
    public async deleteSiteMap(@Param('id') id: number, @Res() response: any): Promise<any> {
        const deleteData = await this.siteMapService.delete(id);
        if (deleteData) {
            const successResponse = {
                status: 1,
                message: 'Successfully Deleted the data !!',
            };
            return response.status(200).send(successResponse);
        }
        const errorResponse = {
            status: 0,
            message: 'Unable to Deleted the data !!',
        };
        return response.status(400).send(errorResponse);
    }

    /**
     * @api {get} /api/vendor-site-map/get-sitemap Download Vendor Sitemap File
     * @apiGroup Vendor Site Map
     * @apiName DownloadVendorSiteMap
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {String} pathName Relative path to sitemap file
     *
     * @apiSuccessExample {file} Success-Response:
     *     HTTP/1.1 200 OK
     *     Content-Type: application/xml
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "File download failed"
     *     }
     *
     * @apiSampleRequest /api/vendor-site-map/get-sitemap
     */
    @Get('/get-sitemap')
    @Authorized(['vendor', 'seo-site-map'])
    public async getSitempap(@QueryParam('pathName') pathName: string, @Res() response: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const pathDir = path.join(process.cwd(), pathName);
            response.download(pathDir, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    return response.end();
                }
            });
        });
    }

    public async urlsToSitemap(URL: string, allURLs: string[], pathName: string, fileName: string): Promise<any> {
        try {
            const links = allURLs.map((url) => {
                return { url, changefreq: 'weekly', priority: 0.5 };
            });
            const stream = new SitemapStream({ hostname: URL });
            const data = await streamToPromise(Readable.from(links).pipe(stream));

            const filePath = path.resolve(pathName, fileName);
            await new Promise((resolve, reject) => {
                fs.writeFile(filePath, data.toString(), (err) => {
                    if (err) {
                        console.error('Error writing sitemap file:', err);
                        return reject(err);
                    }
                    console.log('Sitemap created:', filePath);
                    resolve('Sitemap created');
                });
            });

            return 'Sitemap created';
        } catch (error) {
            console.error('Error generating sitemap:', error);
            throw new Error('Failed to generate sitemap');
        }
    }
}
