"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRatingController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
// Services
const RatingService_1 = require("../../services/RatingService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const OrderProductService_1 = require("../../../../src/api/core/services/OrderProductService");
const OrderService_1 = require("../../../../src/api/core/services/OrderService");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const middleware_index_1 = require("../../../../src/common/middleware-index");
const ProductRating_1 = require("../../models/ProductRating");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
const S3Service_1 = require("../../../../src/api/core/services/S3Service");
const ImageService_1 = require("../../../../src/api/core/services/ImageService");
const env_1 = require("../../../../src/env");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const ProductRatingImages_1 = require("../../models/ProductRatingImages");
const RatingImageService_1 = require("../../services/RatingImageService");
const RatingRequest_1 = require("./requests/RatingRequest");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
let StoreRatingController = class StoreRatingController {
    constructor(productService, productRatingService, customerService, orderProductService, orderService, productImageService, vendorService, s3Service, imageService, skuService, productRatingImagesService) {
        this.productService = productService;
        this.productRatingService = productRatingService;
        this.customerService = customerService;
        this.orderProductService = orderProductService;
        this.orderService = orderService;
        this.productImageService = productImageService;
        this.vendorService = vendorService;
        this.s3Service = s3Service;
        this.imageService = imageService;
        this.skuService = skuService;
        this.productRatingImagesService = productRatingImagesService;
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
    getProductRating(skuId, customerId, limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const sku = yield this.skuService.findOne({ where: { id: skuId } });
            if (!sku) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid SKU ID provided. Please check the SKU and try again.',
                };
                return response.status(404).send(errorResponse);
            }
            const ratings = yield this.productRatingService.find({
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
            const promise = ratings.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = result;
                const customer = yield this.customerService.findOne({
                    select: ['firstName', 'avatar', 'avatarPath', 'id'],
                    where: { id: result.customerId },
                });
                const val = Object.assign({}, temp, customer);
                return val;
            }));
            const value = yield Promise.all(promise);
            if (value) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully retrieved the product rating. ',
                    data: { productRating: value },
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'Unable to retrieve the product rating. Please try again later.',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    getProductRatingCount(skuId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const sku = yield this.skuService.findOne({ where: { id: skuId } });
            if (!sku) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid SKU ID. Please verify the SKU and try again.',
                };
                return response.status(404).send(errorResponse);
            }
            const ratingCount = yield this.productRatingService.ratingStatistics(skuId);
            const reviewCount = yield this.productRatingService.getReviewCount(skuId);
            const rating = yield this.productRatingService.consolidateRating(skuId);
            const successResponse = {
                status: 1,
                message: 'Product rating and review details fetched successfully.',
                data: {
                    ratingCount: ratingCount ? ratingCount.rating : 0,
                    reviewCount: reviewCount ? reviewCount.review : '',
                    rating: rating ? rating.RatingCount : 0,
                },
            };
            return response.status(200).send(successResponse);
        });
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
    getRatingStatistics(skuId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const sku = yield this.skuService.findOne({ where: { id: skuId } });
            if (!sku) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid SKU ID. Please verify the SKU and try again.',
                };
                return response.status(404).send(errorResponse);
            }
            const ratings = [];
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
                const star = yield this.productRatingService.list(0, 0, 0, 0, WhereConditions, count);
                ratings.push(star);
            }
            const totalRatingReview = yield this.productRatingService.ratingStatistics(skuId);
            const starsCount = { oneStar: ratings[0], twoStar: ratings[1], threeStar: ratings[2], fourStar: ratings[3], fiveStar: ratings[4] };
            if (starsCount) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully retrieved product ratings and review counts.',
                    data: { starsCount, totalRatingReview },
                };
                return response.status(200).send(successResponse);
            }
        });
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
    Rating(ratingValue, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.productService.findOne({
                where: { productId: ratingValue.productId },
            });
            if (!resultData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid product ID. Please check the product ID and try again.',
                };
                return response.status(400).send(errorResponse);
            }
            const sku = yield this.skuService.findOne({ where: { skuName: ratingValue.skuName } });
            if (!sku) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid SKU name. Please verify the SKU and try again.',
                };
                return response.status(404).send(errorResponse);
            }
            const orderProduct = yield this.orderProductService.findOne({
                where: {
                    orderProductId: ratingValue.orderProductId,
                },
            });
            const order = yield this.orderService.findOrder({
                where: {
                    orderId: orderProduct.orderId, customerId: request.user.id,
                },
            });
            if (!order) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid rating for this user. Please check your rating and try again.',
                };
                return response.status(400).send(errResponse);
            }
            const rating = yield this.productRatingService.findOne({
                where: {
                    orderProductId: ratingValue.orderProductId,
                },
            });
            if (rating) {
                const ratingImages = ratingValue.ratingImages;
                const ratingVideo = ratingValue.ratingVideo;
                if (ratingValue === null || ratingValue === void 0 ? void 0 : ratingValue.deleteIds.length) {
                    yield this.productRatingImagesService.delete({ id: (0, typeorm_1.In)(ratingValue.deleteIds) });
                }
                if (ratingImages.length !== 0) {
                    ratingImages.forEach((subImage) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        let name;
                        let path;
                        const type = subImage.split(';')[0].split('/')[1];
                        const availableTypes = env_1.env.availImageTypes.split(',');
                        if (!availableTypes.includes(type)) {
                            const errorTypeResponse = {
                                status: 0,
                                message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                            };
                            return response.status(400).send(errorTypeResponse);
                        }
                        name = 'Img_' + Date.now() + '.' + type;
                        path = 'rating/';
                        const base64Data = Buffer.from(subImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                        if (env_1.env.imageserver === 's3') {
                            yield this.s3Service.imageUpload((path + name), base64Data, type);
                        }
                        else {
                            yield this.imageService.imageUpload((path + name), base64Data);
                        }
                        const newProductRatingImage = new ProductRatingImages_1.ProductRatingImages();
                        newProductRatingImage.fileName = name;
                        newProductRatingImage.filePath = path;
                        newProductRatingImage.fileType = ProductRatingImages_1.FileType.IMAGE;
                        newProductRatingImage.ratingId = rating.ratingId;
                        yield this.productRatingImagesService.create(newProductRatingImage);
                    }));
                }
                if (ratingVideo.length !== 0) {
                    ratingVideo.forEach((subVideo) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        let name;
                        let path;
                        const type = subVideo.split(';')[0].split('/')[1];
                        name = 'Vid_' + Date.now() + '.' + type;
                        path = 'video';
                        const base64Data = Buffer.from(subVideo.replace(/^data:video\/\w+;base64,/, ''), 'base64');
                        const sizeInBytes = 4 * Math.ceil((base64Data.length / 3)) * 0.5624896334383812;
                        const sizeInKb = sizeInBytes / 1024;
                        const allowedFileSizeInKb = 30 * 1024;
                        if (sizeInKb > allowedFileSizeInKb) {
                            const errorTypeResponse = {
                                status: 0,
                                message: 'File size too large. The file must be less than 30MB.',
                            };
                            return response.status(400).send(errorTypeResponse);
                        }
                        if (env_1.env.imageserver === 's3') {
                            yield this.s3Service.videoUpload((path + name), base64Data, type);
                        }
                        else {
                            yield this.imageService.videoUpload((path + name), base64Data);
                        }
                        const newProductRatingImage = new ProductRatingImages_1.ProductRatingImages();
                        newProductRatingImage.fileName = name;
                        newProductRatingImage.filePath = path;
                        newProductRatingImage.fileType = ProductRatingImages_1.FileType.VIDEO;
                        newProductRatingImage.ratingId = rating.ratingId;
                        yield this.productRatingImagesService.create(newProductRatingImage);
                    }));
                }
                rating.review = ratingValue.reviews;
                rating.rating = ratingValue.rating;
                rating.isActive = 0;
                const updateRatings = yield this.productRatingService.create(rating);
                if (updateRatings) {
                    const updateRating = yield this.productRatingService.consolidateRating(rating.skuId);
                    resultData.rating = updateRating !== undefined ? updateRating.RatingCount : 0;
                    yield this.productService.create(resultData);
                    const successResponse = {
                        status: 1,
                        message: 'Successfully updated your reviews and ratings',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                const ratingImages = ratingValue.ratingImages;
                const productRatingFiles = [];
                if (ratingImages.length !== 0) {
                    for (const subImage of ratingImages) {
                        let name;
                        let path;
                        const type = subImage.split(';')[0].split('/')[1];
                        const availableTypes = env_1.env.availImageTypes.split(',');
                        if (!availableTypes.includes(type)) {
                            const errorTypeResponse = {
                                status: 0,
                                message: 'Only ' + env_1.env.availImageTypes + ' types are allowed',
                            };
                            return response.status(400).send(errorTypeResponse);
                        }
                        name = 'Img_' + Date.now() + '.' + type;
                        path = 'rating/';
                        const base64Data = Buffer.from(subImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                        if (env_1.env.imageserver === 's3') {
                            yield this.s3Service.imageUpload((path + name), base64Data, type);
                        }
                        else {
                            yield this.imageService.imageUpload((path + name), base64Data);
                        }
                        const newProductRatingImage = new ProductRatingImages_1.ProductRatingImages();
                        newProductRatingImage.fileName = name;
                        newProductRatingImage.filePath = path;
                        newProductRatingImage.fileType = ProductRatingImages_1.FileType.IMAGE;
                        productRatingFiles.push(newProductRatingImage);
                    }
                }
                const ratingVideo = ratingValue.ratingVideo;
                if (ratingVideo.length !== 0) {
                    for (const subVideo of ratingVideo) {
                        let name;
                        let path;
                        const type = subVideo.split(';')[0].split('/')[1];
                        name = 'Vid_' + Date.now() + '.' + type;
                        path = 'video';
                        const base64Data = Buffer.from(subVideo.replace(/^data:video\/\w+;base64,/, ''), 'base64');
                        const sizeInBytes = 4 * Math.ceil((base64Data.length / 3)) * 0.5624896334383812;
                        const sizeInKb = sizeInBytes / 1024;
                        const allowedFileSizeInKb = 30 * 1024;
                        if (sizeInKb > allowedFileSizeInKb) {
                            const errorTypeResponse = {
                                status: 0,
                                message: 'File size too large. The file must be less than 30MB.',
                            };
                            return response.status(400).send(errorTypeResponse);
                        }
                        if (env_1.env.imageserver === 's3') {
                            yield this.s3Service.videoUpload((path + name), base64Data, type);
                        }
                        else {
                            yield this.imageService.videoUpload((path + '/' + name), base64Data);
                        }
                        const newProductRatingImage = new ProductRatingImages_1.ProductRatingImages();
                        newProductRatingImage.fileName = name;
                        newProductRatingImage.filePath = path;
                        newProductRatingImage.fileType = ProductRatingImages_1.FileType.VIDEO;
                        productRatingFiles.push(newProductRatingImage);
                    }
                }
                const customer = yield this.customerService.findOne({ where: { id: request.user.id } });
                const newRating = new ProductRating_1.ProductRating();
                newRating.review = ratingValue.reviews;
                newRating.rating = ratingValue.rating;
                newRating.orderProductId = ratingValue.orderProductId;
                newRating.productId = ratingValue.productId;
                newRating.skuId = sku.id;
                newRating.customerId = request.user.id;
                newRating.firstName = customer.firstName;
                newRating.lastName = customer.lastName;
                newRating.email = customer.email;
                newRating.isActive = 0;
                newRating.productRatingImages = productRatingFiles;
                const AddRating = yield this.productRatingService.create(newRating);
                if (AddRating) {
                    const updateRating = yield this.productRatingService.consolidateRating(sku.id);
                    resultData.rating = updateRating !== undefined ? updateRating.RatingCount : 0;
                    yield this.productService.create(resultData);
                    const successResponse = {
                        status: 1,
                        message: 'Successfully created your review and rating.',
                    };
                    return response.status(200).send(successResponse);
                }
            }
        });
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
    Reviews(ratingValue, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.productService.findOne({
                where: { productId: ratingValue.productId },
            });
            if (!resultData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid product ID. Please verify the product ID and try again.',
                };
                return response.status(400).send(errorResponse);
            }
            const rating = yield this.productRatingService.findOne({
                where: {
                    orderProductId: ratingValue.orderProductId,
                },
            });
            if (rating) {
                rating.review = ratingValue.reviews;
                rating.isActive = 0;
                const updateRating = yield this.productRatingService.create(rating);
                if (updateRating) {
                    const successResponse = {
                        status: 1,
                        message: 'Successfully updated your review.',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                const sku = yield this.skuService.findOne({ where: { skuName: ratingValue.skuName } });
                if (!sku) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid SKU name. Please verify the SKU and try again.',
                    };
                    return response.status(404).send(errorResponse);
                }
                const customer = yield this.customerService.findOne({ where: { id: request.user.id } });
                const newRating = new ProductRating_1.ProductRating();
                newRating.review = ratingValue.reviews;
                newRating.productId = ratingValue.productId;
                newRating.orderProductId = ratingValue.orderProductId;
                newRating.customerId = request.user.id;
                newRating.firstName = customer.firstName;
                newRating.lastName = customer.lastName;
                newRating.email = customer.email;
                newRating.isActive = 0;
                newRating.skuId = sku.id;
                newRating.rating = ratingValue.rating;
                yield this.productRatingService.create(newRating);
                const successResponse = {
                    status: 1,
                    message: 'Successfully created your review.',
                };
                return response.status(200).send(successResponse);
            }
        });
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
    orderDetail(orderProductId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = {};
            const orderProduct = yield this.orderProductService.findOne({
                select: ['basePrice', 'taxValue', 'taxType', 'orderProductId', 'orderId', 'productId', 'createdDate', 'modifiedDate', 'total', 'name', 'productPrice', 'orderProductPrefixId', 'quantity', 'orderStatusId', 'discountAmount', 'discountedAmount', 'skuName', 'couponDiscountAmount'],
                where: {
                    orderProductId,
                },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid order product ID. Please verify the order product ID and try again.',
                };
                return response.status(400).send(errorResponse);
            }
            const order = yield this.orderService.findOrder({
                select: ['paymentType', 'shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingZone', 'shippingCountry', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'paymentPostcode', 'paymentZone', 'paymentCountry', 'currencySymbolLeft', 'currencySymbolRight', 'customerGstNo'],
                where: {
                    orderId: orderProduct.orderId, customerId: request.user.id,
                },
            });
            if (!order) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid order for this customer. Please check your order and try again.',
                };
                return response.status(400).send(errResponse);
            }
            const product = yield this.productImageService.findOne({
                select: ['productId', 'image', 'containerName'],
                where: {
                    productId: orderProduct.productId,
                    defaultImage: 1,
                },
            });
            const products = yield this.productService.findOne({
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
            const rating = yield this.productRatingService.findOne({
                select: ['rating', 'review', 'skuId', 'ratingId'],
                where: {
                    customerId: request.user.id,
                    orderProductId: orderProduct.orderProductId,
                    productId: orderProduct.productId,
                },
            });
            if (rating) {
                const ratingImages = yield this.productRatingImagesService.find({
                    select: ['id', 'fileName', 'filePath', 'fileType'],
                    where: {
                        ratingId: rating.ratingId,
                    },
                });
                obj.rating = rating.rating;
                obj.review = rating.review;
                obj.skuId = rating.skuId;
                obj.ratingImages = ratingImages;
            }
            else {
                obj.rating = 0;
                obj.review = '';
                obj.skuId = '';
                obj.ratingImages = [];
            }
            const successResponse = {
                status: 1,
                message: 'Successfully retrieved the order details.',
                data: obj,
            };
            return response.status(200).send(successResponse);
        });
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
    vendorBasedProductRatingCount(vendorId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    vendorId,
                },
            });
            if (!vendor) {
                const errorResponse = {
                    status: 1,
                    message: 'Invalid vendor ID. Please verify the vendor ID and try again.',
                };
                return response.status(404).send(errorResponse);
            }
            const rating = yield this.productRatingService.consolidateRatingForVendor(vendorId);
            const successResponse = {
                status: 1,
                message: 'Successfully retrieved product rating and reviews for the vendor. ',
                data: rating,
            };
            return response.status(200).send(successResponse);
        });
    }
};
exports.StoreRatingController = StoreRatingController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/rating/:skuId'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('skuId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('customerId')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "getProductRating", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/rating-count/:skuId'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('skuId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "getProductRatingCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/rating-statistics/:skuId'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('skuId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "getRatingStatistics", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(middleware_index_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Post)('/rating'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [RatingRequest_1.UpdateRatingStatusRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "Rating", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(middleware_index_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Post)('/review'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [RatingRequest_1.UpdateRatingStatusRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "Reviews", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(middleware_index_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Get)('/rating-by-order'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "orderDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-product-rating-count'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "vendorBasedProductRatingCount", null);
exports.StoreRatingController = StoreRatingController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/product-store'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        RatingService_1.ProductRatingService,
        CustomerService_1.CustomerService,
        OrderProductService_1.OrderProductService,
        OrderService_1.OrderService,
        ProductImageService_1.ProductImageService,
        VendorService_1.VendorService,
        S3Service_1.S3Service,
        ImageService_1.ImageService,
        SkuService_1.SkuService,
        RatingImageService_1.ProductRatingImagesService])
], StoreRatingController);
//# sourceMappingURL=StoreRatingController.js.map