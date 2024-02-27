"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorStoreRatingController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
// Services
const RatingService_1 = require("../../../RatingAndReview/services/RatingService");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let VendorStoreRatingController = class VendorStoreRatingController {
    constructor(productRatingService, vendorService) {
        this.productRatingService = productRatingService;
        this.vendorService = vendorService;
        // ---
    }
    // Vendor Product Review list API
    /**
     * @api {get} /api/product-store/vendor-product-review-list vendor product review List
     * @apiGroup vendor store
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you Vendor Product Review list show successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/vendor-product-review-list
     * @apiErrorExample {json} Vendor Product Review List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Vendor Product Review list Function
    vendorProductRatingList(vendorId, limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorDetail = yield this.vendorService.findOne({
                vendorId,
            });
            if (!vendorDetail) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid vendorId.',
                };
                return response.status(400).send(errorResponse);
            }
            const selects = ['ProductRating.review as review',
                'ProductRating.rating as rating',
                'ProductRating.productId as productId',
                'ProductRating.createdDate as createdDate',
                'ProductRating.firstName as firstName',
                'ProductRating.lastName as lastName',
                'ProductRating.customerId as customerId',
                'ProductRating.isActive as isActive',
                'customer.avatar as avatar',
                'customer.avatarPath as avatarPath',
            ];
            const whereCondition = [];
            const relations = [];
            const groupBy = [];
            relations.push({
                tableName: 'ProductRating.product',
                aliasName: 'product',
            }, {
                tableName: 'product.vendorProducts',
                aliasName: 'vendorProducts',
            }, {
                tableName: 'ProductRating.customer',
                aliasName: 'customer',
            });
            whereCondition.push({
                name: 'ProductRating.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'product.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'vendorProducts.vendorId',
                op: 'and',
                value: vendorId,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'ProductRating.createdDate',
                order: 'DESC',
            });
            if (count) {
                const ratingCountList = yield this.productRatingService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
                const countResponse = {
                    status: 1,
                    message: 'Successfully Got count',
                    data: ratingCountList,
                };
                return response.status(200).send(countResponse);
            }
            const ratingList = yield this.productRatingService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got rating list',
                data: ratingList,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-product-review-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('vendorId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorStoreRatingController.prototype, "vendorProductRatingList", null);
VendorStoreRatingController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/product-store'),
    tslib_1.__metadata("design:paramtypes", [RatingService_1.ProductRatingService,
        VendorService_1.VendorService])
], VendorStoreRatingController);
exports.VendorStoreRatingController = VendorStoreRatingController;
//# sourceMappingURL=VendorStoreRatingController.js.map