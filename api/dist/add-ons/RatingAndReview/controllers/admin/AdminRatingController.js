"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRatingController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
// Services
const RatingService_1 = require("../../services/RatingService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const UpdateRatingStatusRequest_1 = require("./requests/UpdateRatingStatusRequest");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const RatingImageService_1 = require("../../services/RatingImageService");
const typedi_1 = require("typedi");
let AdminRatingController = class AdminRatingController {
    constructor(productService, productRatingService, productRatingImagesService) {
        this.productService = productService;
        this.productRatingService = productRatingService;
        this.productRatingImagesService = productRatingImagesService;
        // ---
    }
    // Get product rating/review API
    /**
     * @api {Get} /api/admin-product-rating/:ratingId Get product Rating API
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
     *      "isActive": 1,
     *      "productRatingImages":""
     *        }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-rating/:ratingId
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
    // Change Status rating/review API
    /**
     * @api {put} /api/admin-product-rating/:id Product Rating Status API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiParam (Request body) {Number} status status should be 0-> In-Active or 1-> Active
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Successfully Updated the Rating Status.",
     *      "data": {
     *          "ratingId": 1,
     *          "status": 1,
     *       }
     * }
     * @apiSampleRequest /api/admin-product-rating/:id
     * @apiErrorExample {json} Product RatingStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    productRatingStatus(id, updateRatingStatus, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const Rating = yield this.productRatingService.findOne({ where: { ratingId: id } });
            Rating.isActive = updateRatingStatus.status;
            const updateRating = yield this.productRatingService.create(Rating);
            const RatingValue = yield this.productRatingService.consolidateRating(Rating.productId);
            const ProductData = yield this.productService.findOne({ where: { productId: Rating.productId } });
            ProductData.rating = RatingValue !== undefined ? RatingValue.RatingCount : 0;
            yield this.productService.create(ProductData);
            if (updateRating) {
                const successResponse = {
                    status: 1,
                    message: 'Product rating status has been successfully updated. ',
                    data: updateRating,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'Unable to update the product rating status. Please try again later.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Product Rating List API
    /**
     * @api {Get} /api/admin-product-rating Product Rating and review List API
     * @apiGroup Product
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
     *      "message": "Successfully get product rating list",
     *      "data": [{
     *      "ratingId": 1,
     *      "productId": 1,
     *      "orderProductId": 1,
     *      "customerId": 1,
     *      "rating": 1,
     *      "review": "",
     *      "firstName": "",
     *      "review": "",
     *      "createdDate": "",
     *      "lastName": "",
     *      "reviewImage": "",
     *      "reviewImagePath": "",
     *      "reviewVideo": "",
     *      "reviewVideoPath": "",
     *      "email": "",
     *      "productName": "",
     *      "image": "",
     *      "imagePath": "",
     *      "isActive": 1,
     *        }]
     * }
     * @apiSampleRequest /api/admin-product-rating
     * @apiErrorExample {json} productRatingList error
     * HTTP/1.1 500 Internal Server Error
     */
    productRatinglist(limit, offset, productName, startDate, endDate, starCount, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'ProductRating.ratingId as ratingId',
                'product.productId as productId',
                'ProductRating.orderProductId as orderProductId',
                'customer.id as customerId',
                'ProductRating.firstName as firstName',
                'ProductRating.lastName as lastName',
                'ProductRating.rating as rating',
                'ProductRating.skuId as skuId',
                'ProductRating.review as review',
                'ProductRating.image as reviewImage',
                'ProductRating.imagePath as reviewImagePath',
                'ProductRating.video as reviewVideo',
                'ProductRating.videoPath as reviewVideoPath',
                'ProductRating.email as email',
                'ProductRating.isActive as isActive',
                'ProductRating.created_date as createdDate',
                'ProductRating.modified_date as modifiedDate',
                '(SELECT p.name as name from product p where p.product_id = product.productId LIMIT 1) as productName',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as imagePath',
                '(SELECT s.sku_name as skuName FROM sku s WHERE s.id = ProductRating.skuId LIMIT 1) as skuName',
                `CASE
                WHEN ProductRating.modified_date IS NOT NULL THEN ProductRating.modified_date
                ELSE ProductRating.created_date
                END as customSortOrder`,
            ];
            const relations = [
                {
                    tableName: 'ProductRating.product',
                    op: 'left-join',
                    aliasName: 'product',
                },
                {
                    tableName: 'ProductRating.customer',
                    op: 'left-join',
                    aliasName: 'customer',
                },
            ];
            const WhereConditions = [];
            if (startDate && startDate !== '') {
                WhereConditions.push({
                    name: 'ProductRating.createdDate',
                    op: 'raw',
                    sign: '>=',
                    value: startDate,
                });
            }
            if (endDate && endDate !== '') {
                WhereConditions.push({
                    name: 'ProductRating.createdDate',
                    op: 'raw',
                    sign: '<=',
                    value: endDate,
                });
            }
            if (starCount && starCount !== '') {
                WhereConditions.push({
                    name: 'ProductRating.rating',
                    op: 'and',
                    value: +starCount,
                });
            }
            const searchConditions = [];
            if (productName && productName !== '') {
                searchConditions.push({
                    name: ['product.name'],
                    value: productName,
                });
            }
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['product.name', 'ProductRating.review', 'ProductRating.firstName', 'ProductRating.lastName'],
                    value: keyword,
                });
            }
            const sort = [
                {
                    name: 'customSortOrder',
                    order: 'DESC',
                },
            ];
            const productLists = yield this.productRatingService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, false, true);
            if (count) {
                const productListCount = yield this.productRatingService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, true, true);
                const successRes = {
                    status: 1,
                    message: 'Successfully retrieved the count of ratings and reviews for the product.',
                    data: productListCount,
                };
                return response.status(200).send(successRes);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully retrieved the complete list of ratings and reviews for the product.',
                data: productLists,
            };
            return response.status(200).send(successResponse);
        });
    }
};
exports.AdminRatingController = AdminRatingController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:ratingId'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('ratingId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminRatingController.prototype, "getProductRating", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'edit-rating-review']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateRatingStatusRequest_1.UpdateRatingStatusRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminRatingController.prototype, "productRatingStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin', 'list-rating-review']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('productName')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('startDate')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('endDate')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('starCount')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(8, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminRatingController.prototype, "productRatinglist", null);
exports.AdminRatingController = AdminRatingController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/admin-product-rating'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        RatingService_1.ProductRatingService,
        RatingImageService_1.ProductRatingImagesService])
], AdminRatingController);
//# sourceMappingURL=AdminRatingController.js.map