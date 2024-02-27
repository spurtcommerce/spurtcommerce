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
let VendorRatingController = class VendorRatingController {
    constructor(productService, productRatingService) {
        this.productService = productService;
        this.productRatingService = productRatingService;
        // ---
    }
    // Vendor Product Rating List API
    /**
     * @api {get} /api/vendor-product/vendorproduct-rating-list Vendor Product review List API
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
     *       "status": "1"
     *      "message": "Successfully get vendor product rating list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/vendor-product/vendorproduct-rating-list
     * @apiErrorExample {json} VendorRatingList error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorProductRatinglist(limit, offset, productName, startDate, endDate, starCount, keyword, count, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'ProductRating.ratingId as ratingId',
                'ProductRating.review as review',
                'ProductRating.rating as rating',
                'ProductRating.createdDate as createdDate',
                'ProductRating.firstName as firstName',
                'ProductRating.lastName as lastName',
                'ProductRating.email as email',
                'product.productId as productId',
                'ProductRating.customerId as customerId',
                'ProductRating.orderProductId as orderProductId',
                'ProductRating.isActive as isActive',
                'product.name as productName',
                'productImage.image as image',
                'productImage.containerName as imagePath',
            ];
            const relations = [{
                    tableName: 'ProductRating.product',
                    aliasName: 'product',
                },
                {
                    tableName: 'product.productImage',
                    aliasName: 'productImage',
                },
                {
                    tableName: 'product.vendorProducts',
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
                    name: 'ProductRating.ratingId',
                    order: 'DESC',
                }];
            const vendorProductList = yield this.productRatingService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, false, true);
            if (count) {
                const vendorProductRatingCount = yield this.productRatingService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], [], true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got count ',
                    data: vendorProductRatingCount,
                });
            }
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the vendor product review and rating list',
                data: vendorProductList,
            });
        });
    }
    // Change Status rating/review API
    /**
     * @api {put} /api/vendor-product/vendorproduct-rating-status/:id Vendor Product Rating Status API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} status status should be 0-> In-Active or 1-> Active
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully updated review status.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/vendorproduct-rating-status/:id
     * @apiErrorExample {json} VendorProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    VendorProductRatingStatus(id, updateRatingStatus, response, request) {
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
                    message: 'Successfully Updated Vendor product Rating Status. ',
                    data: updateRating,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'unable to update Vendor product Rating.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendorproduct-rating-list'),
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
    (0, routing_controllers_1.Put)('/vendorproduct-rating-status/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateRatingStatusRequest_1.UpdateRatingStatusRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorRatingController.prototype, "VendorProductRatingStatus", null);
VendorRatingController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/vendor-product'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        RatingService_1.ProductRatingService])
], VendorRatingController);
exports.VendorRatingController = VendorRatingController;
//# sourceMappingURL=VendorRatingController.js.map