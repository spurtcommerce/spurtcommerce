"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProductVariantsController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const VariantValueService_1 = require("../../services/VariantValueService");
const ProductVarientService_1 = require("../../services/ProductVarientService");
const VariantService_1 = require("../../services/VariantService");
const ProductVarientOptionDetailService_1 = require("../../services/ProductVarientOptionDetailService");
const ProductVarientOptionImageService_1 = require("../../services/ProductVarientOptionImageService");
const ProductVarientOptionService_1 = require("../../services/ProductVarientOptionService");
const class_transformer_1 = require("class-transformer");
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
const ProductDiscountService_1 = require("../../../../src/api/core/services/ProductDiscountService");
const ProductSpecialService_1 = require("../../../../src/api/core/services/ProductSpecialService");
// @UseBefore(CheckAddonMiddleware)
let StoreProductVariantsController = class StoreProductVariantsController {
    constructor(productService, skuService, productVarientService, productImageService, productVarientOptionDetailService, productVarientOptionImageService, productVarientOptionService, varientsValueService, varientsService, productDiscountService, productSpecialService) {
        this.productService = productService;
        this.skuService = skuService;
        this.productVarientService = productVarientService;
        this.productImageService = productImageService;
        this.productVarientOptionDetailService = productVarientOptionDetailService;
        this.productVarientOptionImageService = productVarientOptionImageService;
        this.productVarientOptionService = productVarientOptionService;
        this.varientsValueService = varientsValueService;
        this.varientsService = varientsService;
        this.productDiscountService = productDiscountService;
        this.productSpecialService = productSpecialService;
        // ----
    }
    // Product Variants Product Detail API
    /**
     * @api {get} /api/store-product-variants/product-detail/:id Product Variants Product Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/store-product-variants/product-detail/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetail(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                where: { productId: id },
            });
            const productDetails = (0, class_transformer_1.instanceToPlain)(productDetail);
            productDetails.productImage = yield this.productImageService.findAll({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: productDetail.productId,
                },
            });
            productDetails.productOriginalImage = productDetails.productImage.slice();
            const selectedVariant = {};
            const skuValue = yield this.productVarientOptionService.findOne({ where: { productId: productDetail.productId, isActive: 1 } });
            if (skuValue) {
                const productVarientOption = yield this.productVarientOptionDetailService.findAll({
                    select: ['id', 'productVarientOptionId', 'variantValueId'],
                    where: { productVarientOptionId: skuValue.id },
                }).then((varientValue) => {
                    const varientValueList = varientValue.map((vv) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const tempValue = vv;
                        const varientValueData = yield this.varientsValueService.findOne({
                            select: ['id', 'value', 'variantId'],
                            where: { id: vv.variantValueId },
                        });
                        if (varientValueData !== undefined) {
                            selectedVariant[varientValueData.variantId] = vv.varientsValueId;
                        }
                        tempValue.value = (varientValueData !== undefined) ? varientValueData.value : '';
                        return tempValue;
                    }));
                    const rslt = Promise.all(varientValueList);
                    return rslt;
                });
                const image = yield this.productVarientOptionImageService.findAll({
                    select: ['id', 'image', 'containerName', 'defaultImage', 'productVarientOptionId'],
                    where: { productVarientOptionId: skuValue.id },
                });
                if (image && image.length > 0) {
                    const tempImage = productDetails.productImage.map(element => {
                        return Object.assign({}, element, {
                            defaultImage: 0,
                        });
                    });
                    image[0].defaultImage = 1;
                    tempImage.unshift(image[0]);
                    productDetails.productImage = tempImage;
                }
                productDetails.productVarientOption = productVarientOption;
                productDetails.selectedVariant = selectedVariant;
            }
            productDetails.productVarient = yield this.productVarientService.findAll({
                select: ['id', 'variantId', 'productId'],
                where: { productId: productDetail.productId },
            }).then((val) => {
                const varientDetail = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const varients = yield this.varientsService.findOne({ where: { id: value.variantId } });
                    if (varients) {
                        varients.variantValue = yield this.varientsValueService.find({ where: { variantId: varients.id } });
                        const temp = varients;
                        return temp;
                    }
                }));
                const results = Promise.all(varientDetail);
                return results;
            });
            productDetails.productvarientList = yield this.productVarientOptionService.findAll({
                select: ['id', 'productId', 'skuId', 'varientName', 'isActive', 'createdDate'],
                where: { productId: productDetail.productId, isActive: 1 },
            }).then((val) => {
                const productVarList = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = value;
                    const sku = yield this.skuService.findOne({
                        select: ['id', 'skuName', 'price', 'isActive', 'quantity', 'isActive', 'outOfStockThreshold', 'notifyMinQuantity', 'minQuantityAllowedCart', 'maxQuantityAllowedCart', 'enableBackOrders', 'vendorId'],
                        where: { id: value.skuId },
                    });
                    const image = yield this.productVarientOptionImageService.findAll({
                        select: ['id', 'image', 'containerName', 'defaultImage', 'productVarientOptionId'],
                        where: { productVarientOptionId: value.id },
                    });
                    const productVarientOption = yield this.productVarientOptionDetailService.findAll({
                        select: ['id', 'productVarientOptionId', 'variantValueId'],
                        where: { productVarientOptionId: value.id },
                    }).then((varientValue) => {
                        const varientValueList = varientValue.map((vv) => {
                            return vv.variantValueId;
                        });
                        return varientValueList;
                    });
                    const discountPrice = yield this.productDiscountService.findAll({ where: { skuId: value.skuId } });
                    const specialPrice = yield this.productSpecialService.findAll({ where: { skuId: value.skuId } });
                    temp.skuName = sku.skuName;
                    temp.price = sku.price;
                    temp.quantity = sku.quantity;
                    temp.optionImage = image;
                    temp.isActive = sku.isActive;
                    temp.outOfStockThreshold = sku.outOfStockThreshold;
                    temp.notifyMinQuantity = sku.notifyMinQuantity;
                    temp.minQuantityAllowedCart = sku.minQuantityAllowedCart;
                    temp.maxQuantityAllowedCart = sku.maxQuantityAllowedCart;
                    temp.enableBackOrders = sku.enableBackOrders;
                    temp.vendorId = sku.vendorId;
                    temp.productVarientOption = productVarientOption;
                    temp.discountPrice = discountPrice;
                    temp.specialPrice = specialPrice;
                    if (productDetails.hasStock === 1) {
                        if (sku.quantity <= sku.outOfStockThreshold) {
                            productDetails.stockStatus = 'outOfStock';
                        }
                        else {
                            productDetails.stockStatus = 'inStock';
                        }
                    }
                    else {
                        productDetails.stockStatus = 'inStock';
                    }
                    return temp;
                }));
                const resultData = Promise.all(productVarList);
                return resultData;
            });
            const successResponse = {
                status: 1,
                message: 'Successfully get productDetail',
                data: productDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductVariantsController.prototype, "productDetail", null);
StoreProductVariantsController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/store-product-variant'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        SkuService_1.SkuService,
        ProductVarientService_1.ProductVarientService,
        ProductImageService_1.ProductImageService,
        ProductVarientOptionDetailService_1.ProductVarientOptionDetailService,
        ProductVarientOptionImageService_1.ProductVarientOptionImageService,
        ProductVarientOptionService_1.ProductVarientOptionService,
        VariantValueService_1.VariantValueService,
        VariantService_1.VariantService,
        ProductDiscountService_1.ProductDiscountService,
        ProductSpecialService_1.ProductSpecialService])
], StoreProductVariantsController);
exports.StoreProductVariantsController = StoreProductVariantsController;
//# sourceMappingURL=ProductVariantsController.js.map