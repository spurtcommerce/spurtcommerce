"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonCatalogController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const VendorService_1 = require("../../../../src/api/core/services/VendorService");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const VendorProductService_1 = require("../../../../src/api/core/services/VendorProductService");
const UpdateProductAsCommon_1 = require("./requests/UpdateProductAsCommon");
const typeorm_1 = require("typeorm");
const moment_1 = tslib_1.__importDefault(require("moment"));
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const typedi_1 = require("typedi");
let CommonCatalogController = class CommonCatalogController {
    constructor(productService, vendorProductService, vendorService, skuService, productImageService, customerService) {
        this.productService = productService;
        this.vendorProductService = vendorProductService;
        this.vendorService = vendorService;
        this.skuService = skuService;
        this.productImageService = productImageService;
        this.customerService = customerService;
    }
    // Common Catalog Product List API
    /**
     * @api {get} /api/admin-common-product Common Catalog Product List API
     * @apiGroup Common Catalog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} owner 1-> admin 2-> vendor
     * @apiParam (Request body) {Number} count count
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} skuName skuName
     * @apiParam (Request body) {String} isCommon isCommon
     * @apiParam (Request body) {String} productName productName
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Common Catalog Product list",
     *      "data": [
     *                  {
     *                     "productId": 1,
     *                     "productName": "",
     *                     "skuName": "",
     *                     "price": "",
     *                     "image": "",
     *                     "containerName": "",
     *                     "isCommon": "",
     *                     "firstName": "",
     *                     "lastName": "",
     *                     "vendorCount": ""
     *                 }
     *              ]
     * @apiSampleRequest /api/admin-common-product
     * @apiErrorExample {json} commonCatalogList error
     * HTTP/1.1 500 Internal Server Error
     */
    commonCatalogProductList(limit, offset, owner, productName, skuName, count, status, isCommon, keyword, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Product.productId as productId',
                'Product.name as productName',
                'skuDetail.skuName as skuName',
                'skuDetail.price as price',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                'Product.isCommon as isCommon',
                'Product.createdDate as createdDate',
                'Product.modifiedDate as modifiedDate',
            ];
            const relations = [];
            relations.push({
                tableName: 'Product.skuDetail',
                op: 'left',
                aliasName: 'skuDetail',
            });
            const whereConditions = [];
            whereConditions.push({
                name: 'Product.isSimplified',
                op: 'and',
                value: 1,
            });
            if (+owner === 1 || +owner === 2) {
                whereConditions.push({
                    name: 'Product.owner',
                    op: 'and',
                    value: +owner,
                });
            }
            if (isCommon === 1 || isCommon === 0) {
                whereConditions.push({
                    name: 'Product.isCommon',
                    op: 'and',
                    value: isCommon,
                });
            }
            const searchConditions = [];
            if (keyword) {
                searchConditions.push({
                    name: ['Product.name', 'skuDetail.skuName'],
                    value: keyword.toLowerCase(),
                });
            }
            else {
                if (productName === null || productName === void 0 ? void 0 : productName.trim()) {
                    searchConditions.push({
                        name: ['Product.name'],
                        value: productName.toLowerCase(),
                    });
                }
                if (skuName === null || skuName === void 0 ? void 0 : skuName.trim()) {
                    searchConditions.push({
                        name: ['skuDetail.skuName'],
                        value: skuName.toLowerCase(),
                    });
                }
                if (status === 0 || status === 1) {
                    whereConditions.push({
                        name: 'Product.isActive',
                        op: 'and',
                        value: status,
                    });
                }
            }
            const sort = [{
                    name: 'Product.createdDate',
                    order: 'DESC',
                }];
            if (count) {
                const commonCatalogproductCount = yield this.productService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the common catalog product list count',
                    data: commonCatalogproductCount,
                });
            }
            const commonCatalogproductList = yield this.productService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], sort, false, true);
            const adminCommonProductList = commonCatalogproductList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const vendorProduct = yield this.vendorProductService.findOne({
                    where: {
                        productId: temp.productId,
                        reuse: (0, typeorm_1.IsNull)(),
                    },
                });
                if (vendorProduct) {
                    const vendor = yield this.vendorService.findOne({
                        where: {
                            vendorId: vendorProduct.vendorId,
                        },
                    });
                    const customer = yield this.customerService.findOne({
                        where: {
                            id: vendor.customerId,
                        },
                    });
                    temp.firstName = customer.firstName;
                    temp.lastName = customer.lastName;
                }
                const vendorCount = yield this.vendorProductService.vendorCount(temp.productId);
                temp.vendorCount = vendorCount.vendorCount;
                return temp;
            }));
            const result = yield Promise.all(adminCommonProductList);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the common catalog product list',
                data: result,
            });
        });
    }
    // Set As Common Product API
    /**
     * @api {put} /api/admin-common-product/:id Set As Common Product API
     * @apiGroup Common Catalog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} common 0/1
     * @apiParamExample {json} Input
     * {
     *      "common" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully set as common product.",
     *      "status": "1"
     *      "data": {
     *                 "createdBy": 1,
     *                 "createdDate": "",
     *                 "modifiedBy": 1,
     *                 "modifiedDate": "",
     *                 "productId": 1,
     *                 "sku": "",
     *                 "upc": "",
     *                 "hsn": "",
     *                 "location": "",
     *                 "quantity": "",
     *                 "minimumQuantity": "",
     *                 "subtractStock": "",
     *                 "stockStatusId": "",
     *                 "quotationAvailable": "",
     *                 "image": "",
     *                 "imagePath": "",
     *                 "manufacturerId": "",
     *                 "shipping": "",
     *                 "serviceCharges": "",
     *                 "taxType": "",
     *                 "taxValue": "",
     *                 "price": "",
     *                 "priceUpdateFileLogId": "",
     *                 "dateAvailable": "",
     *                 "sortOrder": "",
     *                 "name": "",
     *                 "description": "",
     *                 "amount": "",
     *                 "keywords": "",
     *                 "discount": "",
     *                 "deleteFlag": "",
     *                 "isFeatured": "",
     *                 "todayDeals": "",
     *                 "condition": "",
     *                 "rating": "",
     *                 "wishListStatus": "",
     *                 "productSlug": "",
     *                 "isActive": "",
     *                 "width": "",
     *                 "height": "",
     *                 "length": "",
     *                 "weight": "",
     *                 "hasStock": "",
     *                 "isSimplified": "",
     *                 "owner": "",
     *                 "isCommon": "",
     *                 "skuId": 1,
     *                 "hasTirePrice": "",
     *                 "outOfStockThreshold": "",
     *                 "notifyMinQuantity": "",
     *                 "minQuantityAllowedCart": "",
     *                 "maxQuantityAllowedCart": "",
     *                 "enableBackOrders": "",
     *                 "pincodeBasedDelivery": "",
     *                 "attributeKeyword": "",
     *                 "settedAsCommonOn": ""
     *              }
     * }
     * @apiSampleRequest /api/admin-common-product/:id
     * @apiErrorExample {json} setCommonProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    setCommonProduct(id, common, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId: id,
                },
            });
            if (!product) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid productId',
                });
            }
            if (common === 1) {
                product.isCommon = common;
                const currentDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
                product.settedAsCommonOn = currentDate;
                const commonProduct = yield this.productService.update(product.productId, product);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully set as common product',
                    data: commonProduct,
                });
            }
            else {
                product.isCommon = common;
                product.settedAsCommonOn = undefined;
                const regularProduct = yield this.productService.update(product.productId, product);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully set as regular product',
                    data: regularProduct,
                });
            }
        });
    }
    // Set As Common Products API
    /**
     * @api {post} /api/admin-common-product Set As Common Products API
     * @apiGroup Common Catalog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productId
     * @apiParam (Request body) {number} common 0/1
     * @apiParamExample {json} Input
     * {
     *      "productId" : "1",
     *      "common" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully set as common product.",
     *      "status": "1"
     *      "data": [{
     *                 "createdBy": 1,
     *                 "createdDate": "",
     *                 "modifiedBy":    ,
     *                 "modifiedDate": "",
     *                 "productId": 1,
     *                 "sku": "",
     *                 "upc": "",
     *                 "hsn": "",
     *                 "location": "",
     *                 "quantity": "",
     *                 "minimumQuantity": "",
     *                 "subtractStock": "",
     *                 "stockStatusId": 1,
     *                 "quotationAvailable": "",
     *                 "image": "",
     *                 "imagePath": "",
     *                 "manufacturerId": 1,
     *                 "shipping": "",
     *                 "serviceCharges": "",
     *                 "taxType": "",
     *                 "taxValue": "",
     *                 "price": "",
     *                 "priceUpdateFileLogId": "",
     *                 "dateAvailable": "",
     *                 "sortOrder": "",
     *                 "name": "",
     *                 "description": "",
     *                 "amount": "",
     *                 "keywords": "",
     *                 "discount": "",
     *                 "deleteFlag": "",
     *                 "isFeatured": "",
     *                 "todayDeals": "",
     *                 "condition": "",
     *                 "rating": "",
     *                 "wishListStatus": "",
     *                 "productSlug": "",
     *                 "isActive": "",
     *                 "width": "",
     *                 "height": "",
     *                 "length": "",
     *                 "weight": "",
     *                 "hasStock": "",
     *                 "isSimplified": "",
     *                 "owner": "",
     *                 "isCommon": "",
     *                 "skuId": 1,
     *                 "hasTirePrice": "",
     *                 "outOfStockThreshold": "",
     *                 "notifyMinQuantity": "",
     *                 "minQuantityAllowedCart": "",
     *                 "maxQuantityAllowedCart": "",
     *                 "enableBackOrders": "",
     *                 "pincodeBasedDelivery": "",
     *                 "attributeKeyword": "",
     *                 "settedAsCommonOn": ""
     *              }]
     * }
     * @apiSampleRequest /api/admin-common-product
     * @apiErrorExample {json} setCommonProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    setAsCommonProduct(product, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productData = product.productId.toString();
            const productId = productData.split(',');
            const data = productId.map((id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const products = yield this.productService.findOne({ where: { productId: id } });
                if (product.common === 1) {
                    products.isCommon = product.common;
                    const currentDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
                    products.settedAsCommonOn = currentDate;
                }
                else {
                    products.isCommon = product.common;
                    products.settedAsCommonOn = undefined;
                }
                yield this.productService.update(products.productId, products);
                return products;
            }));
            const updateProduct = yield Promise.all(data);
            if (+product.common === 1) {
                return response.status(200).send({
                    status: 1,
                    message: 'Succcessfully set products as common',
                    data: updateProduct,
                });
            }
            else {
                return response.status(200).send({
                    status: 1,
                    message: 'Succcessfully set products as regular',
                    data: updateProduct,
                });
            }
        });
    }
    // Admin Common Product Detail API
    /**
     * @api {get} /api/admin-common-product/get-related-vendors Admin Common Product Detail API
     * @apiGroup Common Catalog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Vendor Product list",
     *      "data": {
     *                 "productId": 1,
     *                 "productSlug": "",
     *                 "productName": "",
     *                 "isCommon": "",
     *                 "skuName": "",
     *                 "price": "",
     *                 "vendorCount": "",
     *                 "containerName": "",
     *                 "image": "",
     *                 "vendorProducts": []
     *              }
     * @apiSampleRequest /api/admin-common-product/get-related-vendors
     * @apiErrorExample {json} vendorProductList error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorProductList(limit, offset, productId, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetails = {};
            const product = yield this.productService.findOne({
                select: ['name', 'isCommon', 'createdBy', 'skuId', 'productId', 'productSlug'],
                where: {
                    productId,
                },
            });
            const sku = yield this.skuService.findOne({
                select: ['skuName', 'price'],
                where: {
                    id: product.skuId,
                },
            });
            const productImage = yield this.productImageService.findOne({
                select: ['containerName', 'image'],
                where: {
                    productId,
                },
            });
            const vendorcount = yield this.vendorProductService.vendorCount(productId);
            productDetails.productId = product.productId;
            productDetails.productSlug = product.productSlug;
            productDetails.productName = product.name;
            productDetails.isCommon = product.isCommon;
            productDetails.skuName = sku.skuName;
            productDetails.price = sku.price;
            productDetails.vendorCount = vendorcount.vendorCount;
            productDetails.containerName = productImage ? productImage.containerName : undefined;
            productDetails.image = productImage ? productImage.image : undefined;
            const select = [
                'product.productId as productId',
                'VendorProducts.vendorProductId as vendorProductId',
                'vendor.vendorId as vendorId',
                'VendorProducts.createdDate as Date',
                'sku.skuName as SKU',
                'sku.price as price',
                'customer.firstName as firstName',
                'customer.lastName as lastName',
                'VendorProducts.reuseStatus as reuseStatus',
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
                tableName: 'vendor.customer',
                aliasName: 'customer',
            });
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorProducts.productId',
                op: 'and',
                value: productId,
            });
            whereConditions.push({
                name: 'VendorProducts.reuse',
                op: 'and',
                value: 1,
            });
            if (count) {
                const vendorProductsListCount = yield this.vendorProductService.listByQueryBuilder(limit, offset, select, whereConditions, [], relations, [], [], true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got the Vendor Product List Count',
                    data: vendorProductsListCount,
                });
            }
            productDetails.vendorProducts = yield this.vendorProductService.listByQueryBuilder(limit, offset, select, whereConditions, [], relations, [], [], false, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the Vendor Product List',
                data: productDetails,
            });
        });
    }
    // Update Common Product Status API
    /**
     * @api {put} /api/admin-common-product/update-reuse-status/:id Update Common Product Status API
     * @apiGroup Common Catalog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} reuseStatus 0/1
     * @apiParamExample {json} Input
     * {
     *      "reuseStatus" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated reuse status.",
     *      "status": "1",
     *      "data": {
     *                  "reuseStatus": "1"
     *              }
     * }
     * @apiSampleRequest /api/admin-common-product/update-reuse-status/:id
     * @apiErrorExample {json} updateReuseStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    updateReuseStatus(id, reuseStatus, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    vendorProductId: id,
                },
            });
            if (!vendorProduct) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid vendor product.',
                });
            }
            vendorProduct.reuseStatus = reuseStatus ? reuseStatus : 0;
            const updateStatus = yield this.vendorProductService.update(vendorProduct.vendorProductId, vendorProduct);
            return response.status(200).send({
                status: 1,
                message: 'Successfully updated reuse status.',
                data: updateStatus,
            });
        });
    }
    // Common Product Count API
    /**
     * @api {get} /api/admin-common-product/common-product-count Common Product Count API
     * @apiGroup Common Catalog
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get common product count",
     *      "data":{
     *                "totalCommonProducts": 1,
     *                "adminCommonProducts": 1,
     *                "vendorCommonProducts": 1
     *               }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-common-product/common-product-count
     * @apiErrorExample {json} commonProductCount error
     * HTTP/1.1 500 Internal Server Error
     */
    commonProductCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const commonProducts = {};
            const select = [];
            const search = [];
            const whereConditions = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
                {
                    name: 'isCommon',
                    op: 'where',
                    value: 1,
                },
            ];
            const allCommonProductsCount = yield this.productService.list(0, 0, select, [], whereConditions, search, 0, 1);
            const whereConditionAdminCommonProduct = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
                {
                    name: 'isCommon',
                    op: 'where',
                    value: 1,
                },
                {
                    name: 'owner',
                    op: 'where',
                    value: 1,
                },
            ];
            const adminCommonProductsCount = yield this.productService.list(0, 0, select, [], whereConditionAdminCommonProduct, search, 0, 1);
            const whereConditionVendorCommonProduct = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
                {
                    name: 'isCommon',
                    op: 'where',
                    value: 1,
                },
                {
                    name: 'owner',
                    op: 'where',
                    value: 2,
                },
            ];
            const vendorCommonProductsCount = yield this.productService.list(0, 0, select, [], whereConditionVendorCommonProduct, search, 0, 1);
            commonProducts.totalCommonProducts = allCommonProductsCount ? allCommonProductsCount : 0;
            commonProducts.adminCommonProducts = adminCommonProductsCount ? adminCommonProductsCount : 0;
            commonProducts.vendorCommonProducts = vendorCommonProductsCount ? vendorCommonProductsCount : 0;
            const successResponse = {
                status: 1,
                message: 'Successfully got the common products count',
                data: commonProducts,
            };
            return response.status(200).send(successResponse);
        });
    }
};
exports.CommonCatalogController = CommonCatalogController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)(['admin', 'common-catalog-product-list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('owner')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('productName')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('skuName')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('isCommon')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, String, String, Object, Number, Number, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonCatalogController.prototype, "commonCatalogProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'set-common-product']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('common')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonCatalogController.prototype, "setCommonProduct", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.Authorized)(['admin', 'set-common-products']),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateProductAsCommon_1.UpdateProductAsCommon, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonCatalogController.prototype, "setAsCommonProduct", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/get-related-vendors'),
    (0, routing_controllers_1.Authorized)(['admin', 'common-product-detail']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonCatalogController.prototype, "vendorProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-reuse-status/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'update-common-product-status']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('reuseStatus')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonCatalogController.prototype, "updateReuseStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/common-product-count'),
    (0, routing_controllers_1.Authorized)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonCatalogController.prototype, "commonProductCount", null);
exports.CommonCatalogController = CommonCatalogController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/admin-common-product'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        VendorProductService_1.VendorProductService,
        VendorService_1.VendorService,
        SkuService_1.SkuService,
        ProductImageService_1.ProductImageService,
        CustomerService_1.CustomerService])
], CommonCatalogController);
//# sourceMappingURL=CommonCatalogController.js.map