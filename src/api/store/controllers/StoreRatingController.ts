/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Body, Get, JsonController, Post, QueryParam, Req, Res, UseBefore, Param } from 'routing-controllers';
import { ProductRatingService } from '../../core/services/RatingService';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { CustomerService } from '../../../../src/api/core/services/CustomerService';
import { OrderProductService } from '../../../../src/api/core/services/OrderProductService';
import { OrderService } from '../../../../src/api/core/services/OrderService';
import { ProductImageService } from '../../../../src/api/core/services/ProductImageService';
import { CheckCustomerMiddleware } from '../../../../src/common/middleware-index';
import { ProductRating } from '../../core/models/ProductRating';
import { VendorService } from '../../../../src/api/core/services/VendorService';
import { S3Service } from '../../../../src/api/core/services/S3Service';
import { ImageService } from '../../../../src/api/core/services/ImageService';
import { env } from '../../../../src/env';
import { SkuService } from '../../../../src/api/core/services/SkuService';
import { TenantValidationMiddleware } from '../../../../src/api/core/middlewares/TenantValidationMiddleware';
import { Service } from 'typedi';
import { ProductRatingImagesService } from '../../core/services/RatingImageService';
import { UpdateRatingStatusRequest } from './requests/UpdateRatingStatusRequest';
import { In } from 'typeorm';
import { FileType, ProductRatingImages } from '../../core/models/ProductRatingImages';
import { VendorProductService } from '../../../../src/api/core/services/VendorProductService';

@Service()
@UseBefore(TenantValidationMiddleware)
@JsonController('/product-store')
export class StoreRatingController {
    constructor(
        private productService: ProductService,
        private productRatingService: ProductRatingService,
        private customerService: CustomerService,
        private orderProductService: OrderProductService,
        private orderService: OrderService,
        private productImageService: ProductImageService,
        private vendorService: VendorService,
        private s3Service: S3Service,
        private imageService: ImageService,
        private skuService: SkuService,
        private productRatingImagesService: ProductRatingImagesService,
        private vendorProductService: VendorProductService
    ) {
        // ---
    }

