"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProductController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const ProductToCategoryService_1 = require("../../core/services/ProductToCategoryService");
const ProductService_1 = require("../../core/services/ProductService");
const CategoryService_1 = require("../../core/services/CategoryService");
const ProductImageService_1 = require("../../core/services/ProductImageService");
const CustomerActivityService_1 = require("../../core/services/CustomerActivityService");
const productViewLog_1 = require("../../core/models/productViewLog");
const CustomerActivity_1 = require("../../core/models/CustomerActivity");
const ProductViewLogService_1 = require("../../core/services/ProductViewLogService");
const CustomerService_1 = require("../../core/services/CustomerService");
const ProductDiscountService_1 = require("../../core/services/ProductDiscountService");
const ProductSpecialService_1 = require("../../core/services/ProductSpecialService");
const CategoryPathService_1 = require("../../core/services/CategoryPathService");
const CustomerWishlistService_1 = require("../../core/services/CustomerWishlistService");
const VendorService_1 = require("../../core/services/VendorService");
const VendorProductService_1 = require("../../core/services/VendorProductService");
const TaxService_1 = require("../../core/services/TaxService");
const OrderProductService_1 = require("../../core/services/OrderProductService");
const ProductTirePriceService_1 = require("../../core/services/ProductTirePriceService");
const SkuService_1 = require("../../core/services/SkuService");
const ProductVideoService_1 = require("../../core/services/ProductVideoService");
const moment = require("moment");
const checkTokenMiddleware_1 = require("../../core/middlewares/checkTokenMiddleware");
const typeorm_1 = require("typeorm");
const TranslationMiddleware_1 = require("../../../api/core/middlewares/TranslationMiddleware");
const CountryService_1 = require("../../../api/core/services/CountryService");
const OrderService_1 = require("../../../../src/api/core/services/OrderService");
const IndustryValidationMiddleware_1 = require("../../../api/core/middlewares/IndustryValidationMiddleware");
const typedi_1 = require("typedi");
let StoreProductController = class StoreProductController {
    constructor(productService, productToCategoryService, categoryService, productImageService, customerService, productViewLogService, customerActivityService, taxService, orderProductService, productTirePriceService, skuService, productDiscountService, productSpecialService, vendorService, vendorProductService, categoryPathService, customerWishlistService, productVideoService, countryService, orderService) {
        this.productService = productService;
        this.productToCategoryService = productToCategoryService;
        this.categoryService = categoryService;
        this.productImageService = productImageService;
        this.customerService = customerService;
        this.productViewLogService = productViewLogService;
        this.customerActivityService = customerActivityService;
        this.taxService = taxService;
        this.orderProductService = orderProductService;
        this.productTirePriceService = productTirePriceService;
        this.skuService = skuService;
        this.productDiscountService = productDiscountService;
        this.productSpecialService = productSpecialService;
        this.vendorService = vendorService;
        this.vendorProductService = vendorProductService;
        this.categoryPathService = categoryPathService;
        this.customerWishlistService = customerWishlistService;
        this.productVideoService = productVideoService;
        this.countryService = countryService;
        this.orderService = orderService;
        // --
    }
    // Product Details API
    /**
     * @api {get} /api/product-store/productdetail/:productslug   Product Detail API
     * @apiGroup Store
     * @apiParam (Request body) {String} categorySlug categorySlug
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data": {
     *              "createdDate": """,
     *              "productId": 1,
     *              "sku": "",
     *              "upc": "",
     *              "hsn": "",
     *              "location": "",
     *              "quantity": 1,
     *              "minimumQuantity": 1,
     *              "subtractStock": 1,
     *              "stockStatusId": 1,
     *              "quotationAvailable": ,
     *              "image": "",
     *              "imagePath": "",
     *              "manufacturerId": 1,
     *              "shipping": "",
     *              "serviceCharges": "",
     *              "taxType": 1,
     *              "taxValue": "",
     *              "price": "",
     *              "priceUpdateFileLogId": "",
     *              "dateAvailable": "",
     *              "sortOrder": 1,
     *              "name": "",
     *              "description": "",
     *              "amount": "",
     *              "keywords": "",
     *              "discount": ""
     *              "deleteFlag": "",
     *              "isFeatured": "",
     *              "todayDeals": "",
     *              "condition": "",
     *              "rating": "",
     *              "wishListStatus": "",
     *              "productSlug": "",
     *              "isActive": 1,
     *              "width": "",
     *              "height": "",
     *              "length": "",
     *              "weight": "",
     *              "hasStock": 1,
     *              "priceType": "",
     *              "isSimplified": 1,
     *              "owner": "",
     *              "isCommon": 1,
     *              "skuId": "",
     *              "hasTirePrice": "",
     *              "outOfStockThreshold": 1,
     *              "notifyMinQuantity": "",
     *              "minQuantityAllowedCart": 1,
     *              "maxQuantityAllowedCart": 10,
     *              "enableBackOrders": 1,
     *              "pincodeBasedDelivery": "",
     *              "attributeKeyword": "",
     *              "settedAsCommonOn": "",
     *              "productHighlights": "",
     *              "productTranslation": [],
     *              "productNameTrans": "",
     *              "productDescriptionTrans": "",
     *              "ratingCount": "",
     *              "reviewCount": "",
     *              "productImage": [{
     *                            "productId": 1,
     *                            "image": "",
     *                            "containerName": "",
     *                            "defaultImage": "",
     *                          }],
     *              "productOriginalImage": [{
     *                      "productId": 1,
     *                      "image": "",
     *                      "containerName": "",
     *                      "defaultImage": ""
     *                  }
     *              ],
     *              "Category": [
     *                  {
     *                      "productId": 1,
     *                      "categoryId": 1,
     *                      "categoryName": "",
     *                      "categorySlug": ""
     *                  }
     *              ],
     *              "productOption": [],
     *              "skuName": "",
     *              "variantName": "",
     *              "variantId": 1,
     *              "stockStatus": 1,
     *              "pricerefer": "",
     *              "flag": "",
     *              "productTirePrices": [],
     *              "buyed": ,
     *              "productVideo": {
     *                  "id": 1,
     *                  "productId": "",
     *                  "name": "",
     *                  "path": "",
     *                  "type": 1
     *               }
     *              }
     * }
     * @apiSampleRequest /api/product-store/productdetail/:productslug
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetail(productslug, categorySlug, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            const productDetail = yield this.productService.findOne({
                where: {
                    productSlug: productslug,
                    isActive: 1,
                },
                relations: ['productTranslation'],
            });
            if (!productDetail) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid product',
                };
                return response.status(200).send(errResponse);
            }
            const productTranslation = productDetail.productTranslation.find((productTrans) => productTrans.languageId === request.languageId);
            productDetail.productNameTrans = (_a = productTranslation === null || productTranslation === void 0 ? void 0 : productTranslation.name) !== null && _a !== void 0 ? _a : '';
            productDetail.productDescriptionTrans = (_c = (_b = productTranslation === null || productTranslation === void 0 ? void 0 : productTranslation.description) === null || _b === void 0 ? void 0 : _b.replace(/"/g, `'`)) !== null && _c !== void 0 ? _c : '';
            productDetail.description = (_e = (_d = productDetail.description) === null || _d === void 0 ? void 0 : _d.replace(/"/g, `'`)) !== null && _e !== void 0 ? _e : '';
            const date = new Date();
            if (productDetail.dateAvailable > date) {
                return response.status(200).send({
                    status: 0,
                    message: 'Invalid product',
                });
            }
            const productDetails = (0, class_transformer_1.instanceToPlain)(productDetail);
            if (productDetails.taxType === 2) {
                const tax = yield this.taxService.findOne({ where: { taxId: productDetails.taxValue } });
                if (tax) {
                    productDetails.taxValue = tax.taxPercentage;
                }
                else {
                    productDetails.taxValue = '';
                }
            }
            productDetails.ratingCount = 0;
            productDetails.reviewCount = 'null';
            productDetails.productImage = yield this.productImageService.findAll({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: productDetail.productId,
                },
                order: {
                    sortOrder: 'ASC',
                },
            });
            productDetails.productImage.map((val) => val.mediaType = 1);
            productDetails.productOriginalImage = productDetails.productImage.slice();
            if (categorySlug) {
                const category = yield this.categoryService.findOne({ where: { categorySlug, isActive: 1 } });
                if (category) {
                    const categoryLevels = yield this.categoryPathService.find({
                        select: ['level', 'pathId'],
                        where: { categoryId: category.categoryId },
                        order: { level: 'ASC' },
                    }).then((values) => {
                        const categories = values.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                            const categoryData = yield this.categoryService.findOne({ where: { categoryId: val.pathId } });
                            const tempVal = val;
                            tempVal.categoryName = categoryData ? categoryData.name : '';
                            tempVal.categoryId = categoryData ? categoryData.categoryId : '';
                            tempVal.categorySlug = categoryData ? categoryData.categorySlug : '';
                            tempVal.parentInt = categoryData ? categoryData.parentInt : '';
                            tempVal.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                            return tempVal;
                        }));
                        const results = Promise.all(categories);
                        return results;
                    });
                    productDetails.Category = categoryLevels;
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid category',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            else {
                productDetails.Category = yield this.productToCategoryService.findAll({
                    select: ['categoryId', 'productId'],
                    where: { productId: productDetail.productId },
                }).then((val) => {
                    const category = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryNames = yield this.categoryService.findOne({ where: { categoryId: value.categoryId } });
                        const temp = value;
                        if (categoryNames) {
                            temp.categoryName = categoryNames.name;
                            temp.categorySlug = categoryNames.categorySlug;
                        }
                        else {
                            temp.categoryName = '';
                            temp.categorySlug = '';
                        }
                        return temp;
                    }));
                    const results = Promise.all(category);
                    return results;
                });
            }
            productDetails.productOption = [];
            productDetails.skuName = '';
            productDetails.skuId = productDetails.skuId ? productDetails.skuId : '';
            productDetails.variantName = '';
            productDetails.variantId = '';
            let skuId = undefined;
            const skuValue = yield this.skuService.findOne({ where: { id: productDetails.skuId } });
            if (skuValue) {
                productDetails.price = skuValue.price;
                productDetails.skuName = skuValue.skuName;
                productDetails.skuId = skuValue.id;
                productDetails.outOfStockThreshold = skuValue.outOfStockThreshold;
                productDetails.notifyMinQuantity = skuValue.notifyMinQuantity;
                productDetails.minQuantityAllowedCart = skuValue.minQuantityAllowedCart;
                productDetails.maxQuantityAllowedCart = skuValue.maxQuantityAllowedCart;
                productDetails.enableBackOrders = skuValue.enableBackOrders;
                const orderProductForBackOrder = yield this.orderProductService.listByQueryBuilder(0, 0, [], [
                    { name: 'order.backOrders', op: 'where', value: 1 },
                    { name: 'OrderProduct.skuName', op: 'and', value: `'${skuValue.skuName}'` },
                ], [], [{ tableName: 'OrderProduct.order', aliasName: 'order' }], [], [], false, false);
                const totalbackOrderQuantity = orderProductForBackOrder.reduce((total, item) => {
                    return total + item.quantity;
                }, 0);
                productDetails.availableBackOrderStock = skuValue.backOrderStockLimit - totalbackOrderQuantity;
                if (productDetails.hasStock === 1) {
                    if (skuValue.quantity <= skuValue.outOfStockThreshold) {
                        productDetails.stockStatus = 'outOfStock';
                    }
                    else {
                        productDetails.stockStatus = 'inStock';
                    }
                }
                else {
                    productDetails.stockStatus = 'inStock';
                }
                skuId = skuValue.id;
            }
            if (skuId) {
                const nowDate = new Date();
                const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(productDetail.productId, skuId, todaydate);
                const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(productDetail.productId, skuId, todaydate);
                if (productSpecial) {
                    productDetails.pricerefer = productSpecial.price;
                    productDetails.flag = 1;
                }
                else if (productDiscount) {
                    productDetails.pricerefer = productDiscount.price;
                    productDetails.flag = 0;
                }
                else {
                    productDetails.pricerefer = '';
                    productDetails.flag = '';
                }
                productDetails.productTirePrices = yield this.productTirePriceService.findAll({
                    select: ['id', 'quantity', 'price'],
                    where: { productId: productDetail.productId, skuId },
                });
            }
            else {
                productDetails.pricerefer = '';
                productDetails.flag = '';
                productDetails.productTirePrices = yield this.productTirePriceService.findAll({
                    select: ['id', 'quantity', 'price'],
                    where: { productId: productDetail.productId },
                });
            }
            const vendorProduct = yield this.vendorProductService.findOne({ where: { productId: productDetail.productId, reuse: (0, typeorm_1.IsNull)() }, relations: ['vendor'] });
            if (vendorProduct) {
                const vendor = yield this.vendorService.findOne({ where: { vendorId: vendorProduct.vendorId } });
                const customer = yield this.customerService.findOne({ where: { id: vendor.customerId } });
                productDetails.vendorId = vendor.vendorId;
                productDetails.vendorName = customer.firstName;
                productDetails.vendorCompanyName = vendor.companyName;
                productDetails.vendorPrefixId = vendor.vendorPrefixId;
                productDetails.companyLogo = vendor.companyLogo;
                productDetails.companyLogoPath = vendor.companyLogoPath;
                productDetails.vendorCompanyName = vendor.companyName;
                productDetails.vendorCompanyCity = vendor.companyCity;
                productDetails.vendorDisplayNameUrl = vendor.displayNameUrl;
                productDetails.vendorSlugName = vendor.vendorSlugName;
                productDetails.quotationAvailable = vendorProduct.quotationAvailable;
                productDetails.companyTaxNumber = (_f = vendorProduct.vendor.companyTaxNumber) !== null && _f !== void 0 ? _f : '';
                productDetail.companyPanNumber = (_g = vendorProduct.vendor.companyPanNumber) !== null && _g !== void 0 ? _g : '';
                productDetail.companyCountry = (_h = vendorProduct.vendor.companyCountryId) !== null && _h !== void 0 ? _h : '';
                productDetail.vendorCompanystateId = (_j = vendorProduct.vendor.zoneId) !== null && _j !== void 0 ? _j : '';
                productDetails.vendorCompanyCountry = '';
                if ((_k = vendorProduct.vendor) === null || _k === void 0 ? void 0 : _k.companyCountryId) {
                    const country = yield this.countryService.findOne({ where: { countryId: (_l = vendorProduct.vendor) === null || _l === void 0 ? void 0 : _l.companyCountryId } });
                    productDetails.vendorCompanyCountry = country.name;
                }
            }
            if (request.id) {
                let customerId;
                customerId = request.id;
                const wishStatus = yield this.customerWishlistService.findOne({
                    where: {
                        productId: productDetail.productId,
                        customerId,
                    },
                });
                const orderProduct = yield this.orderProductService.findOne({
                    where: {
                        order: { customerId, paymentStatus: 1 },
                        productId: productDetail.productId,
                        cancelRequestStatus: (0, typeorm_1.Not)(1),
                    },
                    relations: ['order'],
                });
                if (orderProduct) {
                    productDetails.buyed = 1;
                    productDetails.orderProductId = orderProduct.orderProductId;
                }
                else {
                    productDetails.buyed = 0;
                    productDetails.orderProductId = 0;
                }
                if (wishStatus) {
                    productDetails.wishListStatus = 1;
                }
                else {
                    productDetails.wishListStatus = 0;
                }
                const customerDetail = yield this.customerService.findOne({ where: { id: customerId } });
                const customerActivity = new CustomerActivity_1.CustomerActivity();
                customerActivity.customerId = customerId;
                customerActivity.activityId = 2;
                customerActivity.description = 'productviewed';
                customerActivity.productId = productDetail.productId;
                yield this.customerActivityService.create(customerActivity);
                const viewLog = new productViewLog_1.ProductViewLog();
                viewLog.productId = productDetail.productId;
                viewLog.customerId = customerDetail.id;
                viewLog.firstName = customerDetail.firstName;
                viewLog.lastName = customerDetail.lastName;
                viewLog.username = customerDetail.username;
                viewLog.email = customerDetail.email;
                viewLog.mobileNumber = customerDetail.mobileNumber;
                viewLog.address = customerDetail.address;
                yield this.productViewLogService.create(viewLog);
            }
            else {
                productDetails.wishListStatus = 0;
                productDetails.buyed = 0;
            }
            // product video
            productDetails.productVideo = yield this.productVideoService.findOne({
                select: ['id', 'name', 'path', 'type', 'productId'],
                where: { productId: productDetail.productId },
            });
            productDetails.productVideo = Object.assign(Object.assign({}, productDetails.productVideo), { mediaType: 2 });
            const successResponse = {
                status: 1,
                message: 'Successfully got product detail',
                data: productDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Product Details API
    /**
     * @api {get} /api/product-store/product/detail/:skuName   Product Detail API
     * @apiGroup Store
     * @apiParam (Request body) {String} categorySlug categorySlug
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data": {
     *              "createdDate": """,
     *              "productId": 1,
     *              "sku": "",
     *              "upc": "",
     *              "hsn": "",
     *              "location": "",
     *              "quantity": 1,
     *              "minimumQuantity": 1,
     *              "subtractStock": 1,
     *              "stockStatusId": 1,
     *              "quotationAvailable": ,
     *              "image": "",
     *              "imagePath": "",
     *              "manufacturerId": 1,
     *              "shipping": "",
     *              "serviceCharges": "",
     *              "taxType": 1,
     *              "taxValue": "",
     *              "price": "",
     *              "priceUpdateFileLogId": "",
     *              "dateAvailable": "",
     *              "sortOrder": 1,
     *              "name": "",
     *              "description": "",
     *              "amount": "",
     *              "keywords": "",
     *              "discount": ""
     *              "deleteFlag": "",
     *              "isFeatured": "",
     *              "todayDeals": "",
     *              "condition": "",
     *              "rating": "",
     *              "wishListStatus": "",
     *              "productSlug": "",
     *              "isActive": 1,
     *              "width": "",
     *              "height": "",
     *              "length": "",
     *              "weight": "",
     *              "hasStock": 1,
     *              "priceType": "",
     *              "isSimplified": 1,
     *              "owner": "",
     *              "isCommon": 1,
     *              "skuId": "",
     *              "hasTirePrice": "",
     *              "outOfStockThreshold": 1,
     *              "notifyMinQuantity": "",
     *              "minQuantityAllowedCart": 1,
     *              "maxQuantityAllowedCart": 10,
     *              "enableBackOrders": 1,
     *              "pincodeBasedDelivery": "",
     *              "attributeKeyword": "",
     *              "settedAsCommonOn": "",
     *              "productHighlights": "",
     *              "productTranslation": [],
     *              "productNameTrans": "",
     *              "productDescriptionTrans": "",
     *              "ratingCount": "",
     *              "reviewCount": "",
     *              "productImage": [{
     *                            "productId": 1,
     *                            "image": "",
     *                            "containerName": "",
     *                            "defaultImage": "",
     *                          }],
     *              "productOriginalImage": [{
     *                      "productId": 1,
     *                      "image": "",
     *                      "containerName": "",
     *                      "defaultImage": ""
     *                  }
     *              ],
     *              "Category": [
     *                  {
     *                      "productId": 1,
     *                      "categoryId": 1,
     *                      "categoryName": "",
     *                      "categorySlug": ""
     *                  }
     *              ],
     *              "productOption": [],
     *              "skuName": "",
     *              "variantName": "",
     *              "variantId": 1,
     *              "stockStatus": 1,
     *              "pricerefer": "",
     *              "flag": "",
     *              "productTirePrices": [],
     *              "buyed": ,
     *              "productVideo": {
     *                  "id": 1,
     *                  "productId": "",
     *                  "name": "",
     *                  "path": "",
     *                  "type": 1
     *               }
     *              }
     * }
     * @apiSampleRequest /api/product-store/product/detail/:skuName
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetailWithSku(skuName, categorySlug, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            const productDetail = yield this.productService.findOne({
                where: {
                    sku: skuName,
                    isActive: 1,
                },
                relations: ['productTranslation'],
            });
            if (!productDetail) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid product',
                };
                return response.status(200).send(errResponse);
            }
            const productTranslation = productDetail.productTranslation.find((productTrans) => productTrans.languageId === request.languageId);
            productDetail.productNameTrans = (_a = productTranslation === null || productTranslation === void 0 ? void 0 : productTranslation.name) !== null && _a !== void 0 ? _a : '';
            productDetail.productDescriptionTrans = (_c = (_b = productTranslation === null || productTranslation === void 0 ? void 0 : productTranslation.description) === null || _b === void 0 ? void 0 : _b.replace(/"/g, `'`)) !== null && _c !== void 0 ? _c : '';
            productDetail.description = (_e = (_d = productDetail.description) === null || _d === void 0 ? void 0 : _d.replace(/"/g, `'`)) !== null && _e !== void 0 ? _e : '';
            const date = new Date();
            if (productDetail.dateAvailable > date) {
                return response.status(200).send({
                    status: 0,
                    message: 'Invalid product',
                });
            }
            const productDetails = (0, class_transformer_1.instanceToPlain)(productDetail);
            if (productDetails.taxType === 2) {
                const tax = yield this.taxService.findOne({ where: { taxId: productDetails.taxValue } });
                if (tax) {
                    productDetails.taxValue = tax.taxPercentage;
                }
                else {
                    productDetails.taxValue = '';
                }
            }
            productDetails.ratingCount = 0;
            productDetails.reviewCount = 'null';
            productDetails.productImage = yield this.productImageService.findAll({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: productDetail.productId,
                },
                order: {
                    sortOrder: 'ASC',
                },
            });
            productDetails.productImage.map((val) => val.mediaType = 1);
            productDetails.productOriginalImage = productDetails.productImage.slice();
            if (categorySlug) {
                const category = yield this.categoryService.findOne({ where: { categorySlug, isActive: 1 } });
                if (category) {
                    const categoryLevels = yield this.categoryPathService.find({
                        select: ['level', 'pathId'],
                        where: { categoryId: category.categoryId },
                        order: { level: 'ASC' },
                    }).then((values) => {
                        const categories = values.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                            const categoryData = yield this.categoryService.findOne({ where: { categoryId: val.pathId } });
                            const tempVal = val;
                            tempVal.categoryName = categoryData ? categoryData.name : '';
                            tempVal.categoryId = categoryData ? categoryData.categoryId : '';
                            tempVal.categorySlug = categoryData ? categoryData.categorySlug : '';
                            tempVal.parentInt = categoryData ? categoryData.parentInt : '';
                            tempVal.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                            return tempVal;
                        }));
                        const results = Promise.all(categories);
                        return results;
                    });
                    productDetails.Category = categoryLevels;
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid category',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            else {
                productDetails.Category = yield this.productToCategoryService.findAll({
                    select: ['categoryId', 'productId'],
                    where: { productId: productDetail.productId },
                }).then((val) => {
                    const category = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryNames = yield this.categoryService.findOne({ where: { categoryId: value.categoryId } });
                        const temp = value;
                        if (categoryNames) {
                            temp.categoryName = categoryNames.name;
                            temp.categorySlug = categoryNames.categorySlug;
                        }
                        else {
                            temp.categoryName = '';
                            temp.categorySlug = '';
                        }
                        return temp;
                    }));
                    const results = Promise.all(category);
                    return results;
                });
            }
            productDetails.productOption = [];
            productDetails.skuName = '';
            productDetails.skuId = productDetails.skuId ? productDetails.skuId : '';
            productDetails.variantName = '';
            productDetails.variantId = '';
            let skuId = undefined;
            const skuValue = yield this.skuService.findOne({ where: { id: productDetails.skuId } });
            if (skuValue) {
                productDetails.price = skuValue.price;
                productDetails.skuName = skuValue.skuName;
                productDetails.skuId = skuValue.id;
                productDetails.outOfStockThreshold = skuValue.outOfStockThreshold;
                productDetails.notifyMinQuantity = skuValue.notifyMinQuantity;
                productDetails.minQuantityAllowedCart = skuValue.minQuantityAllowedCart;
                productDetails.maxQuantityAllowedCart = skuValue.maxQuantityAllowedCart;
                productDetails.enableBackOrders = skuValue.enableBackOrders;
                const orderProductForBackOrder = yield this.orderProductService.listByQueryBuilder(0, 0, [], [
                    { name: 'order.backOrders', op: 'where', value: 1 },
                    { name: 'OrderProduct.skuName', op: 'and', value: `'${skuValue.skuName}'` },
                ], [], [{ tableName: 'OrderProduct.order', aliasName: 'order' }], [], [], false, false);
                const totalbackOrderQuantity = orderProductForBackOrder.reduce((total, item) => {
                    return total + item.quantity;
                }, 0);
                productDetails.availableBackOrderStock = skuValue.backOrderStockLimit - totalbackOrderQuantity;
                if (productDetails.hasStock === 1) {
                    if (skuValue.quantity <= skuValue.outOfStockThreshold) {
                        productDetails.stockStatus = 'outOfStock';
                    }
                    else {
                        productDetails.stockStatus = 'inStock';
                    }
                }
                else {
                    productDetails.stockStatus = 'inStock';
                }
                skuId = skuValue.id;
            }
            if (skuId) {
                const nowDate = new Date();
                const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(productDetail.productId, skuId, todaydate);
                const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(productDetail.productId, skuId, todaydate);
                if (productSpecial) {
                    productDetails.pricerefer = productSpecial.price;
                    productDetails.flag = 1;
                }
                else if (productDiscount) {
                    productDetails.pricerefer = productDiscount.price;
                    productDetails.flag = 0;
                }
                else {
                    productDetails.pricerefer = '';
                    productDetails.flag = '';
                }
                productDetails.productTirePrices = yield this.productTirePriceService.findAll({
                    select: ['id', 'quantity', 'price'],
                    where: { productId: productDetail.productId, skuId },
                });
            }
            else {
                productDetails.pricerefer = '';
                productDetails.flag = '';
                productDetails.productTirePrices = yield this.productTirePriceService.findAll({
                    select: ['id', 'quantity', 'price'],
                    where: { productId: productDetail.productId },
                });
            }
            const vendorProduct = yield this.vendorProductService.findOne({ where: { productId: productDetail.productId, reuse: (0, typeorm_1.IsNull)() }, relations: ['vendor'] });
            if (vendorProduct) {
                const vendor = yield this.vendorService.findOne({ where: { vendorId: vendorProduct.vendorId } });
                const customer = yield this.customerService.findOne({ where: { id: vendor.customerId } });
                productDetails.vendorId = vendor.vendorId;
                productDetails.vendorName = customer.firstName;
                productDetails.vendorCompanyName = vendor.companyName;
                productDetails.vendorPrefixId = vendor.vendorPrefixId;
                productDetails.companyLogo = vendor.companyLogo;
                productDetails.companyLogoPath = vendor.companyLogoPath;
                productDetails.vendorCompanyName = vendor.companyName;
                productDetails.vendorCompanyCity = vendor.companyCity;
                productDetails.vendorDisplayNameUrl = vendor.displayNameUrl;
                productDetails.vendorSlugName = vendor.vendorSlugName;
                productDetails.quotationAvailable = vendorProduct.quotationAvailable;
                productDetails.companyTaxNumber = (_f = vendorProduct.vendor.companyTaxNumber) !== null && _f !== void 0 ? _f : '';
                productDetail.companyPanNumber = (_g = vendorProduct.vendor.companyPanNumber) !== null && _g !== void 0 ? _g : '';
                productDetail.companyCountry = (_h = vendorProduct.vendor.companyCountryId) !== null && _h !== void 0 ? _h : '';
                productDetail.vendorCompanystateId = (_j = vendorProduct.vendor.zoneId) !== null && _j !== void 0 ? _j : '';
                productDetails.vendorCompanyCountry = '';
                if ((_k = vendorProduct.vendor) === null || _k === void 0 ? void 0 : _k.companyCountryId) {
                    const country = yield this.countryService.findOne({ where: { countryId: (_l = vendorProduct.vendor) === null || _l === void 0 ? void 0 : _l.companyCountryId } });
                    productDetails.vendorCompanyCountry = country.name;
                }
            }
            if (request.id) {
                let customerId;
                customerId = request.id;
                const wishStatus = yield this.customerWishlistService.findOne({
                    where: {
                        productId: productDetail.productId,
                        customerId,
                    },
                });
                const orderProduct = yield this.orderProductService.findOne({
                    where: {
                        order: { customerId, paymentStatus: 1 },
                        productId: productDetail.productId,
                        cancelRequestStatus: (0, typeorm_1.Not)(1),
                    },
                    relations: ['order'],
                });
                if (orderProduct) {
                    productDetails.buyed = 1;
                    productDetails.orderProductId = orderProduct.orderProductId;
                }
                else {
                    productDetails.buyed = 0;
                    productDetails.orderProductId = 0;
                }
                if (wishStatus) {
                    productDetails.wishListStatus = 1;
                }
                else {
                    productDetails.wishListStatus = 0;
                }
                const customerDetail = yield this.customerService.findOne({ where: { id: customerId } });
                const customerActivity = new CustomerActivity_1.CustomerActivity();
                customerActivity.customerId = customerId;
                customerActivity.activityId = 2;
                customerActivity.description = 'productviewed';
                customerActivity.productId = productDetail.productId;
                yield this.customerActivityService.create(customerActivity);
                const viewLog = new productViewLog_1.ProductViewLog();
                viewLog.productId = productDetail.productId;
                viewLog.customerId = customerDetail.id;
                viewLog.firstName = customerDetail.firstName;
                viewLog.lastName = customerDetail.lastName;
                viewLog.username = customerDetail.username;
                viewLog.email = customerDetail.email;
                viewLog.mobileNumber = customerDetail.mobileNumber;
                viewLog.address = customerDetail.address;
                yield this.productViewLogService.create(viewLog);
            }
            else {
                productDetails.wishListStatus = 0;
                productDetails.buyed = 0;
            }
            // product video
            productDetails.productVideo = yield this.productVideoService.findOne({
                select: ['id', 'name', 'path', 'type', 'productId'],
                where: { productId: productDetail.productId },
            });
            productDetails.productVideo = Object.assign(Object.assign({}, productDetails.productVideo), { mediaType: 2 });
            const successResponse = {
                status: 1,
                message: 'Successfully got product detail',
                data: productDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Product Details API
    /**
     * @api {get} /api/product-store/order-product/:productslug   Product Detail API
     * @apiGroup Store
     * @apiParam (Request body) {String} categorySlug categorySlug
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data": {
     *              "createdDate": """,
     *              "productId": 1,
     *              "sku": "",
     *              "upc": "",
     *              "hsn": "",
     *              "location": "",
     *              "quantity": 1,
     *              "minimumQuantity": 1,
     *              "subtractStock": 1,
     *              "stockStatusId": 1,
     *              "quotationAvailable": ,
     *              "image": "",
     *              "imagePath": "",
     *              "manufacturerId": 1,
     *              "shipping": "",
     *              "serviceCharges": "",
     *              "taxType": 1,
     *              "taxValue": "",
     *              "price": "",
     *              "priceUpdateFileLogId": "",
     *              "dateAvailable": "",
     *              "sortOrder": 1,
     *              "name": "",
     *              "description": "",
     *              "amount": "",
     *              "keywords": "",
     *              "discount": ""
     *              "deleteFlag": "",
     *              "isFeatured": "",
     *              "todayDeals": "",
     *              "condition": "",
     *              "rating": "",
     *              "wishListStatus": "",
     *              "productSlug": "",
     *              "isActive": 1,
     *              "width": "",
     *              "height": "",
     *              "length": "",
     *              "weight": "",
     *              "hasStock": 1,
     *              "priceType": "",
     *              "isSimplified": 1,
     *              "owner": "",
     *              "isCommon": 1,
     *              "skuId": "",
     *              "hasTirePrice": "",
     *              "outOfStockThreshold": 1,
     *              "notifyMinQuantity": "",
     *              "minQuantityAllowedCart": 1,
     *              "maxQuantityAllowedCart": 10,
     *              "enableBackOrders": 1,
     *              "pincodeBasedDelivery": "",
     *              "attributeKeyword": "",
     *              "settedAsCommonOn": "",
     *              "productHighlights": "",
     *              "productTranslation": [],
     *              "productNameTrans": "",
     *              "productDescriptionTrans": "",
     *              "ratingCount": "",
     *              "reviewCount": "",
     *              "productImage": [{
     *                            "productId": 1,
     *                            "image": "",
     *                            "containerName": "",
     *                            "defaultImage": "",
     *                          }],
     *              "productOriginalImage": [{
     *                      "productId": 1,
     *                      "image": "",
     *                      "containerName": "",
     *                      "defaultImage": ""
     *                  }
     *              ],
     *              "Category": [
     *                  {
     *                      "productId": 1,
     *                      "categoryId": 1,
     *                      "categoryName": "",
     *                      "categorySlug": ""
     *                  }
     *              ],
     *              "productOption": [],
     *              "skuName": "",
     *              "variantName": "",
     *              "variantId": 1,
     *              "stockStatus": 1,
     *              "pricerefer": "",
     *              "flag": "",
     *              "productTirePrices": [],
     *              "buyed": ,
     *              "productVideo": {
     *                  "id": 1,
     *                  "productId": "",
     *                  "name": "",
     *                  "path": "",
     *                  "type": 1
     *               }
     *              }
     * }
     * @apiSampleRequest /api/product-store/productdetail/:productslug
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    orderProductDetail(orderProductId, categorySlug, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            const orderProductExist = yield this.orderProductService.findOne({ where: { orderProductId } });
            const orderExist = yield this.orderService.findOne({ where: { orderId: orderProductExist.orderId, customerId: request.user.id } });
            if (!orderExist) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid Order Product Id !',
                };
                return response.status(200).send(errResponse);
            }
            const productDetail = yield this.productService.findOne({
                where: {
                    productId: orderProductExist.productId,
                },
                relations: ['productTranslation'],
            });
            if (!orderProductExist) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid product',
                };
                return response.status(200).send(errResponse);
            }
            const productTranslation = productDetail.productTranslation.find((productTrans) => productTrans.languageId === request.languageId);
            productDetail.productNameTrans = (_a = productTranslation === null || productTranslation === void 0 ? void 0 : productTranslation.name) !== null && _a !== void 0 ? _a : '';
            productDetail.productDescriptionTrans = (_c = (_b = productTranslation === null || productTranslation === void 0 ? void 0 : productTranslation.description) === null || _b === void 0 ? void 0 : _b.replace(/"/g, `'`)) !== null && _c !== void 0 ? _c : '';
            productDetail.description = (_e = (_d = productDetail.description) === null || _d === void 0 ? void 0 : _d.replace(/"/g, `'`)) !== null && _e !== void 0 ? _e : '';
            const date = new Date();
            if (productDetail.dateAvailable > date) {
                return response.status(200).send({
                    status: 0,
                    message: 'Invalid product',
                });
            }
            const productDetails = (0, class_transformer_1.instanceToPlain)(productDetail);
            if (productDetails.taxType === 2) {
                const tax = yield this.taxService.findOne({ where: { taxId: productDetails.taxValue } });
                if (tax) {
                    productDetails.taxValue = tax.taxPercentage;
                }
                else {
                    productDetails.taxValue = '';
                }
            }
            productDetails.ratingCount = 0;
            productDetails.reviewCount = 'null';
            productDetails.productImage = yield this.productImageService.findAll({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: productDetail.productId,
                },
                order: {
                    sortOrder: 'ASC',
                },
            });
            productDetails.productImage.map((val) => val.mediaType = 1);
            productDetails.productOriginalImage = productDetails.productImage.slice();
            if (categorySlug) {
                const category = yield this.categoryService.findOne({ where: { categorySlug, isActive: 1 } });
                if (category) {
                    const categoryLevels = yield this.categoryPathService.find({
                        select: ['level', 'pathId'],
                        where: { categoryId: category.categoryId },
                        order: { level: 'ASC' },
                    }).then((values) => {
                        const categories = values.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                            const categoryData = yield this.categoryService.findOne({ where: { categoryId: val.pathId } });
                            const tempVal = val;
                            tempVal.categoryName = categoryData ? categoryData.name : '';
                            tempVal.categoryId = categoryData ? categoryData.categoryId : '';
                            tempVal.categorySlug = categoryData ? categoryData.categorySlug : '';
                            tempVal.parentInt = categoryData ? categoryData.parentInt : '';
                            tempVal.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                            return tempVal;
                        }));
                        const results = Promise.all(categories);
                        return results;
                    });
                    productDetails.Category = categoryLevels;
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid category',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            else {
                productDetails.Category = yield this.productToCategoryService.findAll({
                    select: ['categoryId', 'productId'],
                    where: { productId: productDetail.productId },
                }).then((val) => {
                    const category = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryNames = yield this.categoryService.findOne({ where: { categoryId: value.categoryId } });
                        const temp = value;
                        if (categoryNames) {
                            temp.categoryName = categoryNames.name;
                            temp.categorySlug = categoryNames.categorySlug;
                        }
                        else {
                            temp.categoryName = '';
                            temp.categorySlug = '';
                        }
                        return temp;
                    }));
                    const results = Promise.all(category);
                    return results;
                });
            }
            productDetails.productOption = [];
            productDetails.skuName = '';
            productDetails.skuId = productDetails.skuId ? productDetails.skuId : '';
            productDetails.variantName = '';
            productDetails.variantId = '';
            let skuId = undefined;
            const skuValue = yield this.skuService.findOne({ where: { id: productDetails.skuId } });
            if (skuValue) {
                productDetails.price = skuValue.price;
                productDetails.skuName = skuValue.skuName;
                productDetails.skuId = skuValue.id;
                productDetails.outOfStockThreshold = skuValue.outOfStockThreshold;
                productDetails.notifyMinQuantity = skuValue.notifyMinQuantity;
                productDetails.minQuantityAllowedCart = skuValue.minQuantityAllowedCart;
                productDetails.maxQuantityAllowedCart = skuValue.maxQuantityAllowedCart;
                productDetails.enableBackOrders = skuValue.enableBackOrders;
                const orderProductForBackOrder = yield this.orderProductService.listByQueryBuilder(0, 0, [], [
                    { name: 'order.backOrders', op: 'where', value: 1 },
                    { name: 'OrderProduct.skuName', op: 'and', value: `'${skuValue.skuName}'` },
                ], [], [{ tableName: 'OrderProduct.order', aliasName: 'order' }], [], [], false, false);
                const totalbackOrderQuantity = orderProductForBackOrder.reduce((total, item) => {
                    return total + item.quantity;
                }, 0);
                productDetails.availableBackOrderStock = skuValue.backOrderStockLimit - totalbackOrderQuantity;
                if (productDetails.hasStock === 1) {
                    if (skuValue.quantity <= skuValue.outOfStockThreshold) {
                        productDetails.stockStatus = 'outOfStock';
                    }
                    else {
                        productDetails.stockStatus = 'inStock';
                    }
                }
                else {
                    productDetails.stockStatus = 'inStock';
                }
                skuId = skuValue.id;
            }
            if (skuId) {
                const nowDate = new Date();
                const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(productDetail.productId, skuId, todaydate);
                const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(productDetail.productId, skuId, todaydate);
                if (productSpecial) {
                    productDetails.pricerefer = productSpecial.price;
                    productDetails.flag = 1;
                }
                else if (productDiscount) {
                    productDetails.pricerefer = productDiscount.price;
                    productDetails.flag = 0;
                }
                else {
                    productDetails.pricerefer = '';
                    productDetails.flag = '';
                }
                productDetails.productTirePrices = yield this.productTirePriceService.findAll({
                    select: ['id', 'quantity', 'price'],
                    where: { productId: productDetail.productId, skuId },
                });
            }
            else {
                productDetails.pricerefer = '';
                productDetails.flag = '';
                productDetails.productTirePrices = yield this.productTirePriceService.findAll({
                    select: ['id', 'quantity', 'price'],
                    where: { productId: productDetail.productId },
                });
            }
            const vendorProduct = yield this.vendorProductService.findOne({ where: { productId: productDetail.productId, reuse: (0, typeorm_1.IsNull)() }, relations: ['vendor'] });
            if (vendorProduct) {
                const vendor = yield this.vendorService.findOne({ where: { vendorId: vendorProduct.vendorId } });
                const customer = yield this.customerService.findOne({ where: { id: vendor.customerId } });
                productDetails.vendorId = vendor.vendorId;
                productDetails.vendorName = customer.firstName;
                productDetails.vendorCompanyName = vendor.companyName;
                productDetails.vendorPrefixId = vendor.vendorPrefixId;
                productDetails.companyLogo = vendor.companyLogo;
                productDetails.companyLogoPath = vendor.companyLogoPath;
                productDetails.vendorCompanyName = vendor.companyName;
                productDetails.vendorCompanyCity = vendor.companyCity;
                productDetails.vendorDisplayNameUrl = vendor.displayNameUrl;
                productDetails.vendorSlugName = vendor.vendorSlugName;
                productDetails.quotationAvailable = vendorProduct.quotationAvailable;
                productDetails.companyTaxNumber = (_f = vendorProduct.vendor.companyTaxNumber) !== null && _f !== void 0 ? _f : '';
                productDetail.companyPanNumber = (_g = vendorProduct.vendor.companyPanNumber) !== null && _g !== void 0 ? _g : '';
                productDetail.companyCountry = (_h = vendorProduct.vendor.companyCountryId) !== null && _h !== void 0 ? _h : '';
                productDetail.vendorCompanystateId = (_j = vendorProduct.vendor.zoneId) !== null && _j !== void 0 ? _j : '';
                productDetails.vendorCompanyCountry = '';
                if ((_k = vendorProduct.vendor) === null || _k === void 0 ? void 0 : _k.companyCountryId) {
                    const country = yield this.countryService.findOne({ where: { countryId: (_l = vendorProduct.vendor) === null || _l === void 0 ? void 0 : _l.companyCountryId } });
                    productDetails.vendorCompanyCountry = country.name;
                }
            }
            if (request.id) {
                let customerId;
                customerId = request.id;
                const wishStatus = yield this.customerWishlistService.findOne({
                    where: {
                        productId: productDetail.productId,
                        customerId,
                    },
                });
                const orderProduct = yield this.orderProductService.buyedCount(productDetail.productId, customerId);
                if (orderProduct.length > 0) {
                    productDetails.buyed = 1;
                }
                else {
                    productDetails.buyed = 0;
                }
                if (wishStatus) {
                    productDetails.wishListStatus = 1;
                }
                else {
                    productDetails.wishListStatus = 0;
                }
                const customerDetail = yield this.customerService.findOne({ where: { id: customerId } });
                const customerActivity = new CustomerActivity_1.CustomerActivity();
                customerActivity.customerId = customerId;
                customerActivity.activityId = 2;
                customerActivity.description = 'productviewed';
                customerActivity.productId = productDetail.productId;
                yield this.customerActivityService.create(customerActivity);
                const viewLog = new productViewLog_1.ProductViewLog();
                viewLog.productId = productDetail.productId;
                viewLog.customerId = customerDetail.id;
                viewLog.firstName = customerDetail.firstName;
                viewLog.lastName = customerDetail.lastName;
                viewLog.username = customerDetail.username;
                viewLog.email = customerDetail.email;
                viewLog.mobileNumber = customerDetail.mobileNumber;
                viewLog.address = customerDetail.address;
                yield this.productViewLogService.create(viewLog);
            }
            else {
                productDetails.wishListStatus = 0;
                productDetails.buyed = 0;
            }
            // product video
            productDetails.productVideo = yield this.productVideoService.findOne({
                select: ['id', 'name', 'path', 'type', 'productId'],
                where: { productId: productDetail.productId },
            });
            productDetails.productVideo = Object.assign(Object.assign({}, productDetails.productVideo), { mediaType: 2 });
            const successResponse = {
                status: 1,
                message: 'Successfully got product detail',
                data: productDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Get Category API
    /**
     * @api {get} /api/product-store/Category Get Category API
     * @apiGroup Store
     * @apiParam (Request body) {Number} CategoryId categoryId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "successfully got the category.",
     *      "data":"{
     *              "categoryId": 1,
     *              "name": "",
     *              "parentInt": 1,
     *              "sortOrder": "",
     *              "categorySlug": "",
     *              "level": "",
     *              "pathId": 1
     *  }"
     * }
     * @apiSampleRequest /api/product-store/Category
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    getCategory(CategoryId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['categoryId', 'name', 'parentInt', 'sortOrder', 'categorySlug'];
            const search = [];
            const WhereConditions = [{
                    name: 'categoryId',
                    value: CategoryId,
                }];
            const category = yield this.categoryService.list(0, 0, select, search, WhereConditions, [], 0, 0);
            const promise = category.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = result;
                const categoryLevel = yield this.categoryPathService.find({
                    select: ['level', 'pathId'],
                    where: { categoryId: result.categoryId },
                    order: { level: 'ASC' },
                }).then((values) => {
                    const categories = values.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryNames = yield this.categoryService.findOne({ where: { categoryId: val.pathId } });
                        const tempVal = val;
                        tempVal.categoryName = categoryNames.name;
                        return tempVal;
                    }));
                    const results = Promise.all(categories);
                    return results;
                });
                temp.levels = categoryLevel;
                return temp;
            }));
            const value = yield Promise.all(promise);
            if (category) {
                const successResponse = {
                    status: 1,
                    message: 'successfully got the category',
                    data: value,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Product Compare API
    /**
     * @api {get} /api/product-store/product-compare Product Compare API
     * @apiGroup Store
     * @apiParam (Request body) {String} productId productId
     * @apiParam (Request body) {String} data data
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Product Compared",
     *      "status": "1",
     *      "data": {
     *              "createdBy": "",
     *              "createdDate": "",
     *              "modifiedBy": "",
     *              "modifiedDate": """,
     *              "productId": 1,
     *              "sku": "",
     *              "upc": "",
     *              "hsn": "",
     *              "location": "",
     *              "quantity": 1,
     *              "minimumQuantity": "",
     *              "subtractStock": "",
     *              "stockStatusId": "",
     *              "quotationAvailable": "",
     *              "image": "",
     *              "imagePath": ,
     *              "manufacturerId": "",
     *              "shipping": "",
     *              "serviceCharges": "",
     *              "taxType": "",
     *              "taxValue": "",
     *              "price": "",
     *              "priceUpdateFileLogId": "",
     *              "dateAvailable": "",
     *              "sortOrder": "",
     *              "name": "",
     *              "description": "",
     *              "amount": "",
     *              "keywords": "",
     *              "discount": "",
     *              "deleteFlag": "",
     *              "isFeatured": "",
     *              "todayDeals": "",
     *              "condition": "",
     *              "rating": "",
     *              "wishListStatus": "",
     *              "productSlug": "",
     *              "isActive": ,
     *              "width": "",
     *              "height": "",
     *              "length": "",
     *              "weight": "",
     *              "hasStock": "",
     *              "priceType": "",
     *              "isSimplified": "",
     *              "owner": "",
     *              "isCommon": "",
     *              "skuId": "",
     *              "hasTirePrice": "",
     *              "outOfStockThreshold": "",
     *              "notifyMinQuantity": "",
     *              "minQuantityAllowedCart": "",
     *              "maxQuantityAllowedCart": "",
     *              "enableBackOrders": "",
     *              "pincodeBasedDelivery": "",
     *              "attributeKeyword": "",
     *              "settedAsCommonOn": "",
     *              "productHighlights": "",
     *              "productTranslation": [],
     *              "productNameTrans": "",
     *              "productDescriptionTrans": "",
     *              "ratingCount": "",
     *              "reviewCount": "",
     *              "skuName": "",
     *              "pricerefer": "",
     *              "flag": "",
     *              "productImage": {
     *                  "createdBy": "",
     *                  "createdDate": "",
     *                  "modifiedBy": "",
     *                  "modifiedDate": "",
     *                  "productImageId": "",
     *                  "productId": "",
     *                  "image": "",
     *                  "containerName": "",
     *                  "sortOrder": "",
     *                  "defaultImage": "",
     *                  "isActive":""
     *              },
     *       "stockStatus": ""
     *   },
     * }
     * @apiSampleRequest /api/product-store/product-compare
     * @apiErrorExample {json} product compare error
     * HTTP/1.1 500 Internal Server Error
     */
    productCompare(productId, data, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
            const productid = productId.split(',');
            if (productid.length === 0) {
                return response.status(200).send({
                    status: 1,
                    data: [],
                });
            }
            if (productid.length === 1) {
                if (data === '0') {
                    const Response = {
                        status: 1,
                        message: 'Product added to compare',
                    };
                    return response.status(200).send(Response);
                }
                else {
                    const Detail = [];
                    const List = yield this.productService.findOne({ where: { productId: productid, isActive: 1 }, relations: ['productTranslation'] });
                    if (!List) {
                        return response.status(200).send({
                            status: 0,
                            message: `Invalid product`,
                        });
                    }
                    const defaultValue = yield this.productImageService.findOne({
                        where: {
                            productId: List.productId,
                            defaultImage: 1,
                        },
                    });
                    const temp = List;
                    const id = productid[0];
                    const vendor = yield this.vendorProductService.findOne({ where: { productId: id }, relations: ['vendor', 'vendor.customer'] });
                    const vendorData = {
                        vendorId: (_a = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _a === void 0 ? void 0 : _a.vendorId,
                        vendorName: (_c = (_b = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _b === void 0 ? void 0 : _b.customer) === null || _c === void 0 ? void 0 : _c.firstName,
                        vendorCompanyName: (_d = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _d === void 0 ? void 0 : _d.companyName,
                        vendorSlugName: (_e = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _e === void 0 ? void 0 : _e.vendorSlugName,
                        displayNameUrl: (_f = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _f === void 0 ? void 0 : _f.displayNameUrl,
                        companyLogo: (_g = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _g === void 0 ? void 0 : _g.companyLogo,
                        companyLogoPath: (_h = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _h === void 0 ? void 0 : _h.companyLogoPath,
                    };
                    temp.vendorDetails = vendorData;
                    const productTranslation = List.productTranslation.find((productTrans) => productTrans.languageId === request.languageId);
                    temp.productNameTrans = (_j = productTranslation === null || productTranslation === void 0 ? void 0 : productTranslation.name) !== null && _j !== void 0 ? _j : '';
                    temp.productDescriptionTrans = (_l = (_k = productTranslation === null || productTranslation === void 0 ? void 0 : productTranslation.description) === null || _k === void 0 ? void 0 : _k.replace(/"/g, `'`)) !== null && _l !== void 0 ? _l : '';
                    temp.description = (_o = (_m = List.description) === null || _m === void 0 ? void 0 : _m.replace(/"/g, `'`)) !== null && _o !== void 0 ? _o : '';
                    temp.ratingCount = 0;
                    temp.reviewCount = 'null';
                    temp.skuName = '';
                    let skuValue = undefined;
                    let skuId = undefined;
                    skuValue = yield this.skuService.findOne({ where: { id: List.skuId } });
                    if (skuValue) {
                        temp.price = skuValue.price;
                        temp.skuName = skuValue.skuName;
                        skuId = skuValue.id;
                    }
                    if (skuId) {
                        const nowDate = new Date();
                        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                        const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(List.productId, skuId, todaydate);
                        const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(List.productId, skuId, todaydate);
                        if (productSpecial) {
                            temp.pricerefer = productSpecial.price;
                            temp.flag = 1;
                        }
                        else if (productDiscount) {
                            temp.pricerefer = productDiscount.price;
                            temp.flag = 0;
                        }
                        else {
                            temp.pricerefer = '';
                            temp.flag = '';
                        }
                    }
                    else {
                        temp.pricerefer = '';
                        temp.flag = '';
                    }
                    if (List.taxType === 2) {
                        const tax = yield this.taxService.findOne({ where: { taxId: List.taxValue } });
                        if (tax) {
                            temp.taxValue = tax.taxPercentage;
                        }
                        else {
                            temp.taxValue = '';
                        }
                    }
                    temp.productImage = defaultValue;
                    if (List.hasStock === 1) {
                        if (List.quantity <= List.outOfStockThreshold) {
                            temp.stockStatus = 'outOfStock';
                        }
                        else {
                            temp.stockStatus = 'inStock';
                        }
                    }
                    else {
                        temp.stockStatus = 'inStock';
                    }
                    Detail.push(temp);
                    const Response = {
                        status: 1,
                        message: 'Product Compared Successfully',
                        data: Detail,
                    };
                    return response.status(200).send(Response);
                }
            }
            else {
                if (data === '0') {
                    const categoryDataDetail = [];
                    // product find the which category
                    for (const id of productid) {
                        const categoryId = yield this.productToCategoryService.findAll({ where: { productId: id } });
                        const categoryDataValue = categoryId.map((item) => {
                            return item.categoryId;
                        });
                        categoryDataDetail.push(categoryDataValue);
                    }
                    let categoryData;
                    if (categoryDataDetail.length === 2) {
                        categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    }
                    else {
                        const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                        categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                    }
                    if (categoryData.length === 0) {
                        const errorResponse = {
                            status: 1,
                            message: 'Please Choose Products from Same Category',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    const successResponse = {
                        status: 1,
                        message: 'Product Compared Successfully',
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const productDataDetail = [];
                    const categoryDataDetail = [];
                    // product find the which category
                    for (const id of productid) {
                        const categoryId = yield this.productToCategoryService.findAll({ where: { productId: id } });
                        const categoryDataValue = categoryId.map((item) => {
                            return item.categoryId;
                        });
                        categoryDataDetail.push(categoryDataValue);
                    }
                    let categoryData;
                    if (categoryDataDetail.length === 2) {
                        categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    }
                    else {
                        const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                        categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                    }
                    if (categoryData.length === 0) {
                        const errorResponse = {
                            status: 1,
                            message: 'Please Choose Products from Same Category',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    let productListData;
                    // find the product to compare
                    for (const id of productid) {
                        productListData = yield this.productService.findOne({ where: { productId: id }, relations: ['productTranslation'] });
                        const defaultValue = yield this.productImageService.findOne({
                            where: {
                                productId: productListData.productId,
                                defaultImage: 1,
                            },
                        });
                        const temp = productListData;
                        const vendor = yield this.vendorProductService.findOne({ where: { productId: id }, relations: ['vendor', 'vendor.customer'] });
                        const vendorData = {
                            vendorId: (_p = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _p === void 0 ? void 0 : _p.vendorId,
                            vendorName: (_r = (_q = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _q === void 0 ? void 0 : _q.customer) === null || _r === void 0 ? void 0 : _r.firstName,
                            vendorCompanyName: (_s = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _s === void 0 ? void 0 : _s.companyName,
                            vendorSlugName: (_t = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _t === void 0 ? void 0 : _t.vendorSlugName,
                            displayNameUrl: (_u = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _u === void 0 ? void 0 : _u.displayNameUrl,
                            companyLogo: (_v = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _v === void 0 ? void 0 : _v.companyLogo,
                            companyLogoPath: (_w = vendor === null || vendor === void 0 ? void 0 : vendor.vendor) === null || _w === void 0 ? void 0 : _w.companyLogoPath,
                        };
                        temp.vendorDetails = vendorData;
                        const productTranslation = productListData.productTranslation.find((productTrans) => productTrans.languageId === request.languageId);
                        temp.productNameTrans = (_x = productTranslation === null || productTranslation === void 0 ? void 0 : productTranslation.name) !== null && _x !== void 0 ? _x : '';
                        temp.productDescriptionTrans = (_z = (_y = productTranslation === null || productTranslation === void 0 ? void 0 : productTranslation.description) === null || _y === void 0 ? void 0 : _y.replace(/"/g, `'`)) !== null && _z !== void 0 ? _z : '';
                        temp.description = (_1 = (_0 = productListData.description) === null || _0 === void 0 ? void 0 : _0.replace(/"/g, `'`)) !== null && _1 !== void 0 ? _1 : '';
                        temp.ratingCount = 0;
                        temp.reviewCount = 'null';
                        temp.skuName = '';
                        let skuValue = undefined;
                        let skuId = undefined;
                        skuValue = yield this.skuService.findOne({ where: { id: productListData.skuId } });
                        if (skuValue) {
                            temp.price = skuValue.price;
                            temp.skuName = skuValue.skuName;
                            skuId = skuValue.id;
                            temp.minQuantityAllowedCart = skuValue.minQuantityAllowedCart;
                            temp.maxQuantityAllowedCart = skuValue.maxQuantityAllowedCart;
                        }
                        if (skuId) {
                            const nowDate = new Date();
                            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                            const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(productListData.productId, skuId, todaydate);
                            const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(productListData.productId, skuId, todaydate);
                            if (productSpecial) {
                                temp.pricerefer = productSpecial.price;
                                temp.flag = 1;
                            }
                            else if (productDiscount) {
                                temp.pricerefer = productDiscount.price;
                                temp.flag = 0;
                            }
                            else {
                                temp.pricerefer = '';
                                temp.flag = '';
                            }
                        }
                        else {
                            temp.pricerefer = '';
                            temp.flag = '';
                        }
                        if (productListData.taxType === 2) {
                            const tax = yield this.taxService.findOne({ where: { taxId: productListData.taxValue } });
                            if (tax) {
                                temp.taxValue = tax.taxPercentage;
                            }
                            else {
                                temp.taxValue = '';
                            }
                        }
                        temp.productImage = defaultValue;
                        if (productListData.hasStock === 1) {
                            if (productListData.quantity <= productListData.outOfStockThreshold) {
                                temp.stockStatus = 'outOfStock';
                            }
                            else {
                                temp.stockStatus = 'inStock';
                            }
                        }
                        else {
                            temp.stockStatus = 'inStock';
                        }
                        productDataDetail.push(temp);
                    }
                    const successResponse = {
                        status: 1,
                        message: 'Product Compared Successfully',
                        data: productDataDetail,
                    };
                    return response.status(200).send(successResponse);
                }
            }
        });
    }
    // Product Search list Api
    /**
     * @api {get} /api/product-store/product-search-list Product Search List API
     * @apiGroup Store
     * @apiParam (Request body) {String} keyword Product Name
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":{
     *              "productId": ,
     *              "sku": "",
     *              "name": "",
     *              "quantity": "",
     *              "price": "",
     *              "productSlug": "",
     *              "isActive": "",
     *              "productImage": {
     *                  "createdBy": "",
     *                  "createdDate": "",
     *                  "modifiedBy": "",
     *                  "modifiedDate": "",
     *                  "productImageId": "",
     *                  "productId": ,
     *                  "image": "",
     *                  "containerName": "",
     *                  "sortOrder": "",
     *                  "defaultImage": "",
     *                  "isActive":""
     *              },
     *              "categoryName": {
     *                  "categoryId": "",
     *                  "name": "",
     *                  "categorySlug": "",
     *                  "isActive": ""
     *              }
     *  }
     * }
     * @apiSampleRequest /api/product-store/product-search-list
     * @apiErrorExample {json} productSearchList error
     * HTTP/1.1 500 Internal Server Error
     */
    productSearchList(limit, offset, keyword, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Product.productId',
                'Product.sku',
                'Product.name',
                'Product.quantity',
                'Product.price',
                'Product.productSlug',
                'Product.isActive',
                'productToCategory',
                'category',
            ];
            const relations = [];
            relations.push({
                tableName: 'Product.vendorProducts',
                op: 'left',
                aliasName: 'vendorProducts',
            }, {
                tableName: 'Product.productToCategory',
                op: 'left',
                aliasName: 'productToCategory',
            }, {
                tableName: 'productToCategory.category',
                op: 'left',
                aliasName: 'category',
            }, {
                tableName: 'vendorProducts.vendor',
                op: 'leftCond',
                cond: 'vendor.approvalFlag = 1',
                aliasName: 'vendor',
            }, {
                tableName: 'vendor.customer',
                op: 'leftCond',
                cond: 'vendor.isActive = 1',
                aliasName: 'customer',
            });
            const currentDate = moment().format('YYYY-MM-DD');
            const whereConditions = [];
            whereConditions.push({
                name: 'vendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            }, {
                name: '( customer.id IS NOT NULL',
                op: 'rawnumber',
                sign: 'OR',
                value: `vendorProducts.vendorId IS NULL )`,
            }, {
                name: 'Product.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'Product.isVisible',
                op: 'and',
                value: 1,
            }, {
                name: 'Product.dateAvailable',
                op: 'raw',
                sign: '<=',
                value: currentDate.toString(),
            }, {
                name: 'category.industryId',
                op: 'and',
                value: request.store.industryId,
            });
            // whereConditions.push();
            const searchConditions = [];
            if (keyword !== '' && keyword !== undefined) {
                searchConditions.push({
                    name: ['Product.name'],
                    value: keyword,
                });
            }
            const productSearchList = yield this.productService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], [], false, false);
            const productList = productSearchList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a;
                const temp = Object.assign({}, value);
                const defaultValue = yield this.productImageService.findOne({
                    where: {
                        productId: value.productId,
                        defaultImage: 1,
                    },
                });
                temp.productImage = defaultValue;
                temp.categoryName = (_a = value.productToCategory[0].category) !== null && _a !== void 0 ? _a : '';
                temp.productToCategory = undefined;
                return temp;
            }));
            const results = yield Promise.all(productList);
            if (productSearchList) {
                const successReponse = {
                    status: 1,
                    message: 'Successfully got a product search list',
                    data: results,
                };
                return response.status(200).send(successReponse);
            }
        });
    }
};
exports.StoreProductController = StoreProductController;
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.Get)('/productdetail/:productslug'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('productslug')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('categorySlug')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductController.prototype, "productDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.Get)('/product/detail/:skuName'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('skuName')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('categorySlug')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductController.prototype, "productDetailWithSku", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.Get)('/order-product/:orderProductId'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('orderProductId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('categorySlug')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductController.prototype, "orderProductDetail", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/Category'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('CategoryId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductController.prototype, "getCategory", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-compare'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('data')),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductController.prototype, "productCompare", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/product-search-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('keyword')),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreProductController.prototype, "productSearchList", null);
exports.StoreProductController = StoreProductController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.UseBefore)(IndustryValidationMiddleware_1.IndustryValidationMiddleware),
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    (0, routing_controllers_1.JsonController)('/product-store'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        ProductToCategoryService_1.ProductToCategoryService,
        CategoryService_1.CategoryService,
        ProductImageService_1.ProductImageService,
        CustomerService_1.CustomerService,
        ProductViewLogService_1.ProductViewLogService,
        CustomerActivityService_1.CustomerActivityService,
        TaxService_1.TaxService,
        OrderProductService_1.OrderProductService,
        ProductTirePriceService_1.ProductTirePriceService,
        SkuService_1.SkuService,
        ProductDiscountService_1.ProductDiscountService,
        ProductSpecialService_1.ProductSpecialService,
        VendorService_1.VendorService,
        VendorProductService_1.VendorProductService,
        CategoryPathService_1.CategoryPathService,
        CustomerWishlistService_1.CustomerWishlistService,
        ProductVideoService_1.ProductVideoService,
        CountryService_1.CountryService,
        OrderService_1.OrderService])
], StoreProductController);
//# sourceMappingURL=ProductController.js.map