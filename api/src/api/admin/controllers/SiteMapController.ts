/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { JsonController, Post, Get, Delete, Req, Res, Authorized, Param, QueryParam } from 'routing-controllers';
import { SiteMapService } from '../../core/services/SiteMapService';
import { UserService } from '../../../../src/api/core/services/UserService';
import { SiteMap } from '../../core/models/SiteMapModel';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { CategoryService } from '../../../../src/api/core/services/CategoryService';
import { PageService } from '../../../../src/api/core/services/PageService';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import * as fs from 'fs';
import { env } from '../../../../src/env';
import * as path from 'path';
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
import { Service } from 'typedi';

@Service()
// @UseBefore(CheckAddonMiddleware)
@JsonController('/site-map')
export class SiteMapController {
    constructor(
        private siteMapService: SiteMapService,
        private userService: UserService,
        private productService: ProductService,
        private categoryService: CategoryService,
        private pageService: PageService
    ) { }

    // Create site map
    /**
     * @api {Post} /api/site-map Create site map
     * @apiGroup Site Map
     * @apiHeader {string} Authorization
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1",
     *      "message": "Successfully created !!",
     *       "data": {
     *       "siteMapId": 1,
     *       "userId": 1,
     *        "userName": "",
     *        "pathName": "",
     *        "fileName": ""
     *      }
     * }
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/site-map
     * @apiErrorExample {json } createSiteMap  Error
     * HTTP/1.1 500 Internal server error
     */
    @Post()
    @Authorized(['admin', 'site-map-seo'])
    public async createSiteMap(@Req() request: any, @Res() response: any): Promise<any> {
        const userData = await this.userService.findOne({
            where: {
                userId: request.user.userId,
                deleteFlag: 0,
            },
        });

        if (!userData) {
            const errorMessage = {
                status: 0,
                message: 'Invalid user !!',
            };
            return response.status(400).send(errorMessage);
        }

        const allURLs = [];
        allURLs.push(env.storeRedirectUrl);
        const findProduct = await this.productService.find({ select: ['productSlug'], where: { isActive: 1 } });
        const productDefaultUrl = env.storeRedirectUrl + '/products/';
        findProduct.map((val) => {
            if (val.productSlug) {
                const productUrl = productDefaultUrl + val.productSlug;
                allURLs.push(productUrl);
            }
        });
        const findCategory = await this.categoryService.find({ select: ['categorySlug'], where: { isActive: 1 } });
        const categoryDefaultUrl = env.storeRedirectUrl + '/product/';
        findCategory.map((val) => {
            if (val.categorySlug) {
                const categoryUrl = categoryDefaultUrl + val.categorySlug;
                allURLs.push(categoryUrl);
            }
        });
        const findPages = await this.pageService.findAll({ select: ['slugName'], where: { isActive: 1 } });
        const pageDefaultUrl = env.storeRedirectUrl + '/page-detail/';
        findPages.map((val) => {
            if (val.slugName) {
                const pagesUrl = pageDefaultUrl + val.slugName;
                allURLs.push(pagesUrl);
            }
        });
        const arr = ['/buyer-login', '/buyer-signup', '/contact', '/seller', '/wishlist'];
        arr.map((val) => {
            if (val) {
                const staticUrl = env.storeRedirectUrl + val;
                allURLs.push(staticUrl);
            }
        });
        if (allURLs) {
            const currentDate = Date.now();
            const pathName = 'sitemap/';
            const fileName = 'sitemap_' + currentDate + '.xml';
            await this.urlsToSitemap(env.storeRedirectUrl, allURLs.sort(), pathName, fileName);
            const newSiteMap = new SiteMap();
            newSiteMap.userId = userData.userId;
            newSiteMap.userName = userData.firstName + ' ' + userData.lastName;
            newSiteMap.pathName = pathName;
            newSiteMap.fileName = fileName;
            const createSiteMap = await this.siteMapService.create(newSiteMap);
            if (createSiteMap) {
                const successExample = {
                    status: 1,
                    message: 'Successfully created !!',
                    data: createSiteMap,
                };
                return response.status(200).send(successExample);
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to created the data !!',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // List the site map
    /**
     * @api {Get} /api/site-map Site map list
     * @apiGroup Site Map
     * @apiHeader {string} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1",
     *      "message": "Successfully got the list !!"
     * },
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/site-map
     * @apiErrorExample {json} listSiteMap Error
     * HTTP/1.1 500 Internal server error
     */
    @Authorized()
    @Get()
    public async listSiteMap(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const siteMapList = await this.siteMapService.list(limit, offset, [], [], [], count);
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

    // Delete the site map
    /**
     * @api {Delete} /api/site-map/:id Delete site map
     * @apiGroup Site Map
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * {
     *      "status": "1",
     *      "message": "Successfully Deleted the data !!"
     * },
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/site-map/:id
     * @apiErrorExample {json} Delete SiteMap Error
     * HTTP/1.1 500 Internal server error
     */
    @Authorized()
    @Delete('/:id')
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

    // Download SiteMap API
    /**
     * @api {Get} /api/site-map/get-sitemap Get Sitemap API
     * @apiGroup Site Map
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} pathName pathName
     * @apiSampleRequest /api/site-map/get-sitemap
     * @apiErrorExample {json} Get Profile error
     * HTTP/1.1 500 Internal Server Error
     */
    // Get Profile Function
    @Get('/get-sitemap')
    @Authorized()
    public async getSitempap(@QueryParam('pathName') pathName: string, @Req() request: any, @Res() response: any): Promise<any> {
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

            // return new Promise((resolve, reject) => {
            //     const filePath = pathName + fileName;
            //     fs.writeFile(filePath, data.toString(), (err) => {
            //         if (err) { throw err; }
            //         resolve('sitemap created');
            //     });
            // });
            const filePath = path.resolve(pathName, fileName);
            await new Promise((resolve, reject) => {
                fs.writeFile(filePath, data.toString(), (err) => {
                    if (err) {
                        console.error('Error writing sitemap file:', err);
                        return reject(err);
                    }
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
