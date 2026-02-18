"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreCommonProductController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const VendorProductService_1 = require("../../../../src/api/core/services/VendorProductService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typedi_1 = require("typedi");
let StoreCommonProductController = class StoreCommonProductController {
    constructor(vendorProductService, productService) {
        this.vendorProductService = vendorProductService;
        this.productService = productService;
        // --
    }
    // Common Product List API
    /**
     * @api {get} /api/store-common-product/common-product-list/:productSlug Common Product List API
     * @apiGroup Common Store Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get store Common Product list",
     *      "data":[
     *                  {
     *                      "productId": 1,
     *                      "vendorId": 1,
     *                      "productName": "",
     *                      "price": "",
     *                      "skuName": "",
     *                      "quantity": "1",
     *                      "firstName": "",
     *                      "lastName": ""
     *                  }
     *              ]
     * @apiSampleRequest /api/store-common-product/common-product-list/:productSlug
     * @apiErrorExample {json} commonProductList error
     * HTTP/1.1 500 Internal Server Error
     */
    commonProductList(productSlug, limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productSlug,
                    isActive: 1,
                },
            });
            if (!product) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid productSlug',
                });
            }
            const select = [
                'product.productId as productId',
                'vendor.vendorId as vendorId',
                'vendor.companyCountryId as companyCountryId',
                'vendor.companyTaxNumber as companyTaxNumber',
                'vendor.companyName as companyName',
                'vendor.companyLogo as companyLogo',
                'vendor.companyLogoPath as companyLogoPath',
                'vendor.displayNameUrl as displayNameUrl',
                'country.name as companyCountryName',
                'product.name as productName',
                'sku.price as price',
                'sku.skuName as skuName',
                'sku.quantity as quantity',
                'sku.id as skuId',
                'customer.firstName as firstName',
                'customer.lastName as lastName',
            ];
            const relations = [];
            relations.push({
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            }, {
                tableName: 'VendorProducts.vendor',
                aliasName: 'vendor',
            }, {
                tableName: 'VendorProducts.sku',
                aliasName: 'sku',
            }, {
                tableName: 'vendor.country',
                aliasName: 'country',
            }, {
                tableName: 'vendor.customer',
                aliasName: 'customer',
            });
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorProducts.productId',
                op: 'and',
                value: product.productId,
            }, {
                name: 'VendorProducts.reuseStatus',
                op: 'and',
                value: 1,
            });
            if (count) {
                const vendorProductCount = yield this.vendorProductService.listByQueryBuilder(limit, offset, select, whereConditions, [], relations, [], [], true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the count',
                    data: vendorProductCount,
                });
            }
            const vendorProducts = yield this.vendorProductService.listByQueryBuilder(limit, offset, select, whereConditions, [], relations, [], [], false, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the Product List',
                data: vendorProducts,
            });
        });
    }
    // Common Catalog Vendor Count API
    /**
     * @api {get} /api/store-common-product/vendor-count/:productId Common Catalog Vendor Count API
     * @apiGroup Common Store Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor count",
     *      "data":{
     *      "vendorCount" : 1,
     * }
     * @apiSampleRequest /api/store-common-product/vendor-count/:productId
     * @apiErrorExample {json} commonCatalogVendorCount error
     * HTTP/1.1 500 Internal Server Error
     */
    commonCatalogVendorCount(productId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId,
                    isActive: 1,
                },
            });
            if (!product) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid productId',
                });
            }
            const vendorCount = yield this.vendorProductService.vendorCountAndMinPrice(productId);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got vendor count',
                data: vendorCount,
            });
        });
    }
};
exports.StoreCommonProductController = StoreCommonProductController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/common-product-list/:productSlug'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productSlug')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCommonProductController.prototype, "commonProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-count/:productId'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCommonProductController.prototype, "commonCatalogVendorCount", null);
exports.StoreCommonProductController = StoreCommonProductController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/store-common-product'),
    tslib_1.__metadata("design:paramtypes", [VendorProductService_1.VendorProductService,
        ProductService_1.ProductService])
], StoreCommonProductController);
//# sourceMappingURL=StoreProductController.js.map