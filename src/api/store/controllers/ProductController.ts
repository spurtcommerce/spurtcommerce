/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, QueryParam, JsonController, Res, Req, Param, UseBefore } from 'routing-controllers';
import { instanceToPlain } from 'class-transformer';
import { ProductToCategoryService } from '../../core/services/ProductToCategoryService';
import { ProductService } from '../../core/services/ProductService';
import { CategoryService } from '../../core/services/CategoryService';
import { ProductImageService } from '../../core/services/ProductImageService';
import { CustomerActivityService } from '../../core/services/CustomerActivityService';
import { ProductViewLog } from '../../core/models/productViewLog';
import { CustomerActivity } from '../../core/models/CustomerActivity';
import { ProductViewLogService } from '../../core/services/ProductViewLogService';
import { CustomerService } from '../../core/services/CustomerService';
import { ProductDiscountService } from '../../core/services/ProductDiscountService';
import { ProductSpecialService } from '../../core/services/ProductSpecialService';
import { CategoryPathService } from '../../core/services/CategoryPathService';
import { CustomerWishlistService } from '../../core/services/CustomerWishlistService';
import { VendorService } from '../../core/services/VendorService';
import { VendorProductService } from '../../core/services/VendorProductService';
import { VendorTaxService } from '../../core/services/VendorTaxService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { ProductTirePriceService } from '../../core/services/ProductTirePriceService';
import { SkuService } from '../../core/services/SkuService';
import { ProductVideoService } from '../../core/services/ProductVideoService';
import { VendorSettingsService } from '../../core/services/VendorSettingsService';
import moment = require('moment');
import { CheckCustomerMiddleware, CheckTokenMiddleware } from '../../core/middlewares/checkTokenMiddleware';
import { IsNull } from 'typeorm';
import { TranslationMiddleware } from '../../../api/core/middlewares/TranslationMiddleware';
import { OrderService } from '../../core/services/OrderService';
import { TenantValidationMiddleware } from '../../../../src/api/core/middlewares/TenantValidationMiddleware';
import { VendorCountryService } from '../../core/services/VendorCountryService';
import { Service } from 'typedi';

