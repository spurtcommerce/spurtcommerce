/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
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
import {BannerService} from '../services/BannerService';
import {env} from '../../env';
import {Banner} from '../models/Banner';
import {CreateBanner} from './requests/CreateBannerRequest';
import {UpdateBanner} from './requests/UpdateBannerRequest';
import {S3Service} from '../services/S3Service';
import {ImageService} from '../services/ImageService';
import {DeleteBannerRequest} from './requests/DeleteBannerRequest';

@JsonController('/banner')
export class BannerController {
    constructor(private bannerService: BannerService, private s3Service: S3Service,
                private imageService: ImageService) {
    }

    // Create Banner
    /**
     * @api {post} /api/banner/add-banner Add Banner API
     * @apiGroup Banner
     * @apiParam (Request body) {String} title title
     * @apiParam (Request body) {String} content content
     * @apiParam (Request body) {String} image image
     * @apiParam (Request body) {String} link link
     * @apiParam (Request body) {String} position position
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "content" : "",
     *      "image" : "",
     *      "link" : "",
     *      "position" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New banner is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/banner/add-banner
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-banner')
    @Authorized()
    public async createBanner(@Body({validate: true}) bannerParam: CreateBanner, @Res() response: any): Promise<any> {
        const image = bannerParam.image;
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'banner/';
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }
            const newBanner = new Banner();
            newBanner.title = bannerParam.title;
            newBanner.content = bannerParam.content;
            newBanner.image = name;
            newBanner.imagePath = path;
            newBanner.link = bannerParam.link;
            newBanner.position = bannerParam.position;
            newBanner.isActive = bannerParam.status;
            const bannerSave = await this.bannerService.create(newBanner);
   console.log(bannerSave + 'comminggg');
            if (bannerSave) {
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully created new banner.',
                    data: bannerSave,
                };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Unable to create new banner. ',
                };
                return response.status(400).send(errorResponse);
            }
        }
    }

    // Banner List
    /**
     * @api {get} /api/banner/bannerlist Banner List API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got banner list",
     *      "data":"{
     *      "bannerId": "",
     *      "title": "",
     *      "content": "",
     *      "image": "",
     *      "imagePath": "",
     *      "link": "",
     *      "position": "",
     *      }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/banner/bannerlist
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/bannerlist')
    @Authorized()
    public async bannerList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status')status: number, @QueryParam('count')count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['bannerId', 'title', 'image', 'imagePath', 'content', 'link', 'position', 'isActive'];
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
        const WhereConditions = [];
        const bannerList: any = await this.bannerService.list(limit, offset, select, search, WhereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got banner count',
                data: bannerList,
            };
            return response.status(200).send(successRes);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got banner list',
            data: bannerList,
        };
        return response.status(200).send(successResponse);
    }

    // Delete Banner
    /**
     * @api {delete} /api/banner/delete-banner/:id Delete Banner API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "bannerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Banner.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/banner/delete-banner/:id
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-banner/:id')
    @Authorized()
    public async deleteBanner(@Param('id')id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const banner = await this.bannerService.findOne({
            where: {
                bannerId: id,
            },
        });
        if (!banner) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid BannerId',
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
                message: 'unable to delete banner',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update Banner
    /**
     * @api {put} /api/banner/update-banner/:id Update Banner API
     * @apiGroup Banner
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} bannerId Banner bannerId
     * @apiParam (Request body) {String} title Banner title
     * @apiParam (Request body) {String} image Banner image
     * @apiParam (Request body) {String} content Banner content
     * @apiParam (Request body) {String} link Banner link
     * @apiParam (Request body) {Number} position Banner position
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "bannerId" : "",
     *      "title" : "",
     *      "image" : "",
     *      "content" : "",
     *      "link" : "",
     *      "position" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated banner.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/banner/update-banner/:id
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-banner/:id')
    @Authorized()
    public async updateBanner(@Body({validate: true}) bannerParam: UpdateBanner, @Res() response: any, @Req() request: any): Promise<any> {

        const banner = await this.bannerService.findOne({
            where: {
                bannerId: bannerParam.bannerId,
            },
        });
        if (!banner) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid BannerId',
            };
            return response.status(400).send(errorResponse);
        }
        const image = bannerParam.image;
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'banner/';
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }
            banner.image = name;
            banner.imagePath = path;
        }
        banner.title = bannerParam.title;
        banner.content = bannerParam.content;
        banner.link = bannerParam.link;
        banner.position = bannerParam.position;
        banner.isActive = bannerParam.status;
        const bannerSave = await this.bannerService.create(banner);

        if (bannerSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated banner.',
                data: bannerSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the banner list. ',
            };
            return response.status(400).send(errorResponse);
        }
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
     * "message": "Successfully deleted Banner.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/banner/delete-banner
     * @apiErrorExample {json} bannerDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-banner')
    @Authorized()
    public async deleteMultipleBanner(@Body({validate: true}) bannerDelete: DeleteBannerRequest , @Res() response: any, @Req() request: any): Promise<any> {

        const bannerIdNo = bannerDelete.bannerId.toString();
        const bannerid = bannerIdNo.split(',');
        for ( const id of bannerid ) {
            const dataId = await this.bannerService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose banner for delete',
                };
                return response.status(400).send(errorResponse);
            } else {
                const deleteBannerId = parseInt(id, 10);
                await this.bannerService.delete(deleteBannerId);
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted Banner',
        };
        return response.status(200).send(successResponse);
    }
}
