"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoVendorProductController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const MSeoMetaService_1 = require("../../services/MSeoMetaService");
// import { instanceToPlain } from 'class-transformer';
const typeorm_1 = require("typeorm");
const marketplace_1 = require("@spurtcommerce/marketplace");
const MSeoMetaModel_1 = require("../../models/MSeoMetaModel");
const CreateSeoRequest_1 = require("./requests/CreateSeoRequest");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const ProductDiscountService_1 = require("../../../../src/api/core/services/ProductDiscountService");
const ProductSpecialService_1 = require("../../../../src/api/core/services/ProductSpecialService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let SeoVendorProductController = class SeoVendorProductController {
    constructor(productService, mSeoMetaService, productImageService, skuService, productDiscountService, productSpecialService) {
        this.productService = productService;
        this.mSeoMetaService = mSeoMetaService;
        this.productImageService = productImageService;
        this.skuService = skuService;
        this.productDiscountService = productDiscountService;
        this.productSpecialService = productSpecialService;
    }
    // Seo Product List
    /**
     * @api {get} /api/product-seo Seo Product List API
     * @apiGroup Seo
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Product list",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-seo
     * @apiErrorExample {json} Seo List error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorProductList(limit, offset, status, keyword, price, productName, vendorName, count, sku, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorProductDetails = yield (0, marketplace_1.vendorProductList)((0, typeorm_1.getConnection)(), limit, offset, keyword, sku, status, +price, productName, vendorName, count, request.user.vendorId);
            return response.status(200).send({
                status: vendorProductDetails.status,
                message: vendorProductDetails.message,
                data: vendorProductDetails.data,
            });
        });
    }
    // Create/Update Seo  API
    /**
     * @api {Post} /api/product-seo/:productId Create/Update Seo API
     * @apiGroup Seo
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "metaTagTitle" : "",
     *      "metaTagDescription": "",
     *      "metaTagKeyword": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "SEO Updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-seo/:productId
     * @apiErrorExample {json} Seo  error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSeo(productId, seo, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne(productId);
            if (!product) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid product. ',
                };
                return response.status(400).send(errorResponse);
            }
            const updateSeo = yield this.mSeoMetaService.findOne({
                where: {
                    refId: productId,
                    seoType: 'product',
                },
            });
            if (updateSeo) {
                updateSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : product.name;
                updateSeo.metaTagDescription = seo.metaTagDescription ? yield this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
                updateSeo.metaTagKeyword = seo.metaTagKeyword;
                updateSeo.refId = productId;
                updateSeo.seoType = 'product';
                yield this.mSeoMetaService.update(updateSeo.seoId, updateSeo);
                const successResponse = {
                    status: 1,
                    message: 'Seo Updated successfully',
                };
                return response.status(200).send(successResponse);
            }
            const NewSeo = new MSeoMetaModel_1.MSeoMeta();
            NewSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : product.name;
            NewSeo.metaTagDescription = seo.metaTagDescription ? yield this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
            NewSeo.metaTagKeyword = seo.metaTagKeyword;
            NewSeo.refId = productId;
            NewSeo.seoType = 'product';
            const createSeo = yield this.mSeoMetaService.create(NewSeo);
            if (createSeo) {
                const successResponse = {
                    status: 1,
                    message: 'Seo created Successfully. ',
                    data: createSeo,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create Seo. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Seo Detail API
    /**
     * @api {get} /api/vendor-product-seo/:productId Seo Detail API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get product Seo Detail. ",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/vendor-product-seo/:productId
     * @apiErrorExample {json} Seo error
     * HTTP/1.1 500 Internal Server Error
     */
    seoDetail(productId, response) {
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
                    message: 'Invalid product. ',
                });
            }
            product.productImage = yield this.productImageService.findOne({
                select: ['image', 'containerName'],
                where: {
                    productId: product.productId,
                    defaultImage: 1,
                },
            });
            const sku = yield this.skuService.findOne({
                select: ['id', 'price'],
                where: {
                    skuName: product.sku,
                },
            });
            if (!sku) {
                return response.status(400).send({
                    status: 0,
                    message: 'SKU does not exist.',
                });
            }
            product.price = sku.price;
            const discountPrice = yield this.productDiscountService.findOne({
                select: ['price'],
                where: {
                    productId: product.productId,
                    skuId: sku.id,
                },
            });
            const specialPrice = yield this.productSpecialService.findOne({
                select: ['price'],
                where: {
                    productId: product.productId,
                    skuId: sku.id,
                },
            });
            product.seo = yield this.mSeoMetaService.findOne({
                where: {
                    refId: product.productId,
                    seoType: 'product',
                },
            });
            if (specialPrice && specialPrice.price !== null) {
                product.pricerefer = specialPrice.price;
                product.flag = 1;
            }
            else if (discountPrice && discountPrice.price !== null) {
                product.pricerefer = discountPrice.price;
                product.flag = 0;
            }
            else {
                product.pricerefer = '';
                product.flag = '';
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got Seo details. ',
                data: product,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('status')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(4, (0, routing_controllers_1.QueryParam)('price')),
    tslib_1.__param(5, (0, routing_controllers_1.QueryParam)('productName')),
    tslib_1.__param(6, (0, routing_controllers_1.QueryParam)('vendorName')),
    tslib_1.__param(7, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(8, (0, routing_controllers_1.QueryParam)('sku')),
    tslib_1.__param(9, (0, routing_controllers_1.Req)()),
    tslib_1.__param(10, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoVendorProductController.prototype, "vendorProductList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/:productId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateSeoRequest_1.AddSeoRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoVendorProductController.prototype, "updateSeo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:productId'),
    (0, routing_controllers_1.Authorized)('vendor'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoVendorProductController.prototype, "seoDetail", null);
SeoVendorProductController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/vendor-product-seo'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        MSeoMetaService_1.MSeoMetaService,
        ProductImageService_1.ProductImageService,
        SkuService_1.SkuService,
        ProductDiscountService_1.ProductDiscountService,
        ProductSpecialService_1.ProductSpecialService])
], SeoVendorProductController);
exports.SeoVendorProductController = SeoVendorProductController;
//# sourceMappingURL=SeoVendorProductController.js.map