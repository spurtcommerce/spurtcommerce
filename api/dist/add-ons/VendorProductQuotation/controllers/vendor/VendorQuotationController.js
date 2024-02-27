"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorQuotationController = void 0;
const tslib_1 = require("tslib");
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const VendorProductService_1 = require("../../../../src/api/core/services/VendorProductService");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const QuotationService_1 = require("../../../ProductQuotation/services/QuotationService");
const ProductToCategoryService_1 = require("../../../../src/api/core/services/ProductToCategoryService");
const CategoryService_1 = require("../../../../src/api/core/services/CategoryService");
const OrderProductService_1 = require("../../../../src/api/core/services/OrderProductService");
const typeorm_1 = require("typeorm");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
let VendorQuotationController = class VendorQuotationController {
    constructor(quotationService, productService, customerService, vendorProductService, productToCategoryService, categoryService, orderProductService, productImageService) {
        this.quotationService = quotationService;
        this.productService = productService;
        this.customerService = customerService;
        this.vendorProductService = vendorProductService;
        this.productToCategoryService = productToCategoryService;
        this.categoryService = categoryService;
        this.orderProductService = orderProductService;
        this.productImageService = productImageService;
    }
    // Vendor Quotation Product List API
    /**
     * @api {get} /api/vendor-quotation/vendor-products-list Vendor Quotation Product List API
     * @apiGroup  Vendor Quotation
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
     * @apiSampleRequest /api/vendor-quotation/vendor-products-list
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorProductList(limit, offset, status, keyword, price, productName, sku, count, request, response) {
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
                    name: 'VendorProducts.quotationAvailable',
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
                    name: ['product.keywords', 'product.name', 'customer.first_name', 'product.sku', 'product.isActive'],
                    value: keyword.toLowerCase(),
                });
            }
            if (productName && productName !== '') {
                searchConditions.push({
                    name: ['product.name'],
                    value: productName.toLowerCase(),
                });
            }
            if (sku && sku !== '') {
                searchConditions.push({
                    name: ['product.sku'],
                    value: sku.toLowerCase(),
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
                const quotationCount = yield this.quotationService.quotationCount(temp.productId);
                temp.quotationCount = quotationCount;
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
    // update Vendor Quotation Available status API
    /**
     * @api {put} /api/vendor-quotation/vendor-product/update-quotation-available/:id Update Vendor Quotation Available Status API
     * @apiGroup Vendor Quotation
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} quotationAvailable quotationAvailable should be 0 or 1
     * @apiParamExample {json} Input
     * {
     *      "quotationAvailable" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated the vendor quotation status.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-quotation/vendor-product/update-quotation-available/:id
     * @apiErrorExample {json} quotation available error
     * HTTP/1.1 500 Internal Server Error
     */
    updateQuotationStatus(id, quotationAvailable, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId: id,
                },
            });
            if (!product) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    vendorId: request.user.vendorId,
                    productId: id,
                    reuse: (0, typeorm_1.IsNull)(),
                },
            });
            if (!vendorProduct) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Vendor productId.',
                });
            }
            product.quotationAvailable = quotationAvailable ? quotationAvailable : 0;
            yield this.productService.create(product);
            vendorProduct.quotationAvailable = quotationAvailable ? quotationAvailable : 0;
            const updateQuotationStatus = yield this.vendorProductService.create(vendorProduct);
            if (updateQuotationStatus) {
                const successResponse = {
                    status: 1,
                    message: 'quotation status updated successfully.',
                    data: updateQuotationStatus,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update quotation status.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Vendor Quotation Status Detail API
    /**
     * @api {get} /api/vendor-quotation/vendor-quotation-request-detail/:productId Vendor Quotation Status Detail API
     * @apiGroup Vendor Quotation
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got vendor Quotation product detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-quotation/vendor-quotation-request-detail/:productId
     * @apiErrorExample {json} vendorQuotation error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorQuotationProductDetail(productId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                select: ['productId', 'name', 'sku', 'productSlug'],
                where: {
                    productId,
                },
            });
            if (!product) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid productId',
                });
            }
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    productId,
                },
            });
            if (!vendorProduct) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid Vendor productId.',
                });
            }
            product.productImage = yield this.productImageService.findOne({
                select: ['image', 'containerName'],
                where: {
                    productId: product.productId,
                    defaultImage: 1,
                },
            });
            product.quotationRequest = yield this.quotationService.findAll({
                where: {
                    productId: product.productId,
                },
            }).then((val) => {
                const data = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = value;
                    const customer = yield this.customerService.findOne({
                        select: ['firstName', 'lastName', 'email', 'mobileNumber', 'city', 'avatar', 'avatarPath'],
                        where: {
                            id: temp.customerId,
                        },
                    });
                    temp.firstName = customer.firstName;
                    temp.lastName = customer.lastName;
                    temp.email = customer.email;
                    temp.mobileNumber = customer.mobileNumber;
                    temp.city = customer.city;
                    temp.avatar = customer.avatar;
                    temp.avatarPath = customer.avatarPath;
                    return temp;
                }));
                const resultData = Promise.all(data);
                return resultData;
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got quotation product detail',
                data: product,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-products-list'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('price')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('productName')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(8, (0, routing_controllers_1.Req)()),
    tslib_1.__param(9, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorQuotationController.prototype, "vendorProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/vendor-product/update-quotation-available/:id'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('quotationAvailable')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorQuotationController.prototype, "updateQuotationStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/vendor-quotation-request-detail/:productId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorQuotationController.prototype, "vendorQuotationProductDetail", null);
VendorQuotationController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/vendor-quotation'),
    tslib_1.__metadata("design:paramtypes", [QuotationService_1.QuotationService,
        ProductService_1.ProductService,
        CustomerService_1.CustomerService,
        VendorProductService_1.VendorProductService,
        ProductToCategoryService_1.ProductToCategoryService,
        CategoryService_1.CategoryService,
        OrderProductService_1.OrderProductService,
        ProductImageService_1.ProductImageService])
], VendorQuotationController);
exports.VendorQuotationController = VendorQuotationController;
//# sourceMappingURL=VendorQuotationController.js.map