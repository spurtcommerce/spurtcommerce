"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductGroupController = void 0;
const tslib_1 = require("tslib");
const ProductGroupService_1 = require("../../services/ProductGroupService");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
// @UseBefore(CheckAddonMiddleware)
let ProductGroupController = class ProductGroupController {
    constructor(productGroupService) {
        this.productGroupService = productGroupService;
    }
    /**
     * @api {get} /api/product-group/:productId Get Product Group
     * @apiGroup Product Group
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (Route Parameter) {Number} productId Product ID
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got product group.",
     *   "data": []
     * }
     *
     * @apiSampleRequest /api/product-group/:productId
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error."
     * }
     */
    getProductGroup(productId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'productGroup.id as id',
                'productGroup.parentProductId as parentProductId',
                'productGroup.productId as productId',
                'productGroup.skuId as skuId',
                'productGroup.isActive as isActive',
                'product.name as name',
                'product.sku as skuName',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = productGroup.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = productGroup.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT sku.price as price FROM sku WHERE sku.id = productGroup.skuId) as price',
            ];
            const whereConditions = [
                {
                    name: 'productGroup.parentProductId',
                    op: 'where',
                    value: productId,
                },
            ];
            const searchConditions = [];
            const relations = [
                {
                    tableName: 'productGroup.product',
                    op: 'left',
                    aliasName: 'product',
                },
            ];
            const sort = [{
                    name: 'product.createdDate',
                    order: 'DESC',
                }];
            const productGroupDetail = yield this.productGroupService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, [], sort, false, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got product group.',
                data: productGroupDetail,
            });
        });
    }
};
exports.ProductGroupController = ProductGroupController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:productId'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductGroupController.prototype, "getProductGroup", null);
exports.ProductGroupController = ProductGroupController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/product-group'),
    tslib_1.__metadata("design:paramtypes", [ProductGroupService_1.ProductGroupService])
], ProductGroupController);
//# sourceMappingURL=ProductGroupController.js.map