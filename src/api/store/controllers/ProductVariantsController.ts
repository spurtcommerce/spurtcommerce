/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, JsonController, Res, Param, UseBefore, Req } from 'routing-controllers';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { SkuService } from '../../../../src/api/core/services/SkuService';
import { ProductImageService } from '../../../../src/api/core/services/ProductImageService';
import { VariantValueService } from '../../core/services/VariantValueService';
import { ProductVarientService } from '../../core/services/ProductVarientService';
import { VariantService } from '../../core/services/VariantService';
import { ProductVarientOptionDetailService } from '../../core/services/ProductVarientOptionDetailService';
import { ProductVarientOptionImageService } from '../../core/services/ProductVarientOptionImageService';
import { ProductVarientOptionService } from '../../core/services/ProductVarientOptionService';
import { instanceToPlain } from 'class-transformer';
import { ProductDiscountService } from '../../../../src/api/core/services/ProductDiscountService';
import { ProductSpecialService } from '../../../../src/api/core/services/ProductSpecialService';
import { TranslationMiddleware } from '../../../../src/api/core/middlewares/TranslationMiddleware';
import { OrderProductService } from '../../../../src/api/core/services/OrderProductService';
// import { CheckTokenMiddleware } from '../../../../src/api/core/middlewares/checkTokenMiddleware';
import { TenantValidationMiddleware } from '../../../../src/api/core/middlewares/TenantValidationMiddleware';
import { CheckVendorCustomerAddonMiddleware } from '../../../../src/api/core/middlewares/VendorCustomerAddonValidationMiddilware';
import { Service } from 'typedi';

