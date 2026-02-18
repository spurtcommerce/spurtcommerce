"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonProductController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const SkuModel_1 = require("../../../../src/api/core/models/SkuModel");
const VendorProducts_1 = require("../../../../src/api/core/models/VendorProducts");
const VendorProductService_1 = require("../../../../src/api/core/services/VendorProductService");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const CategoryService_1 = require("../../../../src/api/core/services/CategoryService");
const ProductToCategoryService_1 = require("../../../../src/api/core/services/ProductToCategoryService");
const CreateAndUpdateCommonVendorProduct_1 = require("./requests/CreateAndUpdateCommonVendorProduct");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const VendorGroupCategoryService_1 = require("../../../../src/api/core/services/VendorGroupCategoryService");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typedi_1 = require("typedi");
let CommonProductController = class CommonProductController {
    constructor(vendorProductService, skuService, vendorService, productService, categoryService, productToCategoryService, vendorGroupCategoryService) {
        this.vendorProductService = vendorProductService;
        this.skuService = skuService;
        this.vendorService = vendorService;
        this.productService = productService;
        this.categoryService = categoryService;
        this.productToCategoryService = productToCategoryService;
        this.vendorGroupCategoryService = vendorGroupCategoryService;
    }
    // Common Vendor Product List API
    /**
     * @api {get} /api/vendor-common-product/common-product-list Common Vendor Product List API
     * @apiGroup Common Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {Number} keyword keyword
     * @apiParam (Request body) {Number} addedProducts addedProducts
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Common Product list",
     *      "data": [
     *                  {
     *                     "productId": 1,
     *                     "productName": "",
     *                     "skuId": 6,
     *                     "skuName": "",
     *                     "price": "",
     *                     "quantity": "",
     *                     "isCommon": 1,
     *                     "owner": 2,
     *                     "createdBy": 1,
     *                     "image": "",
     *                     "containerName": "",
     *                     "vendorCategory": [
     *                      {
     *                             "productId": 1,
     *                             "categoryId": 3,
     *                             "categoryName": ""
     *                      }
     *                  ]
     *              }
     *      ]
     * @apiSampleRequest /api/vendor-common-product/common-product-list
     * @apiErrorExample {json} commonCatalogList error
     * HTTP/1.1 500 Internal Server Error
     */
    commonProductList(limit, offset, count, addedProducts, keyword, productName, sku, sortBy, sortOrder, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorId = request.user.vendorId;
            const vendor = yield this.vendorService.findOne({ where: { vendorId } });
            const vendorGroup = yield this.vendorGroupCategoryService.findAll({
                where: { vendorGroupId: vendor.vendorGroupId },
            });
            const categoryIds = yield vendorGroup.map(val => val.categoryId);
            if (categoryIds.length === 0) {
                return response.status(200).send({
                    status: 0,
                    message: 'Successfully got the vendor common product list',
                    data: [],
                });
            }
            const select = [];
            const sort = [];
            if (addedProducts === 1) {
                select.push('DISTINCT(Product.productId) as productId', 'Product.name as productName,vendorProducts.sku_id as skuId');
                sort.push({
                    name: 'vendorProducts.commonProductDate',
                    order: 'DESC',
                });
            }
            else {
                select.push('DISTINCT(Product.productId) as productId', 'Product.name as productName');
                select.push('Product.skuId as skuId');
            }
            select.push('(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName', '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price', '(SELECT sku.quantity as quantity FROM sku WHERE sku.id = skuId) as quantity', 'Product.isCommon as isCommon', 'Product.owner as owner', 'Product.createdBy as createdBy', `(SELECT 1 AS status FROM vendor_product WHERE vendor_id = ${vendorId} AND reuse = 1 AND product_id = productId UNION SELECT 0 LIMIT 1) as reuseStatus`, '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image', '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName');
            const relations = [];
            relations.push({
                tableName: 'Product.productToCategory',
                aliasName: 'productToCategory',
            }, {
                tableName: 'productToCategory.category',
                aliasName: 'category',
            });
            const whereConditions = [];
            relations.push({
                tableName: 'Product.vendorProducts',
                aliasName: 'vendorProducts',
                op: 'left',
            });
            if (+addedProducts === 1) {
                whereConditions.push({
                    name: 'vendorProducts.vendorId',
                    op: 'and',
                    value: vendorId,
                }, {
                    name: 'vendorProducts.reuse',
                    op: 'and',
                    value: 1,
                });
                select.push('vendorProducts.commonProductDate as commonProductDate');
            }
            whereConditions.push({
                name: '(`Product`.`owner`',
                op: 'rawnumber',
                sign: '!=',
                value: 2,
            }, {
                name: '`Product`.`created_by`',
                op: 'rawnumberor',
                sign: '!=',
                value: vendorId + ')',
            }, {
                name: 'Product.isCommon',
                op: 'and',
                value: 1,
            }, {
                name: 'Product.isSimplified',
                op: 'and',
                value: 1,
            }, {
                name: 'Product.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'category.category_id',
                op: 'IN',
                value: categoryIds,
            });
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['Product.name', 'Product.sku'],
                    value: keyword,
                });
            }
            if (productName && productName !== '') {
                searchConditions.push({
                    name: ['Product.name'],
                    value: productName,
                });
            }
            if (sku && sku !== '') {
                searchConditions.push({
                    name: ['Product.sku'],
                    value: sku,
                });
            }
            if (sortBy === 'productName') {
                sort.push({
                    name: 'Product.name',
                    order: sortOrder !== null && sortOrder !== void 0 ? sortOrder : 'DESC',
                });
            }
            if (sortBy === 'sku') {
                sort.push({
                    name: 'skuName',
                    order: sortOrder !== null && sortOrder !== void 0 ? sortOrder : 'DESC',
                });
            }
            if (sortBy === 'price') {
                sort.push({
                    name: 'price',
                    order: sortOrder !== null && sortOrder !== void 0 ? sortOrder : 'DESC',
                });
            }
            if (count) {
                const commonProductListCount = yield this.productService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], [], true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the vendor common product count',
                    data: commonProductListCount,
                });
            }
            const commonProductList = yield this.productService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, false, true);
            const promise = commonProductList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const vendorProductData = yield this.vendorProductService.findOne({ where: { productId: result.productId, vendorId: request.user.vendorId, reuse: 1 } });
                const temp = result;
                const categories = yield this.productToCategoryService.findAll({
                    select: ['categoryId', 'productId'],
                    where: { productId: result.productId },
                }).then((val) => {
                    const category = val.map((values) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryNames = yield this.categoryService.findOne({ where: { categoryId: values.categoryId } });
                        const tempp = values;
                        if (categoryNames) {
                            tempp.categoryName = categoryNames.name;
                        }
                        else {
                            tempp.categoryName = '';
                        }
                        return tempp;
                    }));
                    const results = Promise.all(category);
                    return results;
                });
                temp.vendorCategory = categories;
                if (vendorProductData) {
                    const findSku = yield this.skuService.findOne({ where: { id: vendorProductData.sku_id } });
                    if (sku) {
                        temp.skuName = findSku.skuName;
                        temp.price = findSku.price;
                        temp.quantity = findSku.quantity;
                        temp.reuse = 1;
                    }
                }
                return temp;
            }));
            const value = yield Promise.all(promise);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the vendor common product list',
                data: value,
            });
        });
    }
    // create and update vendor common product API
    /**
     * @api {post} /api/vendor-common-product/set-vendor-common-product create and update vendor common product API
     * @apiGroup Common Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {String} sku
     * @apiParam (Request body) {String} price
     * @apiParam (Request body) {Number} quantity
     * @apiParamExample {json} Input
     * {
     *      "productId" : 1,
     *      "sku" : "",
     *      "price" : "",
     *      "quantity" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully set vendor product as common",
     *      "status": "1",
     *      "data": : {
     *                     "reuse": 1,
     *                     "pincodeBasedDelivery": 0,
     *                     "approvalFlag": 1,
     *                     "sku_id": 1,
     *                     "productId": 1,
     *                     "vendorId": 1,
     *                     "commonProductDate": "",
     *                     "createdDate": "",
     *                     "vendorProductId": 1
     *                 }
     * }
     * @apiSampleRequest /api/vendor-common-product/set-vendor-common-product
     * @apiErrorExample {json} SetVendorCommonProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    setVendorCommonProduct(vendorCommonProduct, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const commonCreatedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
            const product = yield this.productService.findOne({
                where: {
                    productId: vendorCommonProduct.productId,
                },
            });
            if (!product) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid ProductId',
                });
            }
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    vendorId: request.user.vendorId,
                    productId: vendorCommonProduct.productId,
                    reuse: 1,
                },
            });
            if (vendorProduct) {
                let saveData;
                const findSku = yield this.skuService.findOne({ where: { skuName: vendorCommonProduct.sku } });
                if (findSku) {
                    const finddSku = yield this.productService.validateSkuNameForVendor(product.productId, request.user.vendorId, vendorCommonProduct.sku);
                    if (finddSku) {
                        const errorResponse = {
                            status: 0,
                            message: 'Duplicate sku name.',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    else {
                        findSku.skuName = vendorCommonProduct.sku;
                        findSku.price = vendorCommonProduct.price;
                        findSku.quantity = vendorCommonProduct.quantity ? vendorCommonProduct.quantity : 1;
                        findSku.isActive = product.status;
                        findSku.vendorId = vendorProduct.vendorId;
                        saveData = yield this.skuService.create(findSku);
                    }
                }
                else {
                    yield this.skuService.delete({ id: vendorProduct.sku_id });
                    const newSku = new SkuModel_1.Sku();
                    newSku.skuName = vendorCommonProduct.sku;
                    newSku.price = vendorCommonProduct.price;
                    newSku.quantity = vendorCommonProduct.quantity ? vendorCommonProduct.quantity : 1;
                    newSku.isActive = product.status;
                    saveData = yield this.skuService.create(newSku);
                }
                vendorProduct.sku_id = saveData.id;
                vendorProduct.commonProductDate = commonCreatedDate;
                const updateVendorProduct = yield this.vendorProductService.create(vendorProduct);
                return response.status(200).send({
                    status: 1,
                    message: 'common product update successfully.....',
                    data: updateVendorProduct,
                });
            }
            else {
                const checkSku = yield this.skuService.findOne({
                    where: {
                        skuName: vendorCommonProduct.sku,
                    },
                });
                if (checkSku) {
                    return response.status(400).send({
                        status: 0,
                        message: 'Duplicate sku, give some other sku name',
                    });
                }
                const sku = new SkuModel_1.Sku();
                sku.skuName = vendorCommonProduct.sku;
                sku.price = vendorCommonProduct.price;
                sku.quantity = vendorCommonProduct.quantity ? vendorCommonProduct.quantity : 1;
                const skuData = yield this.skuService.create(sku);
                const vendorProducts = new VendorProducts_1.VendorProducts();
                vendorProducts.reuse = 1;
                vendorProducts.reuseStatus = 1;
                vendorProducts.pincodeBasedDelivery = 0;
                vendorProducts.approvalFlag = 1;
                vendorProducts.sku_id = skuData.id;
                vendorProducts.productId = vendorCommonProduct.productId;
                vendorProducts.vendorId = request.user.vendorId;
                vendorProducts.commonProductDate = commonCreatedDate;
                const vendorproduct = yield this.vendorProductService.create(vendorProducts);
                return response.status(200).send({
                    status: 1,
                    message: 'common product updated successfully',
                    data: vendorproduct,
                });
            }
        });
    }
    // Delete Vendor Common Product API
    /**
     * @api {delete} /api/vendor-common-product/delete/vendor-common-product/:productId Delete Vendor Common Product API
     * @apiGroup Common Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} productId productId
     * @apiParamExample {json} Input
     * {
     *      "productId" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted your common vendor product.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-common-product/delete/vendor-common-product/:productId
     * @apiErrorExample {json} VendorCommonProductDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteProduct(productId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    productId,
                    vendorId: request.user.vendorId,
                },
            });
            if (!vendorProduct) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid vendor Product',
                });
            }
            const sku = yield this.skuService.findOne({
                where: {
                    id: vendorProduct.sku_id,
                },
            });
            yield this.skuService.delete({ id: sku.id });
            const deleteProduct = yield this.vendorProductService.delete({ vendorProductId: vendorProduct.vendorProductId });
            if (deleteProduct) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully deleted the vendor common product.',
                });
            }
        });
    }
};
exports.CommonProductController = CommonProductController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/common-product-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('addedProducts')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('productName')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('sortBy')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('sortOrder')),
    tslib_1.__param(9, (0, routing_controllers_1.Req)()),
    tslib_1.__param(10, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Number, String, String, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonProductController.prototype, "commonProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/set-vendor-common-product'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAndUpdateCommonVendorProduct_1.CreateAndUpdateCommonVendorProduct, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonProductController.prototype, "setVendorCommonProduct", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/delete/vendor-common-product/:productId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonProductController.prototype, "deleteProduct", null);
exports.CommonProductController = CommonProductController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/vendor-common-product'),
    tslib_1.__metadata("design:paramtypes", [VendorProductService_1.VendorProductService,
        SkuService_1.SkuService,
        VendorService_1.VendorService,
        ProductService_1.ProductService,
        CategoryService_1.CategoryService,
        ProductToCategoryService_1.ProductToCategoryService,
        VendorGroupCategoryService_1.VendorGroupCategoryService])
], CommonProductController);
//# sourceMappingURL=CommonProductController.js.map