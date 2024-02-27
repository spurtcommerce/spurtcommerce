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
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const UpdateRatingStatusRequest_1 = require("./requests/UpdateRatingStatusRequest");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let AdminRatingController = class AdminRatingController {
    constructor(productService, productRatingService, customerService) {
        this.productService = productService;
        this.productRatingService = productRatingService;
        this.customerService = customerService;
        // ---
    }
    // Get product rating/review API
    /**
     * @api {get} /api/admin-product-rating/Get-Product-rating Get product Rating API
     * @apiGroup Product
     * @apiHeader {String} Authorization
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
     * @apiSampleRequest /api/admin-product-rating/Get-Product-rating
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    getProductRating(productId, limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['ratingId', 'review', 'rating', 'createdDate', 'firstName', 'lastName', 'productId', 'customerId', 'orderProductId', 'isActive'];
            const relation = [];
            const WhereConditions = [
                {
                    name: 'productId',
                    op: 'where',
                    value: productId,
                },
            ];
            const rating = yield this.productRatingService.list(limit, offset, select, relation, WhereConditions, count);
            const promise = rating.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = result;
                const customer = yield this.customerService.findOne({
                    select: ['avatar', 'avatarPath'],
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
    // Change Status rating/review API
    /**
     * @api {put} /api/admin-product-rating/:id Product Rating Status API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} status status should be 0-> In-Active or 1-> Active
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully updated review status.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-product-rating/:id
     * @apiErrorExample {json} Product error
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
                    message: 'Successfully Updated the Rating Status. ',
                    data: updateRating,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'Unable to update the product Rating.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Product Rating List API
    /**
     * @api {get} /api/admin-product-rating Product Rating and review List API
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
     *       "status": "1"
     *      "message": "Successfully get product rating list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/admin-product-rating
     * @apiErrorExample {json} productRatingList error
     * HTTP/1.1 500 Internal Server Error
     */
    productRatinglist(limit, offset, productName, startDate, endDate, starCount, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'ProductRating.ratingId as ratingId',
                'product.productId as productId',
                'ProductRating.orderProductId as orderProductId',
                'customer.id as customerId',
                'ProductRating.firstName as firstName',
                'ProductRating.lastName as lastName',
                'ProductRating.rating as rating',
                'ProductRating.review as review',
                'ProductRating.email as email',
                'ProductRating.isActive as isActive',
                'ProductRating.createdDate as createdDate',
                '(SELECT p.name as name from product p where p.product_id = product.productId LIMIT 1) as productName',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as imagePath',
            ];
            const relations = [
                {
                    tableName: 'ProductRating.product',
                    aliasName: 'product',
                },
                {
                    tableName: 'ProductRating.customer',
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
            const sort = [
                {
                    name: 'ProductRating.createdDate',
                    order: 'DESC',
                },
            ];
            const productLists = yield this.productRatingService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, false, true);
            if (count) {
                const productListCount = yield this.productRatingService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, true, true);
                const successRes = {
                    status: 1,
                    message: 'Successfully got count ',
                    data: productListCount,
                };
                return response.status(200).send(successRes);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete product rating and review.',
                data: productLists,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/Get-Product-rating'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('productId')),
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
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminRatingController.prototype, "productRatinglist", null);
AdminRatingController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/admin-product-rating'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        RatingService_1.ProductRatingService,
        CustomerService_1.CustomerService])
], AdminRatingController);
exports.AdminRatingController = AdminRatingController;
//# sourceMappingURL=AdminRatingController.js.map