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
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let StoreRatingController = class StoreRatingController {
    constructor(productService, productRatingService, customerService, orderProductService, orderService, productImageService, vendorService) {
        this.productService = productService;
        this.productRatingService = productRatingService;
        this.customerService = customerService;
        this.orderProductService = orderProductService;
        this.orderService = orderService;
        this.productImageService = productImageService;
        this.vendorService = vendorService;
        // ---
    }
    // Get product rating/review API
    /**
     * @api {get} /api/product-store/Get-Product-rating Get product Rating API
     * @apiGroup Store
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product rating and review.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/Get-Product-rating
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    getProductRating(productId, limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                productSlug: productId,
            });
            if (!productDetail) {
                const errorResponse = {
                    status: 1,
                    message: 'Invalid product.',
                };
                return response.status(404).send(errorResponse);
            }
            const select = ['review', 'rating', 'createdDate', 'firstName', 'lastName', 'productId', 'customerId', 'isActive'];
            const relation = [];
            const WhereConditions = [
                {
                    name: 'productId',
                    op: 'where',
                    value: productDetail.productId,
                }, {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const rating = yield this.productRatingService.list(limit, offset, select, relation, WhereConditions, count);
            const promise = rating.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = result;
                const customer = yield this.customerService.findOne({
                    select: ['firstName', 'avatar', 'avatarPath'],
                    where: { id: result.customerId },
                });
                const val = Object.assign({}, temp, customer);
                return val;
            }));
            const value = yield Promise.all(promise);
            if (value) {
                const successResponse = {
                    status: 1,
                    message: 'successfully got the product Rating. ',
                    data: value,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'unable to get product Rating.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Get product rating/review API
    /**
     * @api {get} /api/product-store/get-product-rating-count Get product Rating Count API
     * @apiGroup Store
     * @apiParam (Request body) {Number} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product rating and review.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/get-product-rating-count
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    getProductRatingCount(productId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                productId,
            });
            if (!productDetail) {
                const errorResponse = {
                    status: 1,
                    message: 'Invalid product.',
                };
                return response.status(404).send(errorResponse);
            }
            const ratingCount = yield this.productRatingService.ratingStatistics(productId);
            const reviewCount = yield this.productRatingService.getReviewCount(productId);
            const rating = yield this.productRatingService.consolidateRating(productId);
            const successResponse = {
                status: 1,
                message: 'successfully got the product Rating. ',
                data: {
                    ratingCount: ratingCount ? ratingCount.rating : 0,
                    reviewCount: reviewCount ? reviewCount.review : '',
                    rating: rating ? rating.RatingCount : 0,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    // Get product rating/review  countAPI
    /**
     * @api {get} /api/product-store/get-rating-statistics Get Rating Statistics API
     * @apiGroup Store
     * @apiParam (Request body) {Number} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product rating and review statistics.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/get-rating-statistics
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    getRatingStatistics(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ratings = [];
            for (let stars = 1; stars <= 5; stars++) {
                const WhereConditions = [
                    {
                        name: 'rating',
                        op: 'where',
                        value: stars,
                    }, {
                        name: 'productId',
                        op: 'where',
                        value: id,
                    },
                ];
                const count = 1;
                const star = yield this.productRatingService.list(0, 0, 0, 0, WhereConditions, count);
                ratings.push(star);
            }
            const totalRatingReview = yield this.productRatingService.ratingStatistics(id);
            const starsCount = { oneStar: ratings[0], twoStar: ratings[1], threeStar: ratings[2], fourStar: ratings[3], fiveStar: ratings[4] };
            if (starsCount) {
                const successResponse = {
                    status: 1,
                    message: 'successfully got the product ratings & review count.',
                    data: { starsCount, totalRatingReview },
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Product Rating  API
    /**
     * @api {post} /api/product-store/add-rating Add Rating  API
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId
     * @apiParam (Request body) {Number} orderProductId
     * @apiParam (Request body) {String} reviews productReviews
     * @apiParam (Request body) {Number} rating productRatings
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated your reviews and ratings!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product-store/add-rating
     * @apiErrorExample {json} rating error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order List Function
    Rating(ratingValue, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.productService.findOne({
                where: { productId: request.body.productId },
            });
            if (!resultData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            const orderProduct = yield this.orderProductService.findOne({
                where: {
                    orderProductId: request.body.orderProductId,
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
                    message: 'Invalid rating for this user',
                };
                return response.status(400).send(errResponse);
            }
            const rating = yield this.productRatingService.findOne({
                where: {
                    orderProductId: request.body.orderProductId,
                },
            });
            if (rating) {
                rating.review = request.body.reviews;
                rating.rating = request.body.rating;
                rating.isActive = 0;
                const updateRatings = yield this.productRatingService.create(rating);
                if (updateRatings) {
                    const updateRating = yield this.productRatingService.consolidateRating(request.body.productId);
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
                const customer = yield this.customerService.findOne({ where: { id: request.user.id } });
                const newRating = new ProductRating_1.ProductRating();
                newRating.review = request.body.reviews;
                newRating.rating = request.body.rating;
                newRating.orderProductId = request.body.orderProductId;
                newRating.productId = request.body.productId;
                newRating.customerId = request.user.id;
                newRating.firstName = customer.firstName;
                newRating.lastName = customer.lastName;
                newRating.email = customer.email;
                newRating.isActive = 0;
                const AddRating = yield this.productRatingService.create(newRating);
                if (AddRating) {
                    const updateRating = yield this.productRatingService.consolidateRating(request.body.productId);
                    resultData.rating = updateRating !== undefined ? updateRating.RatingCount : 0;
                    yield this.productService.create(resultData);
                    const successResponse = {
                        status: 1,
                        message: 'Successfully created your ratings and reviews',
                    };
                    return response.status(200).send(successResponse);
                }
            }
        });
    }
    // Product Reviews  API
    /**
     * @api {post} /api/product-store/add-reviews Add Reviews  API
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number}  productId productId
     * @apiParam (Request body) {Number}  orderProductId
     * @apiParam (Request body) {String} reviews productReviews
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added reviews!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product-store/add-reviews
     * @apiErrorExample {json} reviews error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order List Function
    Reviews(Value, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.productService.findOne({
                where: { productId: request.body.productId },
            });
            if (!resultData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            const rating = yield this.productRatingService.findOne({
                where: {
                    orderProductId: request.body.orderProductId,
                },
            });
            if (rating) {
                rating.review = request.body.reviews;
                const updateRating = yield this.productRatingService.create(rating);
                if (updateRating) {
                    const successResponse = {
                        status: 1,
                        message: 'Successfully updated your reviews',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                const customer = yield this.customerService.findOne({ where: { id: request.user.id } });
                const newRating = new ProductRating_1.ProductRating();
                newRating.review = request.body.reviews;
                newRating.productId = request.body.productId;
                newRating.orderProductId = request.body.orderProductId;
                newRating.customerId = request.user.id;
                newRating.firstName = customer.firstName;
                newRating.lastName = customer.lastName;
                newRating.email = customer.email;
                newRating.isActive = 1;
                yield this.productRatingService.create(newRating);
                const successResponse = {
                    status: 1,
                    message: 'Successfully created your reviews',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Customer Rating Detail By Order API
    /**
     * @api {get} /api/product-store/rating-detail-by-order Customer Rating Detail By Order
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId orderProductId
     * @apiParamExample {json} Input
     * {
     *      "orderProductId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product-store/rating-detail-by-order
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
                    message: 'Invalid Order Product Id',
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
                    message: 'Invalid order for this customer',
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
                select: ['rating', 'review'],
                where: {
                    customerId: request.user.id,
                    orderProductId: orderProduct.orderProductId,
                    productId: orderProduct.productId,
                },
            });
            if (rating !== undefined) {
                obj.rating = rating.rating;
                obj.review = rating.review;
            }
            else {
                obj.rating = 0;
                obj.review = '';
            }
            const successResponse = {
                status: 1,
                message: 'Successfully show the order details',
                data: obj,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Get Product Rating And Review Based On Vendor API
    /**
     * @api {get} /api/product-store/get-vendor-product-rating-count Get Product Rating And Review Based On Vendor API
     * @apiGroup Store
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product rating and review.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/get-vendor-product-rating-count
     * @apiErrorExample {json} Product error
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
                    message: 'Invalid vendor Id.',
                };
                return response.status(404).send(errorResponse);
            }
            const rating = yield this.productRatingService.consolidateRatingForVendor(vendorId);
            const successResponse = {
                status: 1,
                message: 'successfully got the product Rating. ',
                data: rating,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/Get-Product-rating'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "getProductRating", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/get-product-rating-count'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "getProductRatingCount", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/get-rating-statistics'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "getRatingStatistics", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(middleware_index_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Post)('/add-rating'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "Rating", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(middleware_index_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Post)('/add-reviews'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "Reviews", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(middleware_index_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Get)('/rating-detail-by-order'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "orderDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/get-vendor-product-rating-count'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "vendorBasedProductRatingCount", null);
StoreRatingController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/product-store'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        RatingService_1.ProductRatingService,
        CustomerService_1.CustomerService,
        OrderProductService_1.OrderProductService,
        OrderService_1.OrderService,
        ProductImageService_1.ProductImageService,
        VendorService_1.VendorService])
], StoreRatingController);
exports.StoreRatingController = StoreRatingController;
//# sourceMappingURL=StoreRatingController.js.map