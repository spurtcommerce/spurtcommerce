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
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
const ProductDiscountService_1 = require("../../../../src/api/core/services/ProductDiscountService");
const ProductSpecialService_1 = require("../../../../src/api/core/services/ProductSpecialService");
const TranslationMiddleware_1 = require("../../../../src/api/core/middlewares/TranslationMiddleware");
const OrderProductService_1 = require("../../../../src/api/core/services/OrderProductService");
const checkTokenMiddleware_1 = require("../../../../src/api/core/middlewares/checkTokenMiddleware");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
let StoreProductVariantsController = class StoreProductVariantsController {
    constructor(productService, skuService, productVarientService, productImageService, productVarientOptionDetailService, productVarientOptionImageService, productVarientOptionService, varientsValueService, varientsService, productDiscountService, productSpecialService, orderProductService) {
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
        this.orderProductService = orderProductService;
        // ----
    }
    // Product Variants Product Detail API
    /**
     * @api {Get} /api/store-product-variant/product/:productSlug Product Variants Product Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": 1
     *      "message": "Successfully get product Detail",
     *      "data": {
     *        "productId": 1,
     *        "productSlug": "",
     *        "productImage": [
     *          {
     *            "productId": 1,
     *            "image": "",
     *            "containerName": "",
     *            "defaultImage": ""
     *          }
     *        ],
     *        "productOriginalImage": [
     *          {
     *            "productId": 1,
     *            "image": "",
     *            "containerName": "",
     *            "defaultImage": ""
     *          }
     *        ],
     *        "selectedVariant": {
     *          "1": "",
     *          "2": ""
     *        },
     *        "productVarientOption": [
     *          {
     *            "id": 1,
     *            "productVarientOptionId": 1,
     *            "variantValueId": 1,
     *            "value": ""
     *          },
     *        ],
     *        "productVarient": [
     *          {
     *            "id": 1,
     *            "variantId": 1,
     *            "productId": ,
     *            "variantNameTrans": "",
     *            "variantValue": [
     *              {
     *                "id": 1,
     *                "value": "",
     *                "valueTrans": ""
     *              }
     *            ]
     *          }
     *        ],
     *        "productvarientList": [
     *          {
     *            "id": 1,
     *            "productId": 1,
     *            "skuId": 1,
     *            "varientName": "",
     *            "isActive": 1,
     *            "createdDate": "",
     *            "skuName": "",
     *            "price": 1,
     *            "quantity": 1,
     *            "optionImage": [
     *              {
     *                "id": 1,
     *                "image": "",
     *                "containerName": "",
     *                "defaultImage": ""
     *              }
     *            ],
     *            "discountPrice": [
     *              {
     *                "discountPrice": 1,
     *                "startDate": "",
     *                "endDate": ""
     *              }
     *            ],
     *            "specialPrice": [
     *              {
     *                "specialPrice": "",
     *                "startDate": "",
     *                "endDate": ""
     *              }
     *            ],
     *            "stockStatus": 1
     *          }
     *        ]
     * }
     * @apiSampleRequest /api/store-product-variant/product/:productSlug
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetail(productSlug, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                where: { productSlug, isActive: 1 },
            });
            if (!productDetail) {
                return response.status(400).send({
                    status: 0,
                    message: `Invalid product Slug`,
                });
            }
            const productDetails = (0, class_transformer_1.instanceToPlain)(productDetail);
            productDetails.productImage = yield this.productImageService.findAll({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: productDetail.productId,
                },
                order: {
                    sortOrder: 'ASC',
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
                        if (varientValueData) {
                            selectedVariant[varientValueData.variantId] = vv.varientsValueId;
                        }
                        tempValue.value = (varientValueData) ? varientValueData.value : '';
                        return tempValue;
                    }));
                    const rslt = Promise.all(varientValueList);
                    return rslt;
                });
                const image = yield this.productVarientOptionImageService.findAll({
                    select: ['id', 'image', 'containerName', 'defaultImage', 'productVarientOptionId'],
                    where: { productVarientOptionId: skuValue.id },
                    order: {
                        sortOrder: 'ASC',
                    },
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
                    var _a, _b;
                    const varients = yield this.varientsService.findOne({ where: { id: value.variantId }, relations: ['variantTranslation', 'variantValue', 'variantValue.variantValueTranslation'] });
                    if (varients) {
                        varients.variantValue = varients.variantValue.map((variantVal) => {
                            var _a, _b;
                            variantVal.valueTrans = (_b = (_a = (variantVal.variantValueTranslation.find((valueTrans) => { var _a; return valueTrans.languageId === ((_a = request.languageId) !== null && _a !== void 0 ? _a : 0); }))) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
                            delete variantVal.variantValueTranslation;
                            return variantVal;
                        });
                        varients.variantNameTrans = (_b = (_a = (varients.variantTranslation.find((variantTrans) => { var _a; return variantTrans.languageId === ((_a = request.languageId) !== null && _a !== void 0 ? _a : 0); }))) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
                        delete varients.variantTranslation;
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
                    var _a;
                    const temp = value;
                    const sku = yield this.skuService.findOne({
                        select: ['id', 'skuName', 'price', 'isActive', 'quantity', 'isActive', 'outOfStockThreshold', 'notifyMinQuantity', 'minQuantityAllowedCart', 'maxQuantityAllowedCart', 'enableBackOrders', 'vendorId', 'backOrderStockLimit'],
                        where: { id: value.skuId },
                    });
                    const image = yield this.productVarientOptionImageService.findAll({
                        select: ['id', 'image', 'containerName', 'defaultImage', 'productVarientOptionId'],
                        where: { productVarientOptionId: value.id },
                        order: {
                            sortOrder: 'ASC',
                        },
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
                    const dateNow = new Date();
                    const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                    const discountPrice = yield this.productDiscountService.findDiscountPricewithSku(productDetail.productId, value.skuId, todaydate);
                    const specialPrice = yield this.productSpecialService.findSpecialPriceWithSku(productDetail.productId, value.skuId, todaydate);
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
                    const orderProductForBackOrder = yield this.orderProductService.listByQueryBuilder(0, 0, [], [
                        { name: 'order.backOrders', op: 'where', value: 1 },
                        { name: 'OrderProduct.skuName', op: 'and', value: `'${sku.skuName}'` },
                    ], [], [{ tableName: 'OrderProduct.order', aliasName: 'order' }], [], [], false, false);
                    const totalbackOrderQuantity = orderProductForBackOrder.reduce((total, item) => {
                        return total + item.quantity;
                    }, 0);
                    temp.availableBackOrderStock = sku.backOrderStockLimit - totalbackOrderQuantity;
                    temp.vendorId = sku.vendorId;
                    if (request.id) {
                        const orderProduct = yield this.orderProductService.findOne({
                            where: {
                                order: { customerId: request.id, paymentStatus: 1 },
                                skuName: sku.skuName,
                                cancelRequestStatus: (0, typeorm_1.Not)(1),
                            },
                            relations: ['order'],
                        });
                        temp.buyed = orderProduct ? 1 : 0;
                        temp.orderProductId = (_a = orderProduct === null || orderProduct === void 0 ? void 0 : orderProduct.orderProductId) !== null && _a !== void 0 ? _a : 0;
                    }
                    else {
                        temp.buyed = 0;
                        temp.orderProductId = 0;
                    }
                    temp.productVarientOption = productVarientOption;
                    temp.discountPrice = discountPrice ? [discountPrice] : [];
                    temp.specialPrice = specialPrice ? [specialPrice] : [];
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
exports.StoreProductVariantsController = StoreProductVariantsController;
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product/:productSlug'),
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productSlug')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductVariantsController.prototype, "productDetail", null);
exports.StoreProductVariantsController = StoreProductVariantsController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    (0, typedi_1.Service)(),
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
        ProductSpecialService_1.ProductSpecialService,
        OrderProductService_1.OrderProductService])
], StoreProductVariantsController);
//# sourceMappingURL=ProductVariantsController.js.map