@Service()
@UseBefore(TenantValidationMiddleware)
@UseBefore(CheckVendorCustomerAddonMiddleware)
@UseBefore(TranslationMiddleware)
@JsonController('/store-product-variant')
export class StoreProductVariantsController {
    constructor(
        private productService: ProductService,
        private skuService: SkuService,
        private productVarientService: ProductVarientService,
        private productImageService: ProductImageService,
        private productVarientOptionDetailService: ProductVarientOptionDetailService,
        private productVarientOptionImageService: ProductVarientOptionImageService,
        private productVarientOptionService: ProductVarientOptionService,
        private varientsValueService: VariantValueService,
        private varientsService: VariantService,
        private productDiscountService: ProductDiscountService,
        private productSpecialService: ProductSpecialService,
        private orderProductService: OrderProductService
    ) {
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
    @Get('/product/:productSlug')
    // @UseBefore(CheckTokenMiddleware)
    public async productDetail(@Param('productSlug') productSlug: string, @Res() response: any, @Req() request: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
            where: {
                productSlug, isActive: 1,
                vendorProducts: {
                    vendorId: request.tenantId,
                },
            },
            relations: ['vendorProducts'],
        });
        if (!productDetail) {
            return response.status(400).send({
                status: 0,
                message: `Invalid product Slug`,
            });
        }
        productDetail.vendorProducts = undefined;
        const productDetails: any = instanceToPlain(productDetail);
        productDetails.productImage = await this.productImageService.findAll({
            select: ['productId', 'image', 'containerName', 'defaultImage'],
            where: {
                productId: productDetail.productId,
            },
            order: {
                sortOrder: 'ASC',
            },
        });
        productDetails.productOriginalImage = productDetails.productImage.slice();
        const selectedVariant: any = {};
        const skuValue = await this.productVarientOptionService.findOne({ where: { productId: productDetail.productId, isActive: 1 } });
        if (skuValue) {
            const productVarientOption = await this.productVarientOptionDetailService.findAll({
                select: ['id', 'productVarientOptionId', 'variantValueId'],
                where: { productVarientOptionId: skuValue.id },
            }).then((varientValue) => {
                const varientValueList = varientValue.map(async (vv: any) => {
                    const tempValue: any = vv;
                    const varientValueData = await this.varientsValueService.findOne({
                        select: ['id', 'value', 'variantId'],
                        where: { id: vv.variantValueId },
                    });
                    if (varientValueData) {
                        selectedVariant[varientValueData.variantId] = vv.varientsValueId;
                    }
                    tempValue.value = (varientValueData) ? varientValueData?.value : '';
                    return tempValue;
                });
                const rslt = Promise.all(varientValueList);
                return rslt;
            });
            const image = await this.productVarientOptionImageService.findAll({
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
        productDetails.productVarient = await this.productVarientService.findAll({
            select: ['id', 'variantId', 'productId'],
            where: { productId: productDetail.productId },
        }).then((val) => {
            const varientDetail = val.map(async (value) => {
                const varients: any = await this.varientsService.findOne({ where: { id: value.variantId }, relations: ['variantTranslation', 'variantValue', 'variantValue.variantValueTranslation'] });
                if (varients) {
                    varients.variantValue = varients.variantValue.map((variantVal) => {
                        variantVal.valueTrans = (variantVal.variantValueTranslation.find((valueTrans) => valueTrans.languageId === (request.languageId ?? 0)))?.value ?? '';
                        delete variantVal.variantValueTranslation;
                        return variantVal;
                    });
                    varients.variantNameTrans = (varients.variantTranslation.find((variantTrans) => variantTrans.languageId === (request.languageId ?? 0)))?.name ?? '';
                    delete varients.variantTranslation;
                    const temp: any = varients;
                    return temp;
                }
            });
            const results = Promise.all(varientDetail);
            return results;
        });
        productDetails.productvarientList = await this.productVarientOptionService.findAll({
            select: ['id', 'productId', 'skuId', 'varientName', 'isActive', 'createdDate'],
            where: { productId: productDetail.productId, isActive: 1 },
        }).then((val) => {
            const productVarList = val.map(async (value: any) => {
                const temp: any = value;
                const sku = await this.skuService.findOne({
                    select: ['id', 'skuName', 'price', 'isActive', 'quantity', 'isActive', 'outOfStockThreshold', 'notifyMinQuantity', 'minQuantityAllowedCart', 'maxQuantityAllowedCart', 'enableBackOrders', 'vendorId'],
                    where: { id: value.skuId },
                });
                const image = await this.productVarientOptionImageService.findAll({
                    select: ['id', 'image', 'containerName', 'defaultImage', 'productVarientOptionId'],
                    where: { productVarientOptionId: value.id },
                    order: {
                        sortOrder: 'ASC',
                    },
                });
                const productVarientOption = await this.productVarientOptionDetailService.findAll({
                    select: ['id', 'productVarientOptionId', 'variantValueId'],
                    where: { productVarientOptionId: value.id },
                }).then((varientValue) => {
                    const varientValueList = varientValue.map((vv: any) => {
                        return vv.variantValueId;
                    });
                    return varientValueList;
                });
                const dateNow = new Date();
                const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                const discountPrice = await this.productDiscountService.findDiscountPricewithSku(productDetail.productId, value.skuId, todaydate);
                const specialPrice = await this.productSpecialService.findSpecialPriceWithSku(productDetail.productId, value.skuId, todaydate);
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
                const orderProductForBackOrder = await this.orderProductService.listByQueryBuilder(
                    0,
                    0,
                    [],
                    [
                        { name: 'order.backOrders', op: 'where', value: 1 },
                        { name: 'OrderProduct.skuName', op: 'and', value: `'${sku.skuName}'` },
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
                temp.availableBackOrderStock = sku.backOrderStockLimit - totalbackOrderQuantity;
                temp.vendorId = sku.vendorId;
                if (request.id) {
                    const orderProduct = await this.orderProductService.findOne({ where: { order: { customerId: request.id }, skuName: sku.skuName }, relations: ['order'] });
                    temp.buyed = orderProduct ? 1 : 0;
                    temp.orderProductId = orderProduct?.orderProductId ?? 0;
                } else {
                    temp.buyed = 0;
                    temp.orderProductId = 0;
                }
                temp.productVarientOption = productVarientOption;
                temp.discountPrice = discountPrice ? [discountPrice] : [];
                temp.specialPrice = specialPrice ? [specialPrice] : [];
                if (productDetails.hasStock === 1) {
                    if (sku.quantity <= sku.outOfStockThreshold) {
                        productDetails.stockStatus = 'outOfStock';
                    } else {
                        productDetails.stockStatus = 'inStock';
                    }
                } else {
                    productDetails.stockStatus = 'inStock';
                }
                return temp;
            });
            const resultData = Promise.all(productVarList);
            return resultData;
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully get productDetail',
            data: productDetails,
        };
        return response.status(200).send(successResponse);
    }
}
