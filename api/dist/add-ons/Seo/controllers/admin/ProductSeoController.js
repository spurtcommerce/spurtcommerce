"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoProductController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const MSeoMetaService_1 = require("../../services/MSeoMetaService");
const class_transformer_1 = require("class-transformer");
const MSeoMetaModel_1 = require("../../models/MSeoMetaModel");
const CreateSeoRequest_1 = require("./requests/CreateSeoRequest");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const ProductDiscountService_1 = require("../../../../src/api/core/services/ProductDiscountService");
const ProductSpecialService_1 = require("../../../../src/api/core/services/ProductSpecialService");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let SeoProductController = class SeoProductController {
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
    productList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Product.productId as productId',
                'Product.sku as sku',
                'Product.name as name',
                'Product.quantity as quantity',
                'Product.price as price',
                'Product.skuId as skuId',
                'Product.productSlug as productSlug',
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
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['Product.name'],
                    value: keyword,
                });
            }
            const sort = [{
                    name: 'Product.createdDate',
                    order: 'DESC',
                }];
            const productLists = yield this.productService.listByQueryBuilder(limit, offset, select, [], searchConditions, [], [], sort, false, true);
            if (count) {
                const productListCount = yield this.productService.listByQueryBuilder(limit, offset, select, [], searchConditions, [], [], sort, true, true);
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got product lists count.',
                    data: productListCount,
                });
            }
            const productList = productLists.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
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
                message: 'Successfully got the  product list.',
                data: (0, class_transformer_1.instanceToPlain)(results),
            };
            return response.status(200).send(successResponse);
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
     * @api {get} /api/product-seo/:productId Seo Detail API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get product Seo Detail. ",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/product-seo/:productId
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
    (0, routing_controllers_1.Authorized)(['admin']),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoProductController.prototype, "productList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/:productId'),
    (0, routing_controllers_1.Authorized)(['admin', 'seo-update']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateSeoRequest_1.AddSeoRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoProductController.prototype, "updateSeo", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/:productId'),
    (0, routing_controllers_1.Authorized)(['admin', 'product-seo-detail']),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SeoProductController.prototype, "seoDetail", null);
SeoProductController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/product-seo'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        MSeoMetaService_1.MSeoMetaService,
        ProductImageService_1.ProductImageService,
        SkuService_1.SkuService,
        ProductDiscountService_1.ProductDiscountService,
        ProductSpecialService_1.ProductSpecialService])
], SeoProductController);
exports.SeoProductController = SeoProductController;
//# sourceMappingURL=ProductSeoController.js.map