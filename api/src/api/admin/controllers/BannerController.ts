/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get,
    Put,
    Delete,
    Param,
    QueryParam,
    Post,
    Body,
    JsonController,
    Authorized,
    Res,
    Req
} from 'routing-controllers';
import { BannerService } from '../../core/services/BannerService';
import { env } from '../../../env';
import { Banner } from '../../core/models/Banner';
import { CreateBanner } from './requests/CreateBannerRequest';
import { UpdateBanner } from './requests/UpdateBannerRequest';
import { DeleteBannerRequest } from './requests/DeleteBannerRequest';
import * as fs from 'fs';
import { ProductService } from '../../core/services/ProductService';
import { CategoryService } from '../../core/services/CategoryService';
import { In, Not } from 'typeorm';
import { BannerImage } from '../../core/models/BannerImage';
import { BannerImageService } from '../../core/services/BannerImageService';

@JsonController('/banner')
export class BannerController {
    constructor(
        private bannerService: BannerService,
        private productService: ProductService, private categoryService: CategoryService,
        private bannerImageService: BannerImageService
    ) {
    }

    // Create Banner
    /**
     * @api {post} /api/banner Add Banner API
     * @apiGroup Banner
     * @apiParam (Request body) {String{..255}} title title
     * @apiParam (Request body) {String} [content] content
     * @apiParam (Request body) {String} [link] link
     * @apiParam (Request body) {String} [position] position
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} [linkType] linkType
     * @apiParam (Request body) {Array} [bannerImage] bannerImage
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "content" : "",
     *      "link" : "",
     *      "position" : "",
     *      "status" : "",
     *      "linkType" : "",
     *      "bannerImage": [{
     *                      "containerName": "",
     *                      "image": "",
     *                      "isPrimary": ""
     *                      }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "New banner is created successfully",
     *      "data": "{
     *                "createdBy": "",
     *                "createdDate": "",
     *                "modifiedBy": "",
     *                "modifiedDate": "",
     *                "bannerId": 1,
     *                "title": "",
     *                "sortOrder": "",
     *                "url": "",
     *                "link": "",
     *                "content": "",
     *                "position": "",
     *                "bannerGroupId": 1,
     *                "containerName": "",
     *                "viewPageCount": "",
     *                "isActive": "",
     *                "linkType": "",
     *                "bannerImages": [{
     *                                  "imageName": "",
     *                                  "imagePath": "",
     *                                  "isPrimary": "",
     *                                  "createdDate": "",
     *                                  "modifiedDate": "",
     *                                  "id": "",
     *                                  "bannerId": "",
     *                                  "isActive": "",
     *                                  "isDelete": ""
     *                                  }]
     *                }"
     * }
     * @apiSampleRequest /api/banner
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['admin', 'create-banners'])
    public async createBanner(@Body({ validate: true }) bannerParam: CreateBanner, @Res() response: any): Promise<any> {
        if (+bannerParam.linkType !== 1 && (bannerParam.link === undefined || bannerParam.link === '')) {
            return response.status(400).send({
                status: 0,
                message: 'Link is required',
            });
        }
        const bannerExist = await this.bannerService.findOne({
            where: {
                position: bannerParam.position,
            },
        });
        if (bannerExist) {
            return response.status(400).send({
                status: 0,
                message: 'Banner Position Already Exist.!',
            });
        }
        const newBanner = new Banner();
        newBanner.title = bannerParam.title;
        newBanner.content = bannerParam.content;
        let link;
        link = bannerParam.link;
        if (+bannerParam.linkType === 2) {
            const product = await this.productService.findOne({
                where: {
                    productSlug: link,
                },
            });
            if (!product) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid product slug',
                });
            }
            newBanner.linkType = bannerParam.linkType;
        } else if (+bannerParam.linkType === 3) {
            const category = await this.categoryService.findOne({
                where: {
                    categorySlug: link,
                },
            });
            if (!category) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid category slug',
                });
            }
            newBanner.linkType = bannerParam.linkType;
        } else {
            newBanner.linkType = bannerParam.linkType;
        }
        newBanner.link = link;
        newBanner.position = bannerParam.position;
        newBanner.isActive = bannerParam.status;
        const bannerImages = [];
        bannerParam.bannerImage.forEach(async (subImage) => {
            const newBannerImage = new BannerImage();
            newBannerImage.imageName = subImage.image;
            newBannerImage.imagePath = subImage.containerName;
            newBannerImage.isPrimary = subImage.isPrimary;
            bannerImages.push(newBannerImage);
        });
        newBanner.bannerImages = bannerImages;
        const bannerSave = await this.bannerService.create(newBanner);
        const successResponse: any = {
            status: 1,
            message: 'Successfully created new banner',
            data: bannerSave,
        };
        return response.status(200).send(successResponse);
    }

    // Banner List
    /**
     * @api {get} /api/banner Banner List API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got banner list",
     *      "data":"{
     *              "bannerId": 1,
     *              "title": "",
     *              "content": "",
     *              "image": "",
     *              "imagePath": "",
     *              "link": "",
     *              "position": "",
     *              "bannerImages": [
     *                  {
     *                      "createdDate": "",
     *                      "modifiedDate": "",
     *                      "id": "",
     *                      "imageName": "",
     *                      "imagePath": "",
     *                      "isPrimary": "",
     *                      "bannerId": "",
     *                      }
     *                  ]
     *              }"
     * }
     * @apiSampleRequest /api/banner
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['admin', 'list-banners'])
    public async bannerList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [];
        const search = [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        const relations = [
            {
                tableName: 'bannerImages',
            },
        ];

        const WhereConditions = [];
        const bannerList: any = await this.bannerService.list(limit, offset, select, relations, search, WhereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got banner count',
                data: bannerList,
            };
            return response.status(200).send(successRes);
        }
        const list = bannerList.map(async (value: any) => {
            const temp: any = value;
            if (+temp.linkType === 2) {
                const productRedirectUrl = env.productRedirectUrl;
                temp.link = productRedirectUrl.concat(temp.link);
            } else if (+temp.linkType === 3) {
                const categoryRedirectUrl = env.categoryRedirectUrl;
                temp.link = categoryRedirectUrl.concat(temp.link).concat('?offset=0');
            } else {
                temp.link = temp.link;
            }
            return temp;
        });
        const result = await Promise.all(list);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got banner list',
            data: result,
        };
        return response.status(200).send(successResponse);
    }

    // Delete Banner
    /**
     * @api {delete} /api/banner/:id Delete Banner API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "bannerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Banner",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/banner/:id
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    @Authorized()
    public async deleteBanner(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const banner = await this.bannerService.findOne({
            where: {
                bannerId: id,
            },
        });
        if (!banner) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Banner Id',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteBanner = await this.bannerService.delete(banner);
        if (deleteBanner) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted banner',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete banner',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update Banner
    /**
     * @api {put} /api/banner/:id Update Banner API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} bannerId Banner bannerId
     * @apiParam (Request body) {String{..255}} title Banner title
     * @apiParam (Request body) {String} bannerImages Banner images
     * @apiParam (Request body) {String} [content] Banner content
     * @apiParam (Request body) {String{..255}} [link] Banner link
     * @apiParam (Request body) {Number} [position] Banner position
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} [linkType] 1--> static 2--> product 3--> category
     * @apiParam (Request body) {Array} [bannerImage] bannerImage
     * @apiParamExample {json} Input
     * {
     *      "bannerId" : "",
     *      "title" : "",
     *      "content" : "",
     *      "link" : "",
     *      "position" : "",
     *      "status" : "",
     *      "linkType" : "",
     *      "bannerImage": [{
     *                      "containerName": "",
     *                      "image": "",
     *                      "isPrimary": ""
     *                      }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated banner.",
     *      "status": "1",
     *      "data": "{
     *                "createdBy": "",
     *                "createdDate": "",
     *                "modifiedBy": "",
     *                "modifiedDate": "",
     *                "bannerId": "",
     *                "title": "",
     *                "sortOrder": "",
     *                "url": "",
     *                "link": "",
     *                "content": "",
     *                "position": "",
     *                "bannerGroupId": "",
     *                "bannerImages": "",
     *                "containerName": "",
     *                "viewPageCount": "",
     *                "isActive": "",
     *                "linkType": "",
     *                "bannerImages": [
     *                  {
     *                      "createdDate": "",
     *                      "modifiedDate": "",
     *                      "id": "",
     *                      "imageName": "",
     *                      "imagePath": "",
     *                      "isPrimary": "",
     *                      "bannerId": "",
     *                      }
     *                  ]
     *              }"
     * }
     * @apiSampleRequest /api/banner/:id
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/:id')
    @Authorized(['admin', 'edit-banners'])
    public async updateBanner(@Body({ validate: true }) bannerParam: UpdateBanner, @Res() response: any, @Req() request: any): Promise<any> {

        if (+bannerParam.linkType !== 1 && (bannerParam.link === undefined || bannerParam.link === '')) {
            return response.status(400).send({
                status: 0,
                message: 'Link is required',
            });
        }
        const bannerImageId = [];
        bannerParam.bannerImage.forEach((bannerImage) => {
            if (bannerImage.bannerImageId) {
                bannerImageId.push(bannerImage.bannerImageId);
            }
        });

        await this.bannerImageService.delete({ id: Not(In(bannerImageId)), bannerId: bannerParam.bannerId });
        const banner = await this.bannerService.findOne({
            where: {
                bannerId: bannerParam.bannerId,
            },
            relations: ['bannerImages'],
        });

        if (!banner) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Banner Id',
            };
            return response.status(400).send(errorResponse);
        }
        const bannerExist = await this.bannerService.findOne({
            where: {
                bannerId: Not(bannerParam.bannerId),
                position: bannerParam.position,
            },
        });
        if (bannerExist) {
            return response.status(400).send({
                status: 0,
                message: 'Banner Position Already Exist.!',
            });
        }
        banner.title = bannerParam.title;
        banner.content = bannerParam.content;
        let link;
        link = bannerParam.link;
        if (+bannerParam.linkType === 2) {
            const product = await this.productService.findOne({
                where: {
                    productSlug: link,
                },
            });
            if (!product) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid product slug',
                });
            }
            banner.linkType = bannerParam.linkType;
        } else if (+bannerParam.linkType === 3) {
            const category = await this.categoryService.findOne({
                where: {
                    categorySlug: link,
                },
            });
            if (!category) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid category slug',
                });
            }
            banner.linkType = bannerParam.linkType;
        } else {
            banner.linkType = bannerParam.linkType;
        }
        banner.link = link;
        banner.position = bannerParam.position;
        banner.isActive = bannerParam.status;

        bannerParam.bannerImage.forEach(async (bannerImage) => {
            const newbannerImage = new BannerImage();
            if (bannerImage.bannerImageId) {
                newbannerImage.id = bannerImage.bannerImageId;
            }
            newbannerImage.imageName = bannerImage.image;
            newbannerImage.imagePath = bannerImage.containerName;
            newbannerImage.isPrimary = bannerImage.isPrimary;
            newbannerImage.bannerId = bannerParam.bannerId;
            await this.bannerImageService.create(newbannerImage);
        });
        const bannerSave = await this.bannerService.update(banner);
        const successResponse: any = {
            status: 1,
            message: 'Successfully updated banner',
            data: bannerSave,
        };
        return response.status(200).send(successResponse);
    }

    // Delete Multiple Banner API

    /**
     * @api {post} /api/banner/delete-banner Delete Multiple Banner API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} bannerId  bannerId
     * @apiParamExample {json} Input
     * {
     * "bannerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Banner",
     * "status": "1"
     * }
     * @apiSampleRequest /api/banner/delete-banner
     * @apiErrorExample {json} bannerDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-banner')
    @Authorized(['admin', 'delete-banners'])
    public async deleteMultipleBanner(@Body({ validate: true }) bannerDelete: DeleteBannerRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const bannerIdNo = bannerDelete.bannerId.toString();
        const bannerid = bannerIdNo.split(',');
        for (const id of bannerid) {
            const dataId = await this.bannerService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose a banner that you want to delete',
                };
                return response.status(400).send(errorResponse);
            } else {
                const deleteBannerId = parseInt(id, 10);
                await this.bannerService.delete(deleteBannerId);
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted banner',
        };
        return response.status(200).send(successResponse);
    }

    // Banner Count API
    /**
     * @api {get} /api/banner/banner-count Banner Count API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get banner count",
     *      "status": "1"
     *      "data": "{
     *      "totalBanner": "",
     *      "activeBanner": "",
     *      "inActiveBanner": ""
     *      }"
     * }
     * @apiSampleRequest /api/banner/banner-count
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/banner-count')
    @Authorized()
    public async bannerCount(@Res() response: any): Promise<any> {
        const banner: any = {};
        const select = [];
        const search = [];
        const WhereConditions = [];
        const allBannerCount = await this.bannerService.list(0, 0, select, [], search, WhereConditions, 1);
        const whereConditionsActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 1,
            },
        ];
        const activeBannerCount = await this.bannerService.list(0, 0, select, [], search, whereConditionsActive, 1);
        const whereConditionsInActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 0,
            },
        ];
        const inActiveBannerCount = await this.bannerService.list(0, 0, select, [], search, whereConditionsInActive, 1);
        banner.totalBanner = allBannerCount;
        banner.activeBanner = activeBannerCount;
        banner.inActiveBanner = inActiveBannerCount;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the banner count',
            data: banner,
        };
        return response.status(200).send(successResponse);
    }

    // Blog Detail
    /**
     * @api {get} /api/banner/banner-detail Banner Detail API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} bannerId BannerId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Successfully got Banner detail",
     *      "data": "{
     *               "createdBy": "",
     *               "createdDate": "",
     *               "modifiedBy": "",
     *               "modifiedDate": "",
     *               "bannerId": "",
     *               "title": "",
     *               "sortOrder": "",
     *               "url": "",
     *               "link": "",
     *               "content": "",
     *               "position": "",
     *               "bannerGroupId": "",
     *               "containerName": "",
     *               "viewPageCount": "",
     *               "isActive": "",
     *               "linkType": "",
     *               "bannerImages": [{
     *                                    "createdDate": "",
     *                                    "modifiedDate": "",
     *                                    "id": "",
     *                                    "imageName": "",
     *                                    "imagePath": "",
     *                                    "isPrimary": "",
     *                                    "bannerId": "",
     *                                    }]
     *               }"
     * }
     * @apiSampleRequest /api/banner/banner-detail
     * @apiErrorExample {json} banner Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/banner-detail')
    @Authorized()
    public async BannerDetail(@QueryParam('bannerId') bannerId: number, @Res() response: any): Promise<any> {
        const banner = await this.bannerService.findOne({
            where: {
                bannerId,
            },
            relations: ['bannerImages'],
        });
        banner.content = banner.content?.replace(/"/g, `'`) ?? '';
        if (!banner) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Banner Id',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got banner detail',
            data: banner,
        };
        return response.status(200).send(successResponse);
    }

    // Banner Excel Document download
    /**
     * @api {get} /api/banner/banner-excel-list Banner Excel
     * @apiGroup Banner
     * @apiParam (Request body) {String} bannerId bannerId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Banner Excel List",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/banner/banner-excel-list
     * @apiErrorExample {json} banner Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/banner-excel-list')
    public async bannerView(@QueryParam('bannerId') bannerId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('banner excel Sheet');
        const rows = [];
        if (bannerId === '') {
            const errorResponse: any = {
                status: 0,
                message: 'choose atleast one banner',
            };
            return response.status(400).send(errorResponse);
        }
        const bannerid = bannerId.split(',');
        for (const id of bannerid) {
            const dataId = await this.bannerService.findOne({ where: { bannerId: id } });
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid bannerId',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'title', key: 'title', size: 16, width: 15 },
            { header: 'link', key: 'link', size: 16, width: 15 },
            { header: 'position', key: 'position', size: 16, width: 15 },
            { header: 'image url', key: 'image', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const id of bannerid) {
            const dataId = await this.bannerService.findOne(id);
            const image = env.imageUrl + '?path=' + dataId.imagePath + '&name=' + dataId.image + '&width=100&height=100';
            rows.push([dataId.title, dataId.link, dataId.position, image]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './BannerExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }
}