@Service()
@UseBefore(TranslationMiddleware)
@UseBefore(TenantValidationMiddleware)
@JsonController('/product-store')
export class StoreProductController {
    constructor(
        private productService: ProductService,
        private productToCategoryService: ProductToCategoryService,
        private categoryService: CategoryService,
        private productImageService: ProductImageService,
        private customerService: CustomerService,
        private productViewLogService: ProductViewLogService,
        private customerActivityService: CustomerActivityService,
        private vendorTaxService: VendorTaxService,
        private orderProductService: OrderProductService,
        private productTirePriceService: ProductTirePriceService,
        private skuService: SkuService,
        private productDiscountService: ProductDiscountService,
        private productSpecialService: ProductSpecialService,
        private vendorService: VendorService,
        private vendorProductService: VendorProductService,
        private categoryPathService: CategoryPathService,
        private customerWishlistService: CustomerWishlistService,
        private productVideoService: ProductVideoService,
        private orderService: OrderService,
        private vendorCountryService: VendorCountryService,
        private vendorSettingsService: VendorSettingsService
    ) {
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
    @UseBefore(CheckTokenMiddleware)
    @Get('/productdetail/:productslug')
    public async productDetail(@Param('productslug') productslug: string, @QueryParam('categorySlug') categorySlug: string, @Req() request: any, @Res() response: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
            where: {
                productSlug: productslug,
                isActive: 1,
                vendorProducts: {
                    vendorId: request.tenantId,
                },
            },
            relations: ['vendorProducts', 'productTranslation'],
        });
        if (!productDetail) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid product',
            };
            return response.status(200).send(errResponse);
        }

        productDetail.vendorProducts = undefined;

        const productTranslation = productDetail.productTranslation.find((productTrans) => productTrans.languageId === request.languageId);

        productDetail.productNameTrans = productTranslation?.name ?? '';
        productDetail.productDescriptionTrans = productTranslation?.description?.replace(/"/g, `'`) ?? '';

        productDetail.description = productDetail.description?.replace(/"/g, `'`) ?? '';

        const date = new Date();
        if (productDetail.dateAvailable > date) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid product',
            });
        }
        const productDetails: any = instanceToPlain(productDetail);
        productDetails.ratingCount = 0;
        productDetails.reviewCount = 'null';
        productDetails.productImage = await this.productImageService.findAll({
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
            const category = await this.categoryService.findOne({ where: { categorySlug, isActive: 1 } });
            if (category) {
                const categoryLevels: any = await this.categoryPathService.find({
                    select: ['level', 'pathId'],
                    where: { categoryId: category.categoryId },
                    order: { level: 'ASC' },
                }).then((values) => {
                    const categories = values.map(async (val: any) => {
                        const categoryData = await this.categoryService.findOne({ where: { categoryId: val.pathId } });
                        const tempVal: any = val;
                        tempVal.categoryName = categoryData ? categoryData.name : '';
                        tempVal.categoryId = categoryData ? categoryData.categoryId : '';
                        tempVal.categorySlug = categoryData ? categoryData.categorySlug : '';
                        tempVal.parentInt = categoryData ? categoryData.parentInt : '';
                        tempVal.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                        return tempVal;
                    });
                    const results = Promise.all(categories);
                    return results;
                });
                productDetails.Category = categoryLevels;
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid category',
                };
                return response.status(400).send(errorResponse);
            }
        } else {
            productDetails.Category = await this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: { productId: productDetail.productId },
            }).then((val) => {
                const category = val.map(async (value: any) => {
                    const categoryNames = await this.categoryService.findOne({ where: { categoryId: value.categoryId } });
                    const temp: any = value;
                    if (categoryNames) {
                        temp.categoryName = categoryNames.name;
                        temp.categorySlug = categoryNames.categorySlug;
                    } else {
                        temp.categoryName = '';
                        temp.categorySlug = '';
                    }
                    return temp;
                });
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
        const skuValue = await this.skuService.findOne({ where: { id: productDetails.skuId } });
        if (skuValue) {
            productDetails.price = skuValue.price;
            productDetails.skuName = skuValue.skuName;
            productDetails.skuId = skuValue.id;
            productDetails.outOfStockThreshold = skuValue.outOfStockThreshold;
            productDetails.notifyMinQuantity = skuValue.notifyMinQuantity;
            productDetails.minQuantityAllowedCart = skuValue.minQuantityAllowedCart;
            productDetails.maxQuantityAllowedCart = skuValue.maxQuantityAllowedCart;
            productDetails.enableBackOrders = skuValue.enableBackOrders;
            const orderProductForBackOrder = await this.orderProductService.listByQueryBuilder(
                0,
                0,
                [],
                [
                    { name: 'order.backOrders', op: 'where', value: 1 },
                    { name: 'OrderProduct.skuName', op: 'and', value: skuValue.skuName },
                ],
                [],
                [{ tableName: 'OrderProduct.order', aliasName: 'order' }],
                [],
                [],
                false,
                false
            );
            const totalbackOrderQuantity = orderProductForBackOrder.reduce((total, item) => {
                return total + item.quantity;
            }, 0);
            productDetails.availableBackOrderStock = skuValue.backOrderStockLimit - totalbackOrderQuantity;
            if (productDetails.hasStock === 1) {
                if (skuValue.quantity <= skuValue.outOfStockThreshold) {
                    productDetails.stockStatus = 'outOfStock';
                } else {
                    productDetails.stockStatus = 'inStock';
                }
            } else {
                productDetails.stockStatus = 'inStock';
            }
            skuId = skuValue.id;
        }
        if (skuId) {
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(productDetail.productId, skuId, todaydate);
            const productDiscount = await this.productDiscountService.findDiscountPricewithSku(productDetail.productId, skuId, todaydate);
            if (productSpecial) {
                productDetails.pricerefer = productSpecial.price;
                productDetails.flag = 1;
            } else if (productDiscount) {
                productDetails.pricerefer = productDiscount.price;
                productDetails.flag = 0;
            } else {
                productDetails.pricerefer = '';
                productDetails.flag = '';
            }
            productDetails.productTirePrices = await this.productTirePriceService.findAll({
                select: ['id', 'quantity', 'price'],
                where: { productId: productDetail.productId, skuId },
            });
        } else {
            productDetails.pricerefer = '';
            productDetails.flag = '';
            productDetails.productTirePrices = await this.productTirePriceService.findAll({
                select: ['id', 'quantity', 'price'],
                where: { productId: productDetail.productId },
            });
        }

        const vendorProduct = await this.vendorProductService.findOne({ where: { productId: productDetail.productId, reuse: IsNull() }, relations: ['vendor'] });
        if (vendorProduct) {
            const vendor = await this.vendorService.findOne({ where: { vendorId: vendorProduct.vendorId } });
            const customer = await this.customerService.findOne({ where: { id: vendor.customerId } });
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
            productDetails.companyTaxNumber = vendorProduct.vendor.companyTaxNumber ?? '';
            productDetail.companyPanNumber = vendorProduct.vendor.companyPanNumber ?? '';
            productDetail.companyCountry = vendorProduct.vendor.companyCountryId ?? '';
            productDetail.vendorCompanystateId = vendorProduct.vendor.zoneId ?? '';
            productDetails.vendorCompanyCountry = '';
            if (vendorProduct.vendor?.companyCountryId) {
                const vendorCountry = await this.vendorCountryService.findOne({ where: { id: vendorProduct.vendor?.companyCountryId }, relations: ['country'] });
                productDetails.vendorCompanyCountry = vendorCountry?.country?.name;
            }
        }
        if (request.id) {
            let customerId;
            customerId = request.id;
            const wishStatus = await this.customerWishlistService.findOne({
                where: {
                    productId: productDetail.productId,
                    customerId,
                },
            });
            const orderProduct = await this.orderProductService.findOne({ where: { order: { customerId }, productId: productDetail.productId }, relations: ['order'] });
            if (orderProduct) {
                productDetails.buyed = 1;
                productDetails.orderProductId = orderProduct.orderProductId;
            } else {
                productDetails.buyed = 0;
                productDetails.orderProductId = 0;
            }
            if (wishStatus) {
                productDetails.wishListStatus = 1;
            } else {
                productDetails.wishListStatus = 0;
            }
            const customerDetail = await this.customerService.findOne({ where: { id: customerId } });
            const customerActivity = new CustomerActivity();
            customerActivity.customerId = customerId;
            customerActivity.activityId = 2;
            customerActivity.description = 'productviewed';
            customerActivity.productId = productDetail.productId;
            customerActivity.customerUserId = request.user.id;
            await this.customerActivityService.create(customerActivity);
            const viewLog: any = new ProductViewLog();
            viewLog.productId = productDetail.productId;
            viewLog.customerId = customerDetail.id;
            viewLog.firstName = customerDetail.firstName;
            viewLog.lastName = customerDetail.lastName;
            viewLog.username = customerDetail.username;
            viewLog.email = customerDetail.email;
            viewLog.mobileNumber = customerDetail.mobileNumber;
            viewLog.address = customerDetail.address;
            await this.productViewLogService.create(viewLog);
        } else {
            productDetails.wishListStatus = 0;
            productDetails.buyed = 0;
        }
        // product video
        productDetails.productVideo = await this.productVideoService.findOne({
            select: ['id', 'name', 'path', 'type', 'productId'],
            where: { productId: productDetail.productId },
        });
        productDetails.productVideo = { ...productDetails.productVideo, mediaType: 2 };
        const successResponse: any = {
            status: 1,
            message: 'Successfully got product detail',
            data: productDetails,
        };
        return response.status(200).send(successResponse);
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
    @UseBefore(CheckCustomerMiddleware)
    @Get('/order-product/:orderProductId')
    public async orderProductDetail(@Param('orderProductId') orderProductId: string, @QueryParam('categorySlug') categorySlug: string, @Req() request: any, @Res() response: any): Promise<any> {

        const orderProductExist = await this.orderProductService.findOne({ where: { orderProductId } });

        const orderExist = await this.orderService.findOne({ orderId: orderProductExist.orderId, customerId: request.user.customerId });

        if (!orderExist) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid Order Product Id !',
            };
            return response.status(200).send(errResponse);
        }

        const productDetail: any = await this.productService.findOne({
            where: {
                productId: orderProductExist.productId,
            },
            relations: ['productTranslation'],
        });

        if (!orderProductExist) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid product',
            };
            return response.status(200).send(errResponse);
        }

        const productTranslation = productDetail.productTranslation.find((productTrans) => productTrans.languageId === request.languageId);

        productDetail.productNameTrans = productTranslation?.name ?? '';
        productDetail.productDescriptionTrans = productTranslation?.description?.replace(/"/g, `'`) ?? '';

        productDetail.description = productDetail.description?.replace(/"/g, `'`) ?? '';

        const date = new Date();
        if (productDetail.dateAvailable > date) {
            return response.status(200).send({
                status: 0,
                message: 'Invalid product',
            });
        }
        const productDetails: any = instanceToPlain(productDetail);
        if (productDetails.taxType === 2) {
            const vendorTax = await this.vendorTaxService.findOne({ where: { id: productDetails.taxValue }, relations: ['tax'] });
            if (vendorTax) {
                productDetails.taxValue = vendorTax.tax?.taxPercentage;
            } else {
                productDetails.taxValue = '';
            }
        }
        productDetails.ratingCount = 0;
        productDetails.reviewCount = 'null';
        productDetails.productImage = await this.productImageService.findAll({
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
            const category = await this.categoryService.findOne({ categorySlug, isActive: 1 });
            if (category) {
                const categoryLevels: any = await this.categoryPathService.find({
                    select: ['level', 'pathId'],
                    where: { categoryId: category.categoryId },
                    order: { level: 'ASC' },
                }).then((values) => {
                    const categories = values.map(async (val: any) => {
                        const categoryData = await this.categoryService.findOne({ categoryId: val.pathId });
                        const tempVal: any = val;
                        tempVal.categoryName = categoryData ? categoryData.name : '';
                        tempVal.categoryId = categoryData ? categoryData.categoryId : '';
                        tempVal.categorySlug = categoryData ? categoryData.categorySlug : '';
                        tempVal.parentInt = categoryData ? categoryData.parentInt : '';
                        tempVal.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                        return tempVal;
                    });
                    const results = Promise.all(categories);
                    return results;
                });
                productDetails.Category = categoryLevels;
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid category',
                };
                return response.status(400).send(errorResponse);
            }
        } else {
            productDetails.Category = await this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: { productId: productDetail.productId },
            }).then((val) => {
                const category = val.map(async (value: any) => {
                    const categoryNames = await this.categoryService.findOne({ categoryId: value.categoryId });
                    const temp: any = value;
                    if (categoryNames) {
                        temp.categoryName = categoryNames.name;
                        temp.categorySlug = categoryNames.categorySlug;
                    } else {
                        temp.categoryName = '';
                        temp.categorySlug = '';
                    }
                    return temp;
                });
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
        const skuValue = await this.skuService.findOne({ where: { id: productDetails.skuId } });
        if (skuValue) {
            productDetails.price = skuValue.price;
            productDetails.skuName = skuValue.skuName;
            productDetails.skuId = skuValue.id;
            productDetails.outOfStockThreshold = skuValue.outOfStockThreshold;
            productDetails.notifyMinQuantity = skuValue.notifyMinQuantity;
            productDetails.minQuantityAllowedCart = skuValue.minQuantityAllowedCart;
            productDetails.maxQuantityAllowedCart = skuValue.maxQuantityAllowedCart;
            productDetails.enableBackOrders = skuValue.enableBackOrders;
            const orderProductForBackOrder = await this.orderProductService.listByQueryBuilder(
                0,
                0,
                [],
                [
                    { name: 'order.backOrders', op: 'where', value: 1 },
                    { name: 'OrderProduct.skuName', op: 'and', value: skuValue.skuName },
                ],
                [],
                [{ tableName: 'OrderProduct.order', aliasName: 'order' }],
                [],
                [],
                false,
                false
            );
            const totalbackOrderQuantity = orderProductForBackOrder.reduce((total, item) => {
                return total + item.quantity;
            }, 0);
            productDetails.availableBackOrderStock = skuValue.backOrderStockLimit - totalbackOrderQuantity;
            if (productDetails.hasStock === 1) {
                if (skuValue.quantity <= skuValue.outOfStockThreshold) {
                    productDetails.stockStatus = 'outOfStock';
                } else {
                    productDetails.stockStatus = 'inStock';
                }
            } else {
                productDetails.stockStatus = 'inStock';
            }
            skuId = skuValue.id;
        }
        if (skuId) {
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(productDetail.productId, skuId, todaydate);
            const productDiscount = await this.productDiscountService.findDiscountPricewithSku(productDetail.productId, skuId, todaydate);
            if (productSpecial) {
                productDetails.pricerefer = productSpecial.price;
                productDetails.flag = 1;
            } else if (productDiscount) {
                productDetails.pricerefer = productDiscount.price;
                productDetails.flag = 0;
            } else {
                productDetails.pricerefer = '';
                productDetails.flag = '';
            }
            productDetails.productTirePrices = await this.productTirePriceService.findAll({
                select: ['id', 'quantity', 'price'],
                where: { productId: productDetail.productId, skuId },
            });
        } else {
            productDetails.pricerefer = '';
            productDetails.flag = '';
            productDetails.productTirePrices = await this.productTirePriceService.findAll({
                select: ['id', 'quantity', 'price'],
                where: { productId: productDetail.productId },
            });
        }

        const vendorProduct = await this.vendorProductService.findOne({ where: { productId: productDetail.productId, reuse: IsNull() }, relations: ['vendor'] });
        if (vendorProduct) {
            const vendor = await this.vendorService.findOne({ where: { vendorId: vendorProduct.vendorId } });
            const customer = await this.customerService.findOne({ where: { id: vendor.customerId } });
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
            productDetails.companyTaxNumber = vendorProduct.vendor.companyTaxNumber ?? '';
            productDetail.companyPanNumber = vendorProduct.vendor.companyPanNumber ?? '';
            productDetail.companyCountry = vendorProduct.vendor.companyCountryId ?? '';
            productDetail.vendorCompanystateId = vendorProduct.vendor.zoneId ?? '';
            productDetails.vendorCompanyCountry = '';
            if (vendorProduct.vendor?.companyCountryId) {
                const vendorCountry = await this.vendorCountryService.findOne({ where: { id: vendorProduct.vendor?.companyCountryId }, relations: ['country'] });
                productDetails.vendorCompanyCountry = vendorCountry?.country?.name;
            }
        }
        if (request.id) {
            let customerId;
            customerId = request.id;
            const wishStatus = await this.customerWishlistService.findOne({
                where: {
                    productId: productDetail.productId,
                    customerId,
                },
            });
            const orderProduct = await this.orderProductService.buyedCount(productDetail.productId, customerId);
            if (orderProduct.length > 0) {
                productDetails.buyed = 1;
            } else {
                productDetails.buyed = 0;
            }
            if (wishStatus) {
                productDetails.wishListStatus = 1;
            } else {
                productDetails.wishListStatus = 0;
            }
            const customerDetail = await this.customerService.findOne({ where: { id: customerId } });
            const customerActivity = new CustomerActivity();
            customerActivity.customerId = customerId;
            customerActivity.activityId = 2;
            customerActivity.description = 'productviewed';
            customerActivity.productId = productDetail.productId;
            await this.customerActivityService.create(customerActivity);
            const viewLog: any = new ProductViewLog();
            viewLog.productId = productDetail.productId;
            viewLog.customerId = customerDetail.id;
            viewLog.firstName = customerDetail.firstName;
            viewLog.lastName = customerDetail.lastName;
            viewLog.username = customerDetail.username;
            viewLog.email = customerDetail.email;
            viewLog.mobileNumber = customerDetail.mobileNumber;
            viewLog.address = customerDetail.address;
            await this.productViewLogService.create(viewLog);
        } else {
            productDetails.wishListStatus = 0;
            productDetails.buyed = 0;
        }
        // product video
        productDetails.productVideo = await this.productVideoService.findOne({
            select: ['id', 'name', 'path', 'type', 'productId'],
            where: { productId: productDetail.productId },
        });
        productDetails.productVideo = { ...productDetails.productVideo, mediaType: 2 };
        const successResponse: any = {
            status: 1,
            message: 'Successfully got product detail',
            data: productDetails,
        };
        return response.status(200).send(successResponse);
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
    @Get('/Category')
    public async getCategory(@QueryParam('CategoryId') CategoryId: number, @Res() response: any, @Req() request: any): Promise<any> {
        const select = ['categoryId', 'name', 'parentInt', 'sortOrder', 'categorySlug'];
        const whereConditions = [
            {
                name: 'categoryId',
                value: CategoryId,
            },
            {
                name: 'tenantId',
                value: request.tenantId,
            },
        ];

        const category: any = await this.categoryService.list(0, 0, select, [], whereConditions, [], 0, 0);
        const promise = category.map(async (result: any) => {
            const temp: any = result;
            const categoryLevel: any = await this.categoryPathService.find({
                select: ['level', 'pathId'],
                where: { categoryId: result.categoryId },
                order: { level: 'ASC' },
            }).then((values) => {
                const categories = values.map(async (val: any) => {
                    const categoryNames = await this.categoryService.findOne({ where: { categoryId: val.pathId } });
                    const tempVal: any = val;
                    tempVal.categoryName = categoryNames.name;
                    return tempVal;
                });
                const results = Promise.all(categories);
                return results;
            });
            temp.levels = categoryLevel;
            return temp;
        });
        const value = await Promise.all(promise);
        if (category) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the category',
                data: value,
            };
            return response.status(200).send(successResponse);
        }
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

    @Get('/product-compare')
    public async productCompare(@QueryParam('productId') productId: string, @QueryParam('data') data: string, @Res() response: any, @Req() request: any): Promise<any> {
        const productid = productId.split(',');
        if (productid.length === 0) {
            return response.status(200).send({
                status: 1,
                data: [],
            });
        }
        if (productid.length === 1) {
            if (data === '0') {
                const Response: any = {
                    status: 1,
                    message: 'Product added to compare',
                };
                return response.status(200).send(Response);
            } else {
                const Detail = [];
                const List = await this.productService.findOne({ where: { productId: productid, isActive: 1 }, relations: ['productTranslation'] });
                if (!List) {
                    return response.status(200).send({
                        status: 0,
                        message: `Invalid product`,
                    });
                }
                const defaultValue = await this.productImageService.findOne({
                    where: {
                        productId: List.productId,
                        defaultImage: 1,
                    },
                });
                const temp: any = List;
                const id = productid[0];
                const vendor = await this.vendorProductService.findOne({ where: { productId: id }, relations: ['vendor', 'vendor.customer'] });
                const vendorData = {
                    vendorId: vendor?.vendor?.vendorId,
                    vendorName: vendor?.vendor?.customer?.firstName,
                    vendorCompanyName: vendor?.vendor?.companyName,
                    vendorSlugName: vendor?.vendor?.vendorSlugName,
                    displayNameUrl: vendor?.vendor?.displayNameUrl,
                    companyLogo: vendor?.vendor?.companyLogo,
                    companyLogoPath: vendor?.vendor?.companyLogoPath,
                };
                temp.vendorDetails = vendorData;
                const productTranslation = List.productTranslation.find((productTrans) => productTrans.languageId === request.languageId);
                temp.productNameTrans = productTranslation?.name ?? '';
                temp.productDescriptionTrans = productTranslation?.description?.replace(/"/g, `'`) ?? '';
                temp.description = List.description?.replace(/"/g, `'`) ?? '';
                temp.ratingCount = 0;
                temp.reviewCount = 'null';
                temp.skuName = '';
                let skuValue = undefined;
                let skuId = undefined;
                skuValue = await this.skuService.findOne({ where: { id: List.skuId } });
                if (skuValue) {
                    temp.price = skuValue.price;
                    temp.skuName = skuValue.skuName;
                    skuId = skuValue.id;
                }
                if (skuId) {
                    const nowDate = new Date();
                    const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                    const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(List.productId, skuId, todaydate);
                    const productDiscount = await this.productDiscountService.findDiscountPricewithSku(List.productId, skuId, todaydate);
                    if (productSpecial) {
                        temp.pricerefer = productSpecial.price;
                        temp.flag = 1;
                    } else if (productDiscount) {
                        temp.pricerefer = productDiscount.price;
                        temp.flag = 0;
                    } else {
                        temp.pricerefer = '';
                        temp.flag = '';
                    }
                } else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
                temp.productImage = defaultValue;
                if (List.hasStock === 1) {
                    if (List.quantity <= List.outOfStockThreshold) {
                        temp.stockStatus = 'outOfStock';
                    } else {
                        temp.stockStatus = 'inStock';
                    }
                } else {
                    temp.stockStatus = 'inStock';
                }
                Detail.push(temp);
                const Response: any = {
                    status: 1,
                    message: 'Product Compared Successfully',
                    data: Detail,
                };
                return response.status(200).send(Response);
            }
        } else {
            if (data === '0') {
                const categoryDataDetail = [];
                // product find the which category
                for (const id of productid) {
                    const categoryId = await this.productToCategoryService.findAll({ where: { productId: id } });
                    const categoryDataValue = categoryId.map((item: any) => {
                        return item.categoryId;
                    });
                    categoryDataDetail.push(categoryDataValue);
                }
                let categoryData;
                if (categoryDataDetail.length === 2) {
                    categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                } else {
                    const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                }
                if (categoryData.length === 0) {
                    const errorResponse: any = {
                        status: 1,
                        message: 'Please Choose Products from Same Category',
                    };
                    return response.status(400).send(errorResponse);
                }
                const successResponse: any = {
                    status: 1,
                    message: 'Product Compared Successfully',
                };
                return response.status(200).send(successResponse);
            } else {
                const productDataDetail = [];
                const categoryDataDetail = [];
                // product find the which category
                for (const id of productid) {
                    const categoryId = await this.productToCategoryService.findAll({ where: { productId: id } });
                    const categoryDataValue = categoryId.map((item: any) => {
                        return item.categoryId;
                    });
                    categoryDataDetail.push(categoryDataValue);
                }
                let categoryData;
                if (categoryDataDetail.length === 2) {
                    categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                } else {
                    const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                }
                if (categoryData.length === 0) {
                    const errorResponse: any = {
                        status: 1,
                        message: 'Please Choose Products from Same Category',
                    };
                    return response.status(400).send(errorResponse);
                }
                let productListData;
                // find the product to compare
                for (const id of productid) {
                    productListData = await this.productService.findOne({ where: { productId: id }, relations: ['productTranslation'] });
                    const defaultValue = await this.productImageService.findOne({
                        where: {
                            productId: productListData.productId,
                            defaultImage: 1,
                        },
                    });
                    const temp: any = productListData;
                    const vendor = await this.vendorProductService.findOne({ where: { productId: id }, relations: ['vendor', 'vendor.customer'] });
                    const vendorData = {
                        vendorId: vendor?.vendor?.vendorId,
                        vendorName: vendor?.vendor?.customer?.firstName,
                        vendorCompanyName: vendor?.vendor?.companyName,
                        vendorSlugName: vendor?.vendor?.vendorSlugName,
                        displayNameUrl: vendor?.vendor?.displayNameUrl,
                        companyLogo: vendor?.vendor?.companyLogo,
                        companyLogoPath: vendor?.vendor?.companyLogoPath,
                    };
                    temp.vendorDetails = vendorData;
                    const productTranslation = productListData.productTranslation.find((productTrans) => productTrans.languageId === request.languageId);
                    temp.productNameTrans = productTranslation?.name ?? '';
                    temp.productDescriptionTrans = productTranslation?.description?.replace(/"/g, `'`) ?? '';
                    temp.description = productListData.description?.replace(/"/g, `'`) ?? '';
                    temp.ratingCount = 0;
                    temp.reviewCount = 'null';
                    temp.skuName = '';
                    let skuValue = undefined;
                    let skuId = undefined;
                    skuValue = await this.skuService.findOne({ where: { id: productListData.skuId } });
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
                        const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(productListData.productId, skuId, todaydate);
                        const productDiscount = await this.productDiscountService.findDiscountPricewithSku(productListData.productId, skuId, todaydate);
                        if (productSpecial) {
                            temp.pricerefer = productSpecial.price;
                            temp.flag = 1;
                        } else if (productDiscount) {
                            temp.pricerefer = productDiscount.price;
                            temp.flag = 0;
                        } else {
                            temp.pricerefer = '';
                            temp.flag = '';
                        }
                    } else {
                        temp.pricerefer = '';
                        temp.flag = '';
                    }
                    temp.productImage = defaultValue;
                    if (productListData.hasStock === 1) {
                        if (productListData.quantity <= productListData.outOfStockThreshold) {
                            temp.stockStatus = 'outOfStock';
                        } else {
                            temp.stockStatus = 'inStock';
                        }
                    } else {
                        temp.stockStatus = 'inStock';
                    }
                    productDataDetail.push(temp);
                }
                const successResponse: any = {
                    status: 1,
                    message: 'Product Compared Successfully',
                    data: productDataDetail,
                };
                return response.status(200).send(successResponse);
            }
        }
    }

    @Get('/product-search-list')
    public async productSearchList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('productName') productName: string, @QueryParam('skuName') skuName: string, @Res() response: any, @Req() request: any): Promise<any> {

        const vendorSettings = await this.vendorSettingsService.findOne({
            where: {
                vendorId: request.tenantId,
            },
        });
        const isSearchRequest =
            (keyword && keyword !== '') ||
            (productName && productName !== '') ||
            (skuName && skuName !== '');

        if (isSearchRequest && !vendorSettings?.enableAdvancedSkuSearch) {
            return response.status(400).send({
                status: 0,
                message: 'Advanced product/SKU search is disabled for this vendor.',
            });
        }
        const select = [
            'Product.productId as productId',
            'Product.name as name',
            'Product.productSlug as productSlug',
            'Product.isActive as isActive',
            'Product.taxValue as taxValue',
            'Product.taxType as taxType',
            'sku.sku_name as sku',
            'sku.price as price',
            'sku.quantity as quantity',
            'sku.out_of_stock_threshold as outOfStockThreshold',
            'Product.skuId as skuId',
            'sku.notify_min_quantity_below as notifyMinQuantity',
            'sku.min_quantity_allowed_cart as minQuantityAllowedCart',
            'sku.max_quantity_allowed_cart as maxQuantityAllowedCart',
            'sku.enable_back_orders as enableBackOrders',
            '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.productId AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
            ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
            '(SELECT price FROM product_special ps WHERE ps.product_id = Product.productId AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
        ];
        const relations = [
            {
                tableName: 'Product.vendorProducts',
                op: 'left',
                aliasName: 'vendorProducts',
            },
            {
                tableName: 'vendorProducts.vendor',
                op: 'leftCond',
                cond: 'vendor.approvalFlag = 1',
                aliasName: 'vendor',
            },
            {
                tableName: 'vendor.customer',
                op: 'leftCond',
                cond: 'vendor.isActive = 1',
                aliasName: 'customer',
            },
        ];
        relations.push({
            tableName: 'sku',
            op: 'leftCond',
            cond: `sku.id = Product.sku_id`,
            aliasName: 'sku',
        });
        const currentDate = moment().format('YYYY-MM-DD');
        const whereConditions = [
            {
                name: 'vendorProducts.vendorId',
                op: 'where',
                value: request.tenantId,
            },
            {
                name: 'vendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            },
            {
                name: '( customer.id IS NOT NULL',
                op: 'rawnumber',
                sign: 'OR',
                value: `vendorProducts.vendorId IS NULL )`,
            },
            {
                name: 'Product.isActive',
                op: 'and',
                value: 1,
            },
            {
                name: 'Product.dateAvailable',
                op: 'raw',
                sign: '<=',
                value: currentDate.toString(),
            },
        ];

        if (productName && productName !== '') {
            whereConditions.push({
                name: 'Product.name',
                op: 'and',
                value: productName,
            });
        }
        if (skuName && skuName !== '') {
            whereConditions.push({
                name: 'sku.sku_name',
                op: 'and',
                value: skuName,
            });
        }
        const searchConditions = [];
        if (keyword !== '' && keyword !== undefined) {
            searchConditions.push({
                name: ['Product.name', 'sku.sku_name'],
                value: keyword,
            });
        }
        const productSearchList = await this.productService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, [], [], false, true);
        const productList = productSearchList.map(async (value: any) => {
            const temp = value;
            if (value.productSpecial !== null) {
                temp.pricerefer = value.productSpecial;
                temp.flag = 1;
            } else if (value.productDiscount !== null) {
                temp.pricerefer = value.productDiscount;
                temp.flag = 0;
            } else {
                temp.pricerefer = '';
                temp.flag = '';
            }
            const defaultValue = await this.productImageService.findOne({
                where: {
                    productId: value.productId,
                    defaultImage: 1,
                },
            });
            temp.productImage = defaultValue;
            const productToCategory = await this.productToCategoryService.findOne({
                where: {
                    productId: value.productId,
                    isActive: 1,
                },
            });
            if (productToCategory) {
                const category = await this.categoryService.findOne({
                    select: ['categoryId', 'name', 'isActive', 'categorySlug'],
                    where: {
                        categoryId: productToCategory.categoryId,
                        isActive: 1,
                    },
                });
                temp.categoryName = category;
            } else {
                temp.categoryName = '';
            }
            return temp;
        });
        const results = await Promise.all(productList);
        if (productSearchList) {
            const successReponse: any = {
                status: 1,
                message: 'Successfully got a product search list',
                data: results,
            };
            return response.status(200).send(successReponse);
        }
    }
}
