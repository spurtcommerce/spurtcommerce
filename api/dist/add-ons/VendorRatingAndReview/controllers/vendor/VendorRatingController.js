"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRatingController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
// Services
const RatingService_1 = require("../../../RatingAndReview/services/RatingService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const UpdateRatingStatusRequest_1 = require("./requests/UpdateRatingStatusRequest");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typeorm_1 = require("typeorm");
const RatingImageService_1 = require("../../../RatingAndReview/services/RatingImageService");
const typedi_1 = require("typedi");
let VendorRatingController = class VendorRatingController {
    constructor(productService, productRatingService, productRatingImagesService) {
        this.productService = productService;
        this.productRatingService = productRatingService;
        this.productRatingImagesService = productRatingImagesService;
        // ---
    }
    // Vendor Product Rating List API
    /**
     * @api {Get} /api/vendor-product-rating Vendor Product review List API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limits
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} startDate createDate
     * @apiParam (Request body) {String} endDate createDate
     * @apiParam (Request body) {String} starCount rating
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Vendor product reviews and ratings retrieved successfully.",
     *      "data": [{
     *        "ratingId": 1,
     *        "review": "",
     *        "rating": 1,
     *        "reviewImage": "",
     *        "reviewImagePath": "",
     *        "reviewVideo": "",
     *        "reviewVideoPath": "",
     *        "createdDate": "",
     *        "firstName": "",
     *        "lastName": "",
     *        "email": "",
     *        "productId": 1,
     *        "customerId": 1,
     *        "orderProductId": 1,
     *        "isActive": 1,
     *        "productName": ""
     *        "image": "",
     *        "imagePath": "",
     *           }]
     * }
     * @apiSampleRequest /api/vendor-product-rating
     * @apiErrorExample {json} VendorRatingList error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorProductRatinglist(limit, offset, productName, startDate, endDate, starCount, keyword, count, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'ProductRating.ratingId as ratingId',
                'ProductRating.review as review',
                'ProductRating.rating as rating',
                'ProductRating.image as reviewImage',
                'ProductRating.imagePath as reviewImagePath',
                'ProductRating.video as reviewVideo',
                'ProductRating.videoPath as reviewVideoPath',
                'ProductRating.created_date as createdDate',
                'ProductRating.modified_date as modifiedDate',
                'ProductRating.firstName as firstName',
                'ProductRating.lastName as lastName',
                'ProductRating.email as email',
                'product.productId as productId',
                'ProductRating.customerId as customerId',
                'ProductRating.skuId as skuId',
                'ProductRating.orderProductId as orderProductId',
                'ProductRating.isActive as isActive',
                'product.name as productName',
                'productImage.image as image',
                'productImage.containerName as imagePath',
                '(SELECT s.sku_name as skuName FROM sku s WHERE s.id = ProductRating.skuId LIMIT 1) as skuName',
                `CASE
                WHEN ProductRating.modified_date IS NOT NULL THEN ProductRating.modified_date
                ELSE ProductRating.created_date
                END as customSortOrder`,
            ];
            const relations = [{
                    tableName: 'ProductRating.product',
                    op: 'left-join',
                    aliasName: 'product',
                },
                {
                    tableName: 'product.productImage',
                    op: 'left-join',
                    aliasName: 'productImage',
                },
                {
                    tableName: 'product.vendorProducts',
                    op: 'left-join',
                    aliasName: 'vendorProducts',
                },
            ];
            const whereConditions = [];
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: 'ProductRating.createdDate',
                    op: 'raw',
                    sign: '>=',
                    value: startDate,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: 'ProductRating.createdDate',
                    op: 'raw',
                    sign: '<=',
                    value: endDate,
                });
            }
            if (starCount && starCount !== '') {
                whereConditions.push({
                    name: 'ProductRating.rating',
                    op: 'and',
                    value: +starCount,
                });
            }
            whereConditions.push({
                name: 'vendorProducts.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'productImage.defaultImage',
                op: 'and',
                value: 1,
            });
            const searchConditions = [];
            if (productName && productName !== '') {
                searchConditions.push({
                    name: ['product.name'],
                    value: productName,
                });
            }
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['product.name'],
                    value: keyword,
                });
            }
            const sort = [{
                    name: 'customSortOrder',
                    order: 'DESC',
                }];
            const vendorProductList = yield this.productRatingService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, false, true);
            if (count) {
                const vendorProductRatingCount = yield this.productRatingService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], [], true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got vendor product reviews and ratings count.',
                    data: vendorProductRatingCount,
                });
            }
            return response.status(200).send({
                status: 1,
                message: 'Vendor product reviews and ratings retrieved successfully.',
                data: vendorProductList,
            });
        });
    }
    // Change Status rating/review API
    /**
     * @api {Put} /api/vendor-product-rating/status Vendor Product Rating Status API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiBody (Request body) {Array} ids rating ids
     * @apiParam (Request body) {Number} status status should be 0-> In-Active or 1-> Active
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Vendor rating status updated successfully.",
     *      "data": {
     *          "ratingId": 1,
     *          "status": 1
     *      },
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-rating/status
     * @apiErrorExample {json} VendorProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    VendorProductRatingStatus(updateRatingStatus, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let ratings;
            ratings = yield this.productRatingService.findAll({ where: { ratingId: (0, typeorm_1.In)(updateRatingStatus.ids) } });
            ratings.map((productRating => productRating.isActive = updateRatingStatus.status));
            const updateRating = yield this.productRatingService.create(ratings);
            ratings.map((rating) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const RatingValue = yield this.productRatingService.consolidateRating(rating.skuId);
                const ProductData = yield this.productService.findOne({ where: { productId: rating.productId } });
                ProductData.rating = RatingValue !== undefined ? RatingValue.RatingCount : 0;
                yield this.productService.create(ProductData);
            }));
            if (updateRating) {
                const successResponse = {
                    status: 1,
                    message: 'The vendor product rating status has been successfully updated..',
                    data: updateRating,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'Unable to update the vendor product rating at the moment. Please try again later.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Get product rating/review API
    /**
     * @api {Get} /api/vendor-product-rating/:ratingId Get product Rating API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} ratingId ratingId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product rating",
     *      "data": [{
     *      "ratingId": 1,
     *      "review": "",
     *      "rating": "",
     *      "createdDate": "",
     *      "firstName": "",
     *      "lastName": "",
     *      "productId": 1,
     *      "customerId": 1,
     *      "orderProductId": 1,
     *      "productRatingImages":""
     *      "isActive": 1,
     *        }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-rating/:ratingId
     * @apiErrorExample {json} GetProductRating error
     * HTTP/1.1 500 Internal Server Error
     */
    getProductRating(ratingId, limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'ProductRating.ratingId as ratingId',
                'ProductRating.review as review',
                'ProductRating.rating as rating',
                'ProductRating.createdDate as createdDate',
                'ProductRating.firstName as firstName',
                'ProductRating.lastName as lastName',
                'ProductRating.productId as productId',
                'ProductRating.customerId as customerId',
                'ProductRating.orderProductId as orderProductId',
                'ProductRating.isActive as isActive',
                'ProductRating.skuId as skuId',
                '(SELECT p.name as name from product p where p.product_id = ProductRating.productId LIMIT 1) as productName',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = ProductRating.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = ProductRating.productId AND pi.default_image = 1 LIMIT 1) as imagePath',
                '(SELECT s.sku_name as skuName FROM sku s WHERE s.id = ProductRating.skuId LIMIT 1) as skuName',
                '(SELECT c.avatar FROM customer c WHERE c.id = ProductRating.customerId LIMIT 1) as avatar',
                '(SELECT c.avatar_path FROM customer c WHERE c.id = ProductRating.customerId LIMIT 1) as avatarPath',
            ];
            const relations = [];
            const WhereConditions = [
                {
                    name: 'ProductRating.ratingId',
                    op: 'where',
                    value: ratingId,
                },
            ];
            const rating = yield this.productRatingService.listByQueryBuilder(limit, offset, select, WhereConditions, [], relations, [], [], count, true);
            const promise = rating.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = result;
                const productRatingImages = yield this.productRatingImagesService.find({ where: { ratingId: result.ratingId } });
                temp.productRatingImages = productRatingImages;
                return temp;
            }));
            const value = yield Promise.all(promise);
            if (value) {
                const successResponse = {
                    status: 1,
                    message: 'Product rating retrieved successfully.',
                    data: value,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'Unable to retrieve product rating. Please try again later.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
exports.VendorRatingController = VendorRatingController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('productName')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('starCount')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(8, (0, routing_controllers_1.Res)()),
    tslib_1.__param(9, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorRatingController.prototype, "vendorProductRatinglist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/status'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateRatingStatusRequest_1.UpdateRatingStatusRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorRatingController.prototype, "VendorProductRatingStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:ratingId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('ratingId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorRatingController.prototype, "getProductRating", null);
exports.VendorRatingController = VendorRatingController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/vendor-product-rating'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        RatingService_1.ProductRatingService,
        RatingImageService_1.ProductRatingImagesService])
], VendorRatingController);
//# sourceMappingURL=VendorRatingController.js.map