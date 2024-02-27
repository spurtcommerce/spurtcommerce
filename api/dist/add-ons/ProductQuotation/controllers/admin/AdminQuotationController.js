"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationController = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const VendorProductService_1 = require("../../../../src/api/core/services/VendorProductService");
const CustomerService_1 = require("../../../../src/api/core/services/CustomerService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const QuotationService_1 = require("../../services/QuotationService");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const typeorm_1 = require("typeorm");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let QuotationController = class QuotationController {
    constructor(quotationService, productService, customerService, vendorProductService, productImageService, skuService) {
        this.quotationService = quotationService;
        this.productService = productService;
        this.customerService = customerService;
        this.vendorProductService = vendorProductService;
        this.productImageService = productImageService;
        this.skuService = skuService;
    }
    // Admin Quotation Product List API
    /**
     * @api {get} /api/admin-quotation/product-list Admin Quotation Product List API
     * @apiGroup Quotation Status
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get Quotation product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/admin-quotation/product-list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    adminQuotationProductList(limit, offset, keyword, sku, status, price, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Product.productId as productId',
                'Product.sku as sku',
                'Product.name as name',
                'Product.quantity as quantity',
                'Product.price as price',
                'Product.skuId as skuId',
                'Product.productSlug as productSlug',
                'Product.quotationAvailable as quotationStatus',
                'Product.isActive as isActive',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                '(SELECT sku.sku_name as sku FROM sku WHERE sku.id = skuId) as sku',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
            ];
            const relations = [];
            const WhereConditions = [];
            const searchConditions = [];
            if (keyword !== '') {
                searchConditions.push({
                    name: ['Product.name'],
                    value: keyword,
                });
            }
            const sort = [];
            sort.push({
                name: 'Product.createdDate',
                order: 'DESC',
            });
            const productLists = yield this.productService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, false, true);
            if (count) {
                const productListCount = yield this.productService.listByQueryBuilder(limit, offset, select, WhereConditions, searchConditions, relations, [], sort, true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got quotation product lists count.',
                    data: productListCount,
                });
            }
            const productList = productLists.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const quotationCount = yield this.quotationService.quotationCount(temp.productId);
                temp.quotationCount = quotationCount;
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
                return temp;
            }));
            const results = yield Promise.all(productList);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete quotation product list. ',
                data: (0, class_transformer_1.instanceToPlain)(results),
            };
            return response.status(200).send(successResponse);
        });
    }
    // Update Quotation Available status API
    /**
     * @api {put} /api/admin-quotation/update-quotation-available/:id Update Quotation Available Status API
     * @apiGroup Quotation Status
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} quotationAvailable quotationAvailable should be 0 or 1
     * @apiParamExample {json} Input
     * {
     *      "quotationAvailable" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated the quotation status.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-quotation/update-quotation-available/:id
     * @apiErrorExample {json} quotation error
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
            product.quotationAvailable = quotationAvailable ? quotationAvailable : 0;
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    productId: id,
                    reuse: (0, typeorm_1.IsNull)(),
                },
            });
            if (vendorProduct) {
                vendorProduct.quotationAvailable = quotationAvailable ? quotationAvailable : 0;
                yield this.vendorProductService.create(vendorProduct);
            }
            const productSave = yield this.productService.create(product);
            if (productSave) {
                const successResponse = {
                    status: 1,
                    message: 'quotation status updated successfully .',
                    data: productSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update successfully',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Quotation Status Detail API
    /**
     * @api {get} /api/admin-quotation/quotation-request-detail/:productId Quotation Status Detail API
     * @apiGroup Quotation Status
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Quotation Product detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-quotation/quotation-request-detail/:productId
     * @apiErrorExample {json} quotation error
     * HTTP/1.1 500 Internal Server Error
     */
    quotationProductDetail(productId, response) {
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
            product.productImage = yield this.productImageService.findOne({
                select: ['image', 'containerName'],
                where: {
                    productId: product.productId,
                    defaultImage: 1,
                },
            });
            product.price = yield this.skuService.findOne({
                select: ['price'],
                where: {
                    skuName: product.sku,
                },
            });
            product.quotationCount = yield this.quotationService.quotationCount(product.productId);
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
    (0, routing_controllers_1.Get)('/product-list'),
    (0, routing_controllers_1.Authorized)(['admin', 'product-quotation-list']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('price')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(7, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationController.prototype, "adminQuotationProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)('/update-quotation-available/:id'),
    (0, routing_controllers_1.Authorized)(['admin', 'update-quotation-status']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.BodyParam)('quotationAvailable')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationController.prototype, "updateQuotationStatus", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/quotation-request-detail/:productId'),
    (0, routing_controllers_1.Authorized)(['admin', 'product-quotation-detail']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationController.prototype, "quotationProductDetail", null);
QuotationController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/admin-quotation'),
    tslib_1.__metadata("design:paramtypes", [QuotationService_1.QuotationService, ProductService_1.ProductService,
        CustomerService_1.CustomerService, VendorProductService_1.VendorProductService,
        ProductImageService_1.ProductImageService, SkuService_1.SkuService])
], QuotationController);
exports.QuotationController = QuotationController;
//# sourceMappingURL=AdminQuotationController.js.map