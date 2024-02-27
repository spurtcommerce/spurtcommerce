"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminVendorRelatedProductController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const VendorProductService_1 = require("../../../src/api/core/services/VendorProductService");
const ProductToCategoryService_1 = require("../../../src/api/core/services/ProductToCategoryService");
const CategoryService_1 = require("../../../src/api/core/services/CategoryService");
const OrderProductService_1 = require("../../../src/api/core/services/OrderProductService");
const ProductService_1 = require("../../../src/api/core/services/ProductService");
const class_transformer_1 = require("class-transformer");
const ProductRelated_1 = require("../../ProductRelated/models/ProductRelated");
const ProductRelatedService_1 = require("../../ProductRelated/services/ProductRelatedService");
const VendorRelatedProductRequest_1 = require("./request/VendorRelatedProductRequest");
const AddonValidationMiddleware_1 = require("../../../src/api/core/middlewares/AddonValidationMiddleware");
let AdminVendorRelatedProductController = class AdminVendorRelatedProductController {
    constructor(vendorProductService, orderProductService, relatedProductService, productToCategoryService, categoryService, productService) {
        this.vendorProductService = vendorProductService;
        this.orderProductService = orderProductService;
        this.relatedProductService = relatedProductService;
        this.productToCategoryService = productToCategoryService;
        this.categoryService = categoryService;
        this.productService = productService;
    }
    // update Product related api
    /**
     * @api {Post} /api/vendor-related-product/update-vendor-related-product update vendor related product
     * @apiGroup Vendor Related Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} productId productId
     * @apiParam (Request body) {number} relatedProductId relatedProductId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'status': 1,
     *      'message': 'Successfully update the vendor related product'
     * }
     * @apiSampleRequest /api/vendor-related-product/update-vendor-related-product
     * @apiErrorExample  {json} error
     * HTTP/1.1 500 Internal Server Error
     */
    productRelated(productRelatedRequest, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExistProduct = yield this.productService.findOne({ where: { productId: productRelatedRequest.productId } });
            if (!ifExistProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            const ifExistVendorRelated = yield this.vendorProductService.findOne({
                where: {
                    productId: productRelatedRequest.productId,
                },
            });
            if (!ifExistVendorRelated) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid product id on VendorProduct',
                };
                return response.status(400).send(errorResponse);
            }
            for (const id of productRelatedRequest.relatedProductId) {
                const findVendorRelatedProducts = yield this.productService.findOne({
                    where: {
                        productId: id,
                    },
                });
                if (!findVendorRelatedProducts) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid VendorRelatedProductId on product',
                    };
                    return response.status(400).send(errorResponse);
                }
                const ifExistProductRelatedOnVendorProduct = yield this.vendorProductService.findOne({
                    where: {
                        productId: id,
                    },
                });
                if (!ifExistProductRelatedOnVendorProduct) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid product Id on vendorRelated',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            const ifExistVendorRelatedProduct = yield this.relatedProductService.find({
                where: {
                    productId: productRelatedRequest.productId,
                },
            });
            const vendorRelatedProductData = [];
            if (ifExistVendorRelatedProduct.length > 0) {
                yield this.relatedProductService.delete({ productId: productRelatedRequest.productId });
            }
            for (const id of productRelatedRequest.relatedProductId) {
                const newVendorRelated = new ProductRelated_1.ProductRelated();
                newVendorRelated.productId = productRelatedRequest.productId;
                newVendorRelated.relatedProductId = id;
                vendorRelatedProductData.push(newVendorRelated);
            }
            const updateRelatedProduct = yield this.relatedProductService.create(vendorRelatedProductData);
            if (!updateRelatedProduct) {
                const errorStatus = {
                    status: 0,
                    message: 'unable to update the vendor related products',
                };
                return response.status(400).send(errorStatus);
            }
            const successResponse = {
                status: 1,
                message: 'successfully updated the vendor related products',
                data: vendorRelatedProductData,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Product List API
    /**
     * @api {get} /api/vendor-related-product/vendor-related-product-list Vendor related Product List API
     * @apiGroup  Vendor Related Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} status 0->inactive 1-> active
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} price price
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get your product list",
     *      "data":{
     *      "vendorId" : "",
     *      "vendorName" : "",
     *      "productName" : "",
     *      "sku" : "",
     *      "model" : "",
     *      "price" : "",
     *      "quantity" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-related-product/vendor-related-product-list
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorProductList(limit, offset, status, keyword, price, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorId = request.user.vendorId;
            const selects = ['VendorProducts.vendorProductId as vendorProductId',
                'VendorProducts.vendorProductCommission as vendorProductCommission',
                'VendorProducts.quotationAvailable as quotationAvailable',
                'VendorProducts.approvalFlag as approvalFlag',
                'vendor.vendorId as vendorId',
                'product.productId as productId',
                'product.pincodeBasedDelivery as pincodeBasedDelivery',
                'product.name as name',
                'product.sku as sku',
                'product.skuId as skuId',
                'product.price as productprice',
                'product.quantity as quantity',
                'customer.firstName as vendorName',
                'product.sortOrder as sortOrder',
                'product.isActive as isActive',
                'product.productSlug as productSlug',
                'VendorProducts.createdDate as createdDate',
                'product.keywords as keywords',
                'product.attributeKeyword as attributeKeyword',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT sku.sku_name as sku FROM sku WHERE sku.id = skuId) as sku',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                    'ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial'];
            const whereCondition = [];
            const relations = [];
            const groupBy = [];
            relations.push({
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            }, {
                tableName: 'VendorProducts.vendor',
                aliasName: 'vendor',
            }, {
                tableName: 'vendor.customer',
                aliasName: 'customer',
            });
            if (status && status !== '') {
                whereCondition.push({
                    name: 'product.isActive',
                    op: 'and',
                    value: +status,
                });
            }
            whereCondition.push({
                name: 'vendor.vendorId',
                op: 'and',
                value: vendorId,
            }, {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            });
            const searchConditions = [];
            if (keyword) {
                searchConditions.push({
                    name: ['product.keywords', 'product.name', 'customer.first_name'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'VendorProducts.createdDate',
                order: 'DESC',
            });
            if (count) {
                const vendorProductListCount = yield this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
                const sucResponse = {
                    status: 1,
                    message: 'Successfully got Vendor Product list.',
                    data: vendorProductListCount,
                };
                return response.status(200).send(sucResponse);
            }
            const vendorProductList = yield this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
            const productList = vendorProductList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const categories = yield this.productToCategoryService.findAll({
                    select: ['categoryId', 'productId'],
                    where: { productId: value.productId },
                }).then((val) => {
                    const category = val.map((values) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryNames = yield this.categoryService.findOne({ categoryId: values.categoryId });
                        const tempp = values;
                        if (categoryNames !== undefined) {
                            tempp.categoryName = categoryNames.name;
                        }
                        else {
                            tempp.categoryName = '';
                        }
                        return tempp;
                    }));
                    const result = Promise.all(category);
                    return result;
                });
                temp.vendorCategory = categories;
                if (value.productSpecial !== null) {
                    temp.pricerefer = value.productSpecial;
                    temp.flag = 1;
                }
                else if (value.productDiscount !== null) {
                    temp.pricerefer = value.productDiscount;
                    temp.flag = 0;
                }
                else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
                const orderProduct = yield this.orderProductService.getEarnings(value.productId);
                if (orderProduct) {
                    temp.earnings = orderProduct.productPriceTotal;
                }
                else {
                    temp.earnings = '';
                }
                temp.vendorRelatedCount = yield this.relatedProductService.productRelatedCount(value.vendorProductId);
                return temp;
            }));
            const results = yield Promise.all(productList);
            const successResponse = {
                status: 1,
                message: 'Successfully got your product list.',
                data: results,
            };
            return response.status(200).send(successResponse);
        });
    }
    // product related detail api
    /**
     * @api {Get} /api/vendor-related-product/vendor-related-product-details/:id vendor related product details
     * @apiGroup Vendor Related Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 success
     * {
     *      'status': '1',
     *      'message': 'Successfully get details for product'
     * }
     * @apiSampleRequest /api/vendor-related-product/vendor-related-product-details/:id
     * @apiErrorExample {json} error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorRelatedProductDetail(productId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExistVendorProductDetails = yield this.vendorProductService.findOne({ where: { productId } });
            if (!ifExistVendorProductDetails) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid vendor related product id',
                };
                return response.status(400).send(errorResponse);
            }
            const ifExistProduct = yield this.productService.findOne({
                select: ['productId', 'description', 'sku', 'name'],
                where: { productId: ifExistVendorProductDetails.productId },
            });
            if (!ifExistProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid product id',
                };
                return response.status(400).send(errorResponse);
            }
            ifExistProduct.vendorRelatedProduct = yield this.relatedProductService.find({
                select: ['relatedProductId', 'productId'],
                where: { productId },
            }).then((val) => {
                const vendorRelatedData = val.map((values) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const vendorProduct = yield this.vendorProductService.findOne({ where: { productId: values.relatedProductId }, relations: ['product'] });
                    const temp = {};
                    temp.vendorProductId = vendorProduct.vendorProductId;
                    temp.productId = vendorProduct.product.productId;
                    temp.name = vendorProduct.product.name;
                    temp.sku = vendorProduct.product.sku;
                    return (0, class_transformer_1.instanceToPlain)(temp);
                }));
                const resultDatas = Promise.all(vendorRelatedData);
                return resultDatas;
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got the data',
                data: ifExistProduct,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/update-vendor-related-product'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [VendorRelatedProductRequest_1.VendorRelatedProductRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminVendorRelatedProductController.prototype, "productRelated", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-related-product-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('price')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(6, (0, routing_controllers_1.Req)()),
    tslib_1.__param(7, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminVendorRelatedProductController.prototype, "vendorProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-related-product-details/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminVendorRelatedProductController.prototype, "vendorRelatedProductDetail", null);
AdminVendorRelatedProductController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/vendor-related-product'),
    tslib_1.__metadata("design:paramtypes", [VendorProductService_1.VendorProductService, OrderProductService_1.OrderProductService, ProductRelatedService_1.ProductRelatedService, ProductToCategoryService_1.ProductToCategoryService, CategoryService_1.CategoryService, ProductService_1.ProductService])
], AdminVendorRelatedProductController);
exports.AdminVendorRelatedProductController = AdminVendorRelatedProductController;
//# sourceMappingURL=VendorRelatedProductController.js.map