    // Get product rating/review API
    /**
     * @api {Get} /api/product-store/rating/:skuId Get product Rating API
     * @apiGroup Store
     * @apiParam (Request body) {Number} skuId skuId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {String} customerId customerId
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product Rating.",
     *      "data": [{
     *      "review": "",
     *      "rating": 1,
     *      "createdDate": "",
     *      "firstName": "",
     *      "lastName": "",
     *      "image": "",
     *      "imagePath": "",
     *      "video": "",
     *      "videoPath": "",
     *      "productId": 1,
     *      "customerId": 1,
     *      "isActive": 1
     *        }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/rating/:skuId
     * @apiErrorExample {json} getProductRating error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/rating/:skuId')
    public async getProductRating(@Param('skuId') skuId: number, @QueryParam('customerId') customerId: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const sku = await this.skuService.findOne({ where: { id: skuId } });
        if (!sku) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid SKU ID provided. Please check the SKU and try again.',
            };
            return response.status(404).send(errorResponse);
        }

        const ratings = await this.productRatingService.find({
            relations: ['productRatingImages'],
            where: {
                skuId: sku.id,
                isActive: 1,
            },
            take: limit,
            skip: offset,
        });

        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'successfully got the product Rating Count.',
                data: ratings.length,
            });
        }

        const promise = ratings.map(async (result: any) => {
            const temp: any = result;
            const customer: any = await this.customerService.findOne({
                select: ['firstName', 'avatar', 'avatarPath', 'id'],
                where: { id: result.customerId },
            });
            const val = Object.assign({}, temp, customer);
            return val;
        });
        const value = await Promise.all(promise);

        if (value) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully retrieved the product rating. ',
                data: { productRating: value },
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'Unable to retrieve the product rating. Please try again later.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Get product rating/review API
    /**
     * @api {Get} /api/product-store/rating-count/:skuId Get product Rating Count API
     * @apiGroup Store
     * @apiParam (Request body) {Number} skuId skuId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product rating.",
     *      "data": {
     *      "ratingCount": 1,
     *      "reviewCount": 1,
     *      "rating": 1
     *        },
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/rating-count/:skuId
     * @apiErrorExample {json} GetProduct RatingCount error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/rating-count/:skuId')
    public async getProductRatingCount(@Param('skuId') skuId: number, @Res() response: any): Promise<any> {
        const sku = await this.skuService.findOne({ where: { id: skuId } });
        if (!sku) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid SKU ID. Please verify the SKU and try again.',
            };
            return response.status(404).send(errorResponse);
        }
        const ratingCount: any = await this.productRatingService.ratingStatistics(skuId);
        const reviewCount: any = await this.productRatingService.getReviewCount(skuId);
        const rating: any = await this.productRatingService.consolidateRating(skuId);
        const successResponse: any = {
            status: 1,
            message: 'Product rating and review details fetched successfully.',
            data: {
                ratingCount: ratingCount ? ratingCount.rating : 0,
                reviewCount: reviewCount ? reviewCount.review : '',
                rating: rating ? rating.RatingCount : 0,
            },
        };
        return response.status(200).send(successResponse);
    }

    // Get Rating Statistics API
    /**
     * @api {Get} /api/product-store/rating-statistics/:skuId Get Rating Statistics API
     * @apiGroup Store
     * @apiParam (Request body) {Number} skuId skuId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product ratings & review count",
     *      "data":  [{
     *      "starsCount": 1,
     *      "totalRatingReview": 1
     *       }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/rating-statistics/:skuId
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/rating-statistics/:skuId')
    public async getRatingStatistics(@Param('skuId') skuId: number, @Res() response: any): Promise<any> {
        const sku = await this.skuService.findOne({ where: { id: skuId } });
        if (!sku) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid SKU ID. Please verify the SKU and try again.',
            };
            return response.status(404).send(errorResponse);
        }
        const ratings: any = [];
        for (let stars = 1; stars <= 5; stars++) {
            const WhereConditions = [
                {
                    name: 'rating',
                    op: 'where',
                    value: stars,
                }, {
                    name: 'skuId',
                    op: 'where',
                    value: sku.id,
                },
            ];
            const count = 1;
            const star = await this.productRatingService.list(0, 0, 0, 0, WhereConditions, count);
            ratings.push(star);
        }
        const totalRatingReview = await this.productRatingService.ratingStatistics(skuId);
        const starsCount = { oneStar: ratings[0], twoStar: ratings[1], threeStar: ratings[2], fourStar: ratings[3], fiveStar: ratings[4] };
        if (starsCount) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully retrieved product ratings and review counts.',
                data: { starsCount, totalRatingReview },
            };
            return response.status(200).send(successResponse);
        }
    }

    // Product Rating  API
    /**
     * @api {Post} /api/product-store/rating Add Rating  API
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId
     * @apiParam (Request body) {String} skuName
     * @apiParam (Request body) {Number} orderProductId
     * @apiParam (Request body) {String} reviews productReviews
     * @apiParam (Request body) {String} image image
     * @apiParam (Request body) {Number} rating productRatings
     * @apiParamExample {json} Input
     * {
     *      "productId": 1,
     *      "skuId": 1,
     *      "orderProductId": 1,
     *      "reviews": "",
     *      "image": "",
     *      "rating": 1
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created your ratings and reviews!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product-store/rating
     * @apiErrorExample {json} rating error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order List Function
    @UseBefore(CheckCustomerMiddleware)
    @Post('/rating')
    public async Rating(@Body({ validate: true }) ratingValue: UpdateRatingStatusRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const resultData = await this.productService.findOne({

            where: { productId: ratingValue.productId },
        });
        if (!resultData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid product ID. Please check the product ID and try again.',
            };
            return response.status(400).send(errorResponse);
        }
        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId: ratingValue.productId,
                vendorId: request.tenantId,
            },
        });

        if (!vendorProduct) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid tenant product.',
            });
        }
        const sku = await this.skuService.findOne({ where: { skuName: ratingValue.skuName } });
        if (!sku) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid SKU name. Please verify the SKU and try again.',
            };
            return response.status(404).send(errorResponse);
        }
        const orderProduct = await this.orderProductService.findOne({
            where: {
                orderProductId: ratingValue.orderProductId,
            },
        });
        const order = await this.orderService.findOrder({
            where: {
                orderId: orderProduct.orderId, customerId: request.user.customerId,
            },
        });
        if (!order) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid rating for this user. Please check your rating and try again.',
            };
            return response.status(400).send(errResponse);
        }
        const rating = await this.productRatingService.findOne({

            where: {
                orderProductId: ratingValue.orderProductId,
            },
        });

        if (rating) {
            const ratingImages = ratingValue.ratingImages;
            const ratingVideo = ratingValue.ratingVideo;
            if (ratingValue?.deleteIds.length) {
                await this.productRatingImagesService.delete({ id: In(ratingValue.deleteIds) });
            }
            if (ratingImages.length !== 0) {
                ratingImages.forEach(async (subImage) => {
                    let name: any;
                    let path: any;
                    const type = subImage.split(';')[0].split('/')[1];
                    const availableTypes = env.availImageTypes.split(',');
                    if (!availableTypes.includes(type)) {
                        const errorTypeResponse: any = {
                            status: 0,
                            message: 'Only ' + env.availImageTypes + ' types are allowed',
                        };
                        return response.status(400).send(errorTypeResponse);
                    }
                    name = 'Img_' + Date.now() + '.' + type;
                    path = 'rating/';
                    const base64Data = Buffer.from(subImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');

                    if (env.imageserver === 's3') {
                        await this.s3Service.imageUpload((path + name), base64Data, type);
                    } else {
                        await this.imageService.imageUpload((path + name), base64Data);
                    }

                    const newProductRatingImage = new ProductRatingImages();
                    newProductRatingImage.fileName = name;
                    newProductRatingImage.filePath = path;
                    newProductRatingImage.fileType = FileType.IMAGE;
                    newProductRatingImage.ratingId = rating.ratingId;
                    await this.productRatingImagesService.create(newProductRatingImage);
                });
            }
            if (ratingVideo.length !== 0) {
                ratingVideo.forEach(async (subVideo) => {
                    let name: any;
                    let path: any;
                    const type = subVideo.split(';')[0].split('/')[1];
                    name = 'Vid_' + Date.now() + '.' + type;
                    path = 'video';
                    const base64Data = Buffer.from(subVideo.replace(/^data:video\/\w+;base64,/, ''), 'base64');
                    const sizeInBytes = 4 * Math.ceil((base64Data.length / 3)) * 0.5624896334383812;
                    const sizeInKb = sizeInBytes / 1024;
                    const allowedFileSizeInKb = 30 * 1024;

                    if (sizeInKb > allowedFileSizeInKb) {
                        const errorTypeResponse: any = {
                            status: 0,
                            message: 'File size too large. The file must be less than 30MB.',
                        };
                        return response.status(400).send(errorTypeResponse);
                    }

                    if (env.imageserver === 's3') {
                        await this.s3Service.videoUpload((path + name), base64Data, type);
                    } else {
                        await this.imageService.videoUpload((path + name), base64Data);
                    }
                    const newProductRatingImage = new ProductRatingImages();
                    newProductRatingImage.fileName = name;
                    newProductRatingImage.filePath = path;
                    newProductRatingImage.fileType = FileType.VIDEO;
                    newProductRatingImage.ratingId = rating.ratingId;
                    await this.productRatingImagesService.create(newProductRatingImage);
                });
            }
            rating.review = ratingValue.reviews;
            rating.rating = ratingValue.rating;
            rating.isActive = 0;
            const updateRatings = await this.productRatingService.create(rating);
            if (updateRatings) {
                const updateRating: any = await this.productRatingService.consolidateRating(rating.skuId);
                resultData.rating = updateRating ? updateRating.RatingCount : 0;
                await this.productService.create(resultData);
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully updated your reviews and ratings',
                };
                return response.status(200).send(successResponse);
            }
        } else {
            const ratingImages = ratingValue.ratingImages;
            const productRatingFiles = [];
            if (ratingImages.length !== 0) {
                for (const subImage of ratingImages) {
                    let name: any;
                    let path: any;
                    const type = subImage.split(';')[0].split('/')[1];
                    const availableTypes = env.availImageTypes.split(',');
                    if (!availableTypes.includes(type)) {
                        const errorTypeResponse: any = {
                            status: 0,
                            message: 'Only ' + env.availImageTypes + ' types are allowed',
                        };
                        return response.status(400).send(errorTypeResponse);
                    }
                    name = 'Img_' + Date.now() + '.' + type;
                    path = 'rating/';
                    const base64Data = Buffer.from(subImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');

                    if (env.imageserver === 's3') {
                        await this.s3Service.imageUpload((path + name), base64Data, type);
                    } else {
                        await this.imageService.imageUpload((path + name), base64Data);
                    }

                    const newProductRatingImage = new ProductRatingImages();
                    newProductRatingImage.fileName = name;
                    newProductRatingImage.filePath = path;
                    newProductRatingImage.fileType = FileType.IMAGE;
                    productRatingFiles.push(newProductRatingImage);
                }
            }
            const ratingVideo = ratingValue.ratingVideo;
            if (ratingVideo.length !== 0) {
                for (const subVideo of ratingVideo) {
                    let name: any;
                    let path: any;
                    const type = subVideo.split(';')[0].split('/')[1];
                    name = 'Vid_' + Date.now() + '.' + type;
                    path = 'video';
                    const base64Data = Buffer.from(subVideo.replace(/^data:video\/\w+;base64,/, ''), 'base64');
                    const sizeInBytes = 4 * Math.ceil((base64Data.length / 3)) * 0.5624896334383812;
                    const sizeInKb = sizeInBytes / 1024;
                    const allowedFileSizeInKb = 30 * 1024;

                    if (sizeInKb > allowedFileSizeInKb) {
                        const errorTypeResponse: any = {
                            status: 0,
                            message: 'File size too large. The file must be less than 30MB.',
                        };
                        return response.status(400).send(errorTypeResponse);
                    }

                    if (env.imageserver === 's3') {
                        await this.s3Service.videoUpload((path + name), base64Data, type);
                    } else {
                        await this.imageService.videoUpload((path + '/' + name), base64Data);
                    }
                    const newProductRatingImage = new ProductRatingImages();
                    newProductRatingImage.fileName = name;
                    newProductRatingImage.filePath = path;
                    newProductRatingImage.fileType = FileType.VIDEO;
                    productRatingFiles.push(newProductRatingImage);
                }
            }
            const customer = await this.customerService.findOne({ where: { id: request.user.customerId } });
            const newRating: any = new ProductRating();
            newRating.review = ratingValue.reviews;
            newRating.rating = ratingValue.rating;
            newRating.orderProductId = ratingValue.orderProductId;
            newRating.productId = ratingValue.productId;
            newRating.skuId = sku.id;
            newRating.customerId = request.user.customerId;
            newRating.firstName = customer.firstName;
            newRating.lastName = customer.lastName;
            newRating.email = customer.email;
            newRating.isActive = 0;
            newRating.productRatingImages = productRatingFiles;
            const AddRating = await this.productRatingService.create(newRating);
            if (AddRating) {
                const updateRating: any = await this.productRatingService.consolidateRating(sku.id);
                resultData.rating = updateRating ? updateRating.RatingCount : 0;
                await this.productService.create(resultData);
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully created your review and rating.',
                };
                return response.status(200).send(successResponse);
            }
        }
    }

    // Product Reviews API
    /**
     * @api {Post} /api/product-store/review Add Reviews  API
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number}  productId productId
     * @apiParam (Request body) {String}  skuName skuName
     * @apiParam (Request body) {Number}  orderProductId
     * @apiParam (Request body) {String} reviews productReviews
     * @apiParamExample {json} Input
     * {
     *      "productId": "",
     *      "orderProductId": "",
     *      "reviews": "",
     *      "skuId": "",
     *      "rating": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created your reviews.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/review
     * @apiErrorExample {json} reviews error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order List Function
    @UseBefore(CheckCustomerMiddleware)
    @Post('/review')
    public async Reviews(@Body({ validate: true }) ratingValue: UpdateRatingStatusRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const resultData = await this.productService.findOne({

            where: { productId: ratingValue.productId },
        });
        if (!resultData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid product ID. Please verify the product ID and try again.',
            };
            return response.status(400).send(errorResponse);
        }

        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId: ratingValue.productId,
                vendorId: request.tenantId,
            },
        });

        if (!vendorProduct) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid tenant product.',
            });
        }

        const rating = await this.productRatingService.findOne({

            where: {
                orderProductId: ratingValue.orderProductId,
            },
        });
        if (rating) {
            rating.review = ratingValue.reviews;
            rating.isActive = 0;
            const updateRating = await this.productRatingService.create(rating);
            if (updateRating) {
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully updated your review.',
                };
                return response.status(200).send(successResponse);
            }
        } else {
            const sku = await this.skuService.findOne({ where: { skuName: ratingValue.skuName } });
            if (!sku) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid SKU name. Please verify the SKU and try again.',
                };
                return response.status(404).send(errorResponse);
            }
            const customer = await this.customerService.findOne({ where: { id: request.user.customerId } });
            const newRating: any = new ProductRating();
            newRating.review = ratingValue.reviews;
            newRating.productId = ratingValue.productId;
            newRating.orderProductId = ratingValue.orderProductId;
            newRating.customerId = request.user.customerId;
            newRating.firstName = customer.firstName;
            newRating.lastName = customer.lastName;
            newRating.email = customer.email;
            newRating.isActive = 0;
            newRating.skuId = sku.id;
            newRating.rating = ratingValue.rating;
            await this.productRatingService.create(newRating);

            const successResponse: any = {
                status: 1,
                message: 'Successfully created your review.',
            };
            return response.status(200).send(successResponse);

        }
    }

    // Customer Rating Detail By Order API
    /**
     * @api {Get} /api/product-store/rating-by-order Customer Rating Detail By Order
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId orderProductId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": [{
     *      "orderedDate": "",
     *      "orderProductPrefixId": "",
     *      "total": 1,
     *      "currencySymbolLeft": "",
     *      "currencySymbolRight": "",
     *      "discountAmount": 1,
     *      "discountedAmount": 1,
     *      "couponDiscountAmount": 1,
     *      "orderProductPrefixId": "",
     *      "productImage": "",
     *      "basePrice": "",
     *      "taxValue": "",
     *      "taxType": "",
     *      "orderId": 1,
     *      "orderProductId": 1,
     *      "productId": 1,
     *      "productName": "",
     *      "productQuantity": 1,
     *      "productPrice": 1,
     *      "skuName": "",
     *      "rating": 1,
     *      "review": "",
     *    }]
     * }
     * @apiSampleRequest /api/product-store/rating-by-order
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    @UseBefore(CheckCustomerMiddleware)
    @Get('/rating-by-order')
    public async orderDetail(@QueryParam('orderProductId') orderProductId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const obj: any = {};
        const orderProduct = await this.orderProductService.findOne({
            select: ['basePrice', 'taxValue', 'taxType', 'orderProductId', 'orderId', 'productId', 'createdDate', 'modifiedDate', 'total', 'name', 'productPrice', 'orderProductPrefixId', 'quantity', 'orderStatusId', 'discountAmount', 'discountedAmount', 'skuName', 'couponDiscountAmount'],
            where: {
                orderProductId,
            },
        });
        if (!orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid order product ID. Please verify the order product ID and try again.',
            };
            return response.status(400).send(errorResponse);
        }
        const order = await this.orderService.findOrder({
            select: ['paymentType', 'shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingZone', 'shippingCountry', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'paymentPostcode', 'paymentZone', 'paymentCountry', 'currencySymbolLeft', 'currencySymbolRight', 'customerGstNo'],
            where: {
                orderId: orderProduct.orderId, customerId: request.user.customerId,
            },
        });
        if (!order) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid order for this customer. Please check your order and try again.',
            };
            return response.status(400).send(errResponse);
        }
        const product = await this.productImageService.findOne({
            select: ['productId', 'image', 'containerName'],
            where: {
                productId: orderProduct.productId,
                defaultImage: 1,
            },
        });
        const products = await this.productService.findOne({
            select: ['productSlug'],
            where: {
                productId: orderProduct.productId,
            },
        });
        obj.orderedDate = orderProduct.createdDate;
        obj.orderProductPrefixId = orderProduct.orderProductPrefixId;
        if (products) {
            obj.productSlug = products.productSlug;
        }
        obj.total = orderProduct.total;
        obj.currencySymbolLeft = order.currencySymbolLeft;
        obj.currencySymbolRight = order.currencySymbolRight;
        obj.discountAmount = orderProduct.discountAmount;
        obj.discountedAmount = orderProduct.discountedAmount;
        obj.couponDiscountAmount = orderProduct.couponDiscountAmount;
        obj.orderProductPrefixId = orderProduct.orderProductPrefixId;
        if (product) {
            obj.productImage = product.image;
            obj.containerName = product.containerName;
        }
        obj.basePrice = orderProduct.basePrice;
        obj.taxValue = orderProduct.taxValue;
        obj.taxType = orderProduct.taxType;
        obj.orderId = orderProduct.orderId;
        obj.orderProductId = orderProduct.orderProductId;
        obj.productId = orderProduct.productId;
        obj.productName = orderProduct.name;
        obj.productQuantity = orderProduct.quantity;
        obj.productPrice = orderProduct.productPrice;
        obj.skuName = orderProduct.skuName;
        const rating = await this.productRatingService.findOne({
            select: ['rating', 'review', 'skuId', 'ratingId'],
            where: {
                customerId: request.user.customerId,
                orderProductId: orderProduct.orderProductId,
                productId: orderProduct.productId,
            },
        });
        if (rating) {
            const ratingImages = await this.productRatingImagesService.find({
                select: ['id', 'fileName', 'filePath', 'fileType'],
                where: {
                    ratingId: rating.ratingId,
                },
            });
            obj.rating = rating.rating;
            obj.review = rating.review;
            obj.skuId = rating.skuId;
            obj.ratingImages = ratingImages;
        } else {
            obj.rating = 0;
            obj.review = '';
            obj.skuId = '';
            obj.ratingImages = [];
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully retrieved the order details.',
            data: obj,
        };
        return response.status(200).send(successResponse);
    }
    // Get Product Rating And Review Based On Vendor API
    /**
     * @api {Get} /api/product-store/vendor-product-rating-count Get Product Rating And Review Based On Vendor API
     * @apiGroup Store
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product Rating.",
     *      "data": {
     *       "totalRatings": 1,
     *       "averageRating": 1,
     *         }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/vendor-product-rating-count
     * @apiErrorExample {json} vendorBasedProductRatingCount error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendor-product-rating-count')
    public async vendorBasedProductRatingCount(@QueryParam('vendorId') vendorId: number, @Res() response: any): Promise<any> {
        const vendor: any = await this.vendorService.findOne({
            where: {
                vendorId,
            },
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 1,
                message: 'Invalid vendor ID. Please verify the vendor ID and try again.',
            };
            return response.status(404).send(errorResponse);
        }
        const rating: any = await this.productRatingService.consolidateRatingForVendor(vendorId);
        const successResponse: any = {
            status: 1,
            message: 'Successfully retrieved product rating and reviews for the vendor. ',
            data: rating,
        };
        return response.status(200).send(successResponse);
    }
}
