"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProductGroupController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductGroupService_1 = require("../../services/ProductGroupService");
const OrderProductService_1 = require("../../../../src/api/core/services/OrderProductService");
const ProductTranslationService_1 = require("../../../../src/api/core/services/ProductTranslationService");
const TranslationMiddleware_1 = require("../../../../src/api/core/middlewares/TranslationMiddleware");
const typedi_1 = require("typedi");
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
// @UseBefore(CheckAddonMiddleware)
let StoreProductGroupController = class StoreProductGroupController {
    constructor(productGroupService, orderProductService, productTranslationService) {
        this.productGroupService = productGroupService;
        this.orderProductService = orderProductService;
        this.productTranslationService = productTranslationService;
    }
    /**
     * @api {get} /api/product-store/product-search-list/:productId Get Product Search List
     * @apiGroup Store Product Group
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (Route Parameter) {Number} productId Product ID
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Successfully got a product search list",
     *   "data": [
     *     {}
     *   ]
     * }
     *
     * @apiSampleRequest /api/product-store/product-search-list/:productId
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error."
     * }
     */
    getProductGroup(productId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'productGroup.id as id',
                'productGroup.parentProductId as parentProductId',
                'productGroup.productId as productId',
                'productGroup.skuId as skuId',
                'productGroup.isActive as isActive',
                'product.name as name',
                'product.sku as skuName',
                'product.description as description',
                'product.dateAvailable as dateAvailable',
                'product.sortOrder as sortOrder',
                'product.upc as upc',
                'product.isActive as isActive',
                'product.productSlug as productSlug',
                'product.hasStock as hasStock',
                'product.outOfStockThreshold as outOfStockThreshold',
                'product.stockStatusId as stockStatusId',
                'product.createdDate as createdDate',
                'product.keywords as keywords',
                'product.productType as productType',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = productGroup.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = productGroup.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT sku.price as price FROM sku WHERE sku.id = productGroup.skuId) as price',
                '(SELECT sku.quantity as quantity FROM sku WHERE sku.id = productGroup.skuId) as quantity',
                '(SELECT sku.out_of_stock_threshold as outOfStockThreshold FROM sku WHERE sku.id = skuId) as outOfStockThreshold',
                '(SELECT sku.notify_min_quantity_below as notifyMinQuantity FROM sku WHERE sku.id = skuId) as notifyMinQuantity',
                '(SELECT sku.min_quantity_allowed_cart as minQuantityAllowedCart FROM sku WHERE sku.id = skuId) as minQuantityAllowedCart',
                '(SELECT sku.max_quantity_allowed_cart as maxQuantityAllowedCart FROM sku WHERE sku.id = skuId) as maxQuantityAllowedCart',
                '(SELECT sku.enable_back_orders as enableBackOrders FROM sku WHERE sku.id = skuId) as enableBackOrders',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
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
            const productData = productGroupDetail.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const temp = value;
                const orderProductForBackOrder = yield this.orderProductService.listByQueryBuilder(0, 0, [], [
                    { name: 'order.backOrders', op: 'where', value: 1 },
                    { name: 'OrderProduct.skuName', op: 'and', value: `'${value.skuName}'` },
                ], [], [{ tableName: 'OrderProduct.order', aliasName: 'order' }], [], [], false, false);
                const totalbackOrderQuantity = orderProductForBackOrder.reduce((total, item) => {
                    return total + item.quantity;
                }, 0);
                temp.availableBackOrderStock = value.backOrderStockLimit - totalbackOrderQuantity;
                if (value.hasStock === 1) {
                    if (value.quantity <= value.outOfStockThreshold) {
                        temp.stockStatus = 'outOfStock';
                    }
                    else {
                        temp.stockStatus = 'inStock';
                    }
                }
                else {
                    temp.stockStatus = 'inStock';
                }
                if (value.productSpecial !== undefined) {
                    temp.pricerefer = value.productSpecial;
                    temp.flag = 1;
                }
                else if (value.productDiscount !== undefined) {
                    temp.pricerefer = value.productDiscount;
                    temp.flag = 0;
                }
                else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
                const productTrans = yield this.productTranslationService.find({ where: { productId: value.productId } });
                temp.productNameTrans = (_b = ((_a = productTrans.find((val) => val.languageId === request.languageId)) === null || _a === void 0 ? void 0 : _a.name)) !== null && _b !== void 0 ? _b : '';
                return temp;
            }));
            const results = yield Promise.all(productData);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got product group.',
                data: results,
            });
        });
    }
};
exports.StoreProductGroupController = StoreProductGroupController;
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    (0, routing_controllers_1.Get)('/:productId'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductGroupController.prototype, "getProductGroup", null);
exports.StoreProductGroupController = StoreProductGroupController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/store-product-group'),
    tslib_1.__metadata("design:paramtypes", [ProductGroupService_1.ProductGroupService,
        OrderProductService_1.OrderProductService,
        ProductTranslationService_1.ProductTranslationService])
], StoreProductGroupController);
//# sourceMappingURL=StoreProductGroupController.js.map