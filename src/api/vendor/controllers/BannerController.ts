/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Put, Delete, Param, QueryParam, Post, Body, JsonController, Authorized, Res, Req } from 'routing-controllers';
import { BannerService } from '../../core/services/BannerService';
import { env } from '../../../env';
import { Banner } from '../../core/models/Banner';
import { CreateBanner } from './requests/CreateBannerRequest';
import { UpdateBanner } from './requests/UpdateBannerRequest';
import { VendorService } from '../../core/services/VendorService';
import { S3Service } from '../../core/services/S3Service';
import { ProductService } from '../../core/services/ProductService';
import { CategoryService } from '../../core/services/CategoryService';
import { Not } from 'typeorm';
import { BannerImage } from '../../core/models/BannerImage';
import { BannerImageService } from '../../core/services/BannerImageService';
import { Service } from 'typedi';
import { Vendor } from '../..//core/models/Vendor';

@Service()
@JsonController('/banner')
export class BannerController {
    constructor(
        private bannerService: BannerService,
        private productService: ProductService,
        private categoryService: CategoryService,
        private bannerImageService: BannerImageService,
        private vendorService: VendorService,
        private s3Service: S3Service
    ) {
    }

    /**
     * @api {post} /api/banner Create Banner
     * @apiGroup Banner
     * @apiName CreateBanner
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiBody {String} title               Banner title (max 255 characters)
     * @apiBody {String} [content]           Banner content/HTML
     * @apiBody {String} [link]              Banner target link/URL
     * @apiBody {String} [position]          Banner position
     * @apiBody {Number} status              Status (1: Active, 0: Inactive)
     * @apiBody {Number} [linkType]          Link type (1: None, 2: Category, 3: Product)
     * @apiBody {Object[]} bannerImage       Array of banner image objects
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "New banner is created successfully.",
     *         "data": {
     *             "bannerId": 1,
     *             "title": "Summer Sale",
     *             "content": "Special Offers",
     *             "link": "summer-sale",
     *             "position": "top",
     *             "linkType": 1,
     *             "isActive": 1,
     *             "bannerImages": [
     *                 {
     *                     "id": 1,
     *                     "imageName": "banner.jpg",
     *                     "imagePath": "banners/",
     *                     "isPrimary": 1
     *                 }
     *             ]
     *         }
     *     }
     *
     * @apiErrorExample {json} Link-Required:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Link is required."
     *     }
     *
     * @apiErrorExample {json} Position-Exists:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Banner Position Already Exist.!"
     *     }
     *
     * @apiSampleRequest /api/banner
     */
    @Post()
    @Authorized(['vendor', 'create-banners'])
    public async createBanner(@Body({ validate: true }) bannerParam: CreateBanner, @Res() response: any, @Req() request: any): Promise<any> {
        if (+bannerParam.linkType !== 1 && (bannerParam.link === undefined || bannerParam.link === '')) {
            return response.status(400).send({
                status: 0,
                message: 'Link is requiredOops! The link is required.',
            });
        }
        const bannerExist = await this.bannerService.findOne({
            where: {
                position: bannerParam.position,
                tenantId: request.user.tenantId,
            },
        });
        if (bannerExist) {
            return response.status(400).send({
                status: 0,
                message: 'Banner Position Already Exist.!',
            });
        }

        if (+bannerParam.linkType === 2) {
            const product = await this.productService.findOne({ where: { productSlug: bannerParam.link } });
            if (!product) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid product slug.',
                });
            }
        }

        if (+bannerParam.linkType === 3) {
            const category = await this.categoryService.findOne({ where: { categorySlug: bannerParam.link } });
            if (!category) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid category slug.',
                });
            }
        }

        const vendorInfo: Vendor = await this.vendorService.findOne({
            select: ['vendorId', 'vendorPrefixId'],
            where: { userId: request.user.userId },
        });
        const vendorPrefix: string = vendorInfo?.vendorPrefixId;

        const newBanner = new Banner();
        newBanner.title = bannerParam.title;
        newBanner.content = bannerParam.content;
        newBanner.tenantId = request.user.tenantId;
        newBanner.link = bannerParam.link;
        newBanner.linkType = bannerParam.linkType;
        newBanner.position = bannerParam.position;
        newBanner.isActive = bannerParam.status;

        const bannerImages: BannerImage[] = [];

        for (const subImage of bannerParam.bannerImage) {

            const base64 = subImage.imageBase64;
            const path = vendorPrefix;
            const base64Data = Buffer.from(base64.split(',')[1], 'base64');
            const type = base64.split(';')[0].split(':')[1].toString();
            const mime = require('mime');
            const ext = mime.getExtension(type);
            const availableImageType = env.availImageTypes.split(',');

            if (!availableImageType.includes(ext)) {
                const errorTypeResponse: any = {
                    status: 0,
                    message: 'Only ' + env.availImageTypes + ' Types are Allowed',
                };
                return response.status(400).send(errorTypeResponse);
            }

            const name = 'Banner_' + Date.now() + '.' + ext;
            const stringLength = base64.replace(/^data:image\/\w+;base64,/, '').length;
            const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            const sizeInKb = sizeInBytes / 1024;

            const allowedSize = +env.imageUploadSize * 1024;

            if (+sizeInKb <= allowedSize) {
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload(path === '' ? name : path + name, base64Data, type, 0);
                }
            } else {
                return response.status(400).send({
                    status: 0,
                    message: 'Image size too large.',
                });
            }

            const bannerImage = new BannerImage();
            bannerImage.imageName = name;
            bannerImage.imagePath = path;
            bannerImage.isPrimary = subImage.isPrimary;
            bannerImages.push(bannerImage);
        }

        newBanner.bannerImages = bannerImages;

        const savedBanner = await this.bannerService.create(newBanner);

        return response.status(200).send({
            status: 1,
            message: 'Success! The banner was created.',
            data: savedBanner,
        });
    }

    /**
     * @api {get} /api/banner Banner List
     * @apiGroup Banner
     * @apiName BannerList
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} [limit]            Number of records to return
     * @apiQuery {Number} [offset]           Pagination offset
     * @apiQuery {String} [keyword]          Search keyword for banner title
     * @apiQuery {String} [status]           Filter by status (1: Active, 0: Inactive)
     * @apiQuery {Number|Boolean} [count]    If true/1, returns total count
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got banner list.",
     *         "data": [
     *             {
     *                 "bannerId": 1,
     *                 "title": "Summer Sale",
     *                 "content": "Special Offers",
     *                 "link": "summer-sale",
     *                 "position": "top",
     *                 "isActive": 1,
     *                 "bannerImages": []
     *             }
     *         ]
     *     }
     *
     * @apiSampleRequest /api/banner
     */
    @Get()
    @Authorized(['vendor', 'list-banners'])
    public async bannerList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['bannerId', 'title', 'position', 'createdDate', 'modifiedDate', 'isActive', 'linkType'];
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
        const whereConditions = [
            {
                name: 'tenantId',
                value: request.user.tenantId,
            },
        ];
        const relations = [
            {
                tableName: 'bannerImages',
            },
        ];
        const bannerList: any = await this.bannerService.list(limit, offset, select, relations, search, whereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Banner count retrieved successfully!',
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
            message: 'Successfully got banner list.',
            data: result,
        };
        return response.status(200).send(successResponse);
    }

    /**
     * @api {delete} /api/banner/:id Delete Banner
     * @apiGroup Banner
     * @apiName DeleteBanner
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Banner ID to delete
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully deleted banner."
     *     }
     *
     * @apiErrorExample {json} Invalid-Banner:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid banner ID."
     *     }
     *
     * @apiSampleRequest /api/banner/:id
     */
    @Delete('/:id')
    @Authorized(['vendor', 'delete-banners'])
    public async deleteBanner(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const banner = await this.bannerService.findOne({
            where: {
                bannerId: id,
                tenantId: request.user.tenantId,
            },
        });
        if (!banner) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid banner ID.',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteBanner = await this.bannerService.delete(banner.bannerId);
        if (deleteBanner) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted banner.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete banner.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {put} /api/banner/:id Update Banner
     * @apiGroup Banner
     * @apiName UpdateBanner
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiParam (Path) {Number} id          Banner ID
     *
     * @apiBody {Number} bannerId            Banner ID
     * @apiBody {String} title               Banner title (max 255 characters)
     * @apiBody {String} [content]           Banner content/HTML
     * @apiBody {String} [link]              Banner target link/URL
     * @apiBody {Number} [position]          Banner position
     * @apiBody {Number} status              Status (1: Active, 0: Inactive)
     * @apiBody {Number} [linkType]          Link type (1: None, 2: Category, 3: Product)
     * @apiBody {Number[]} [deleteImageIds]  Array of image IDs to delete
     * @apiBody {Object[]} [bannerImage]     Array of new banner images
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully updated banner.",
     *         "data": {
     *             "bannerId": 1,
     *             "title": "Summer Sale Updated",
     *             "content": "Special Offers",
     *             "link": "summer-sale",
     *             "position": 1,
     *             "isActive": 1
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Banner:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid banner ID."
     *     }
     *
     * @apiErrorExample {json} Position-Exists:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Banner Position Already Exist.!"
     *     }
     *
     * @apiSampleRequest /api/banner/:id
     */
    @Put('/:id')
    @Authorized(['vendor', 'edit-banners'])
    public async updateBanner(@Body({ validate: true }) payload: UpdateBanner, @Res() response: any, @Req() request: any): Promise<any> {

        if (+payload.linkType !== 1 && (payload.link === undefined || payload.link === '')) {
            return response.status(400).send({
                status: 0,
                message: 'Link is required.',
            });
        }

        const banner = await this.bannerService.findOne({ where: { bannerId: payload.bannerId, tenantId: request.user.tenantId }, relations: ['bannerImages'] });
        if (!banner) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid banner ID.',
            };
            return response.status(400).send(errorResponse);
        }

        const bannerExist = await this.bannerService.findOne({ where: { bannerId: Not(payload.bannerId), position: payload.position, tenantId: request.user.tenantId } });
        if (bannerExist) {
            return response.status(400).send({
                status: 0,
                message: 'Banner Position Already Exist.!',
            });
        }

        banner.title = payload.title;
        banner.content = payload.content;
        banner.link = payload.link;
        banner.position = payload.position;
        banner.isActive = payload.status;
        let link;
        link = payload.link;

        if (+payload.linkType === 2) {
            const product = await this.productService.findOne({
                where: {
                    productSlug: link,
                },
            });
            if (!product) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid product slug.',
                });
            }
            banner.linkType = payload.linkType;
        } else if (+payload.linkType === 3) {
            const category = await this.categoryService.findOne({
                where: {
                    categorySlug: link,
                },
            });
            if (!category) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid category slug.',
                });
            }
            banner.linkType = payload.linkType;
        } else {
            banner.linkType = payload.linkType;
        }

        banner.link = link;
        banner.position = payload.position;
        banner.isActive = payload.status;

        const deleteImageIds = payload.deleteImageIds;

        if (deleteImageIds?.length > 0) {
            deleteImageIds.forEach(async (id: number) => {
                await this.bannerImageService.delete(id);
            });
        }

        const hasValidImage = payload.bannerImage?.some(
            img => img.imageBase64 && img.imageBase64.trim() !== ''
        );

        if (!hasValidImage) {
            console.log('Not a valid base64 keep existing images' );
        } else {
            const bannerImages: BannerImage[] = [];
            const vendorInfo: Vendor = await this.vendorService.findOne({ select: ['vendorId', 'vendorPrefixId'], where: { userId: request.user.userId } });
            const vendorPrefix: string = vendorInfo?.vendorPrefixId;
            for (const subImage of payload.bannerImage) {

                if (!subImage.imageBase64) {
                    continue;
                }
                const base64 = subImage.imageBase64;
                const path = vendorPrefix + '/';

                const base64Data = Buffer.from(base64.split(',')[1], 'base64');
                const type = base64.split(';')[0].split(':')[1];
                const mime = require('mime');
                const ext = mime.getExtension(type);
                const availableImageType = env.availImageTypes.split(',');

                if (!availableImageType.includes(ext)) {
                    return response.status(400).send({
                        status: 0,
                        message: 'Only ' + env.availImageTypes + ' Types are Allowed',
                    });
                }

                const name = 'Banner_' + Date.now() + '.' + ext;

                const stringLength = base64.replace(/^data:image\/\w+;base64,/, '').length;
                const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
                const sizeInKb = sizeInBytes / 1024;
                const allowedSize = +env.imageUploadSize * 1024;

                if (sizeInKb > allowedSize) {
                    return response.status(400).send({
                        status: 0,
                        message: 'Image size too large.',
                    });
                }

                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload(
                        path === '' ? name : path + name, base64Data, type, 0
                    );
                }

                const bannerImage = new BannerImage();
                bannerImage.imageName = name;
                bannerImage.imagePath = path;
                bannerImage.isPrimary = subImage.isPrimary;
                bannerImages.push(bannerImage);
            }

            banner.bannerImages = bannerImages;
        }

        const savedBanner = await this.bannerService.create(banner);

        return response.status(200).send({
            status: 1,
            message: 'Successfully updated banner.',
            data: savedBanner,
        });
        // return response.status(200).send(successResponse);
    }

    /**
     * @api {get} /api/banner/banner-detail Get Banner Detail
     * @apiGroup Banner
     * @apiName GetBannerDetail
     *
     * @apiHeader {String} Authorization  Bearer Token
     *
     * @apiQuery {Number} bannerId           Banner ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got banner detail.",
     *         "data": {
     *             "bannerId": 1,
     *             "title": "Summer Sale",
     *             "content": "Special Offers",
     *             "link": "summer-sale",
     *             "position": "top",
     *             "isActive": 1,
     *             "bannerImages": []
     *         }
     *     }
     *
     * @apiErrorExample {json} Invalid-Banner-Id:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid Banner Id"
     *     }
     *
     * @apiSampleRequest /api/banner/banner-detail
     */
    @Get('/banner-detail')
    @Authorized(['vendor', 'list-banners'])
    public async BannerDetail(@QueryParam('bannerId') bannerId: number, @Res() response: any, @Req() request: any): Promise<any> {
        const banner = await this.bannerService.findOne({
            select: ['bannerId', 'title', 'position', 'content', 'link', 'createdDate', 'modifiedDate', 'isActive', 'linkType'],
            where: {
                bannerId,
                tenantId: request.user.tenantId,
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
            message: 'Successfully got banner detail.',
            data: banner,
        };
        return response.status(200).send(successResponse);
    }

}
