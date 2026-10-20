/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, QueryParam, Post, Body, JsonController, Authorized, Res, Param, Req, Delete, Put, QueryParams } from 'routing-controllers';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { SkuService } from '../../../../src/api/core/services/SkuService';
import { ProductImageService } from '../../../../src/api/core/services/ProductImageService';
import { VariantValueService } from '../../core/services/VariantValueService';
import { ProductVarientService } from '../../core/services/ProductVarientService';
import { ProductVarientOptionDetailService } from '../../core/services/ProductVarientOptionDetailService';
import { ProductVarientOptionImageService } from '../../core/services/ProductVarientOptionImageService';
import { ProductVarientOptionService } from '../../core/services/ProductVarientOptionService';
import { instanceToPlain } from 'class-transformer';
import { ProductVarient } from '../../core/models/ProductVarient';
import { ProductVarientOptionImage } from '../../core/models/ProductVarientOptionImage';
import { Sku } from '../../../../src/api/core/models/SkuModel';
import { ProductVarientOption } from '../../core/models/ProductVarientOption';
import { ProductVarientOptionDetail } from '../../core/models/ProductVarientOptionDetail';
import { UpdateProductVariantRequest } from './requests/UpdateProductVariantRequest';
import { VendorProductService } from '../../../../src/api/core/services/VendorProductService';
import { Product } from '../../../../src/api/core/models/ProductModel';
import { UpdateStockRequest } from '../../../../src/api/vendor/controllers/requests/UpdateStockRequest';
import { OrderProductService } from '../../../../src/api/core/services/OrderProductService';
import { VariantService } from '../../core/services/VariantService';
import { In } from 'typeorm';
import { ProductDiscount } from '../../../../src/api/core/models/ProductDiscount';
import { ProductSpecial } from '../../../../src/api/core/models/ProductSpecial';
import { ProductDiscountService } from '../../../../src/api/core/services/ProductDiscountService';
import { ProductSpecialService } from '../../../../src/api/core/services/ProductSpecialService';

export interface VendorProductVariantsQueryParams {
    limit?: number;
    offset?: number;
    keyword?: string;
    sku?: string;
    status?: string;
    productName?: string;
    price?: number;
    count?: number | boolean;
}
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-product-variant')
export class VendorProductVariantsController {
    constructor(
        private productService: ProductService,
        private skuService: SkuService,
        private productVarientService: ProductVarientService,
        private productImageService: ProductImageService,
        private productVarientOptionDetailService: ProductVarientOptionDetailService,
        private productVarientOptionImageService: ProductVarientOptionImageService,
        private productVarientOptionService: ProductVarientOptionService,
        private varientsValueService: VariantValueService,
        private vendorProductService: VendorProductService,
        private orderProductService: OrderProductService,
        private varientsService: VariantService,
        private productDiscountService: ProductDiscountService,
        private productSpecialService: ProductSpecialService
    ) {
        // ----
    }

    // Vendor Product Variant Product List API
    /**
     * @api {Get} /api/vendor-product-variant Vendor Product Variant Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} sku search by sku
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} price=1/2 if 1-> asc 2-> desc
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get vendor product list",
     *      "data":{
     *      "productId" : 1,
     *      "sku" : "",
     *      "name" : "",
     *      "quantity" : 1,
     *      "price" : 1,
     *      "isFeatured" : 1,
     *      "todayDeals" : "",
     *      "productSlug" : "",
     *      "isActive" : 1,
     *      "image" : "",
     *      "containerName" : "",
     *      "defaultImage" : "",
     *      "skuId" : 1,
     *      "sku" : "",
     *      "price" : 1,
     *      "modifiedPrice" : "",
     *      "productDiscount" : 1,
     *      "productSpecial" : "",
     *      }
     * }"
     * }
     * @apiSampleRequest /api/vendor-product-variant
     * @apiErrorExample {json} vendorProductList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['vendor', 'list-product-variant'])
    public async productList(@QueryParams() params: VendorProductVariantsQueryParams, @Req() request: any, @Res() response: any): Promise<any> {

        const select = [
            'Product.productId as productId',
            'Product.sku as sku',
            'Product.name as name',
            'Product.quantity as quantity',
            'Product.price as price',
            'Product.isFeatured as isFeatured',
            'Product.todayDeals as todayDeals',
            'Product.productSlug as productSlug',
            'Product.isActive as isActive',
            'Product.isSimplified as isSimplified',
            'Product.isSpecification as isSpecification',
            '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
            '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
            '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
            '(SELECT id as skuId FROM sku WHERE sku.id = Product.skuId) AS skuId',
            '(SELECT sku.sku_name as sku FROM sku WHERE sku.id = skuId) as sku',
            '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
            '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
            '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
            ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
            '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
        ];
        const relations = [
            {
                tableName: 'Product.vendorProducts',
                aliasName: 'vendorProducts',
            },
        ];
        const whereConditions = [
            {
                name: 'vendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            },
            {
                name: 'vendorProducts.vendorId',
                op: 'and',
                value: request.user.tenantId,
            },
        ];
        if (params.status) {
            whereConditions.push({
                name: 'Product.isActive',
                op: 'and',
                value: params.status,
            });
        }
        const searchConditions = [];
        if (params.keyword && params.keyword !== '') {
            searchConditions.push(
                {
                    name: ['Product.name', 'Product.sku', 'Product.price', 'Product.isActive'],
                    value: params.keyword,
                });
        }
        if (params.productName && params.productName !== '') {
            searchConditions.push({
                name: ['Product.name'],
                value: params.productName,
            });
        }
        if (params.sku && params.sku !== '') {
            searchConditions.push({
                name: ['Product.sku'],
                value: params.sku,
            });
        }
        if (params.price) {
            searchConditions.push({
                name: ['Product.price'],
                value: params.price,
            });
        }
        const sort = [];
        if (+params.price && params.price === 1) {
            sort.push({
                name: 'Product.price',
                order: 'ASC',
            });
        } else if (+params.price && params.price === 2) {
            sort.push({
                name: 'Product.price',
                order: 'DESC',
            });
        } else {
            sort.push({
                name: 'Product.createdDate',
                order: 'DESC',
            });
        }
        const productLists: any = await this.productService.listByQueryBuilder(params.limit, params.offset, select, whereConditions, searchConditions, relations, [], sort, false, true);
        if (params.count) {
            const productListCount: any = await this.productService.listByQueryBuilder(params.limit, params.offset, select, whereConditions, searchConditions, relations, [], sort, true, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got vendor product lists count.',
                data: productListCount,
            });
        }
        const productList = productLists.map(async (value: any) => {
            const temp: any = value;
            const variant = await this.productVarientOptionService.variantCount(temp.productId);
            temp.variantCount = variant;
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
            return temp;
        });
        const results = await Promise.all(productList);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete vendor product list.',
            data: instanceToPlain(results),
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Product Variants update Product API
    /**
     * @api {Post} /api/vendor-product-variant Vendor Product Variants Update Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {String} [productVarient] productVarient
     * @apiParam (Request body) {String} [productVarientOption] productVarientOption
     * @apiParamExample {json} Input
     * {
     *      "productVarient" : [],
     *      "productVarientOption" : [{
     *      "id":1
     *      "varientName":""
     *      "price":"",
     *      "sku":"",
     *      "quantity":1
     *      "optionValue":[],
     *      "optionImage":[{
     *      "image":"",
     *      "containerName": "",
     *      "defaultImage": "",
     *      "sortOrder": 1,
     *       }]
     *       }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Product variant updated successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-variant
     * @apiErrorExample {json} updateProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post()
    @Authorized(['vendor', 'create-product-variant'])
    public async updateProduct(@Body({ validate: true }) product: UpdateProductVariantRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId: product.productId,
                vendorId: request.user.tenantId,
            },
        });
        if (!vendorProduct) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Vendor Product',
            });
        }
        let validatedVarient = false;
        const validateVarientPrice = product.productVariantOptions;
        if (validateVarientPrice.length > 0) {
            validatedVarient = validateVarientPrice.some(varientData => varientData.price < 0);
        }
        if (validatedVarient) {
            const errorResponse: any = {
                status: 0,
                message: 'Price should not be in negative',
            };
            return response.status(400).send(errorResponse);
        }
        const updateProduct: any = await this.productService.findOne({
            where: {
                productId: product.productId,
            },
        });
        if (!updateProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid product Id.',
            };
            return response.status(400).send(errorResponse);
        }

        // update product Varient
        const productVariants = product.productVariants;

        const productVariantDetails: ProductVarient[] = [];

        if (product.reShuffle) {
            await this.productVarientService.delete({ productId: updateProduct.productId });
            const existingProductVariantOptions = await this.productVarientOptionService.findAll({ where: { productId: updateProduct.productId } });
            const skuIds = existingProductVariantOptions.map((existingProductVariantOption) => existingProductVariantOption.skuId);
            await this.skuService.delete({ id: In(skuIds) });
        }

        if (productVariants.length > 0) {
            const productVarient: ProductVarient[] = [];
            for (const productVariant of productVariants) {
                const newProductVarient = new ProductVarient();
                if (productVariant.id) {
                    newProductVarient.id = productVariant.id;
                }
                newProductVarient.productId = updateProduct.productId;
                newProductVarient.variantId = productVariant.variantId;
                newProductVarient.isActive = 1;
                productVarient.push(newProductVarient);
            }
            productVariantDetails.push(...await this.productVarientService.bulkSave(productVarient));
        }

        // update product Varient option
        const varientOptions = product.productVariantOptions;
        let totalQty = 0;
        let basePrice: any = 0;
        if (varientOptions.length > 0) {
            basePrice = varientOptions[0].price;
            for (const varientOption of varientOptions) {
                if (varientOption.id) {
                    const pdtVarientOption = await this.productVarientOptionService.findOne({ where: { id: varientOption.id } });
                    if (pdtVarientOption) {
                        // tslint:disable-next-line:no-shadowed-variable
                        const sku = await this.skuService.findOne({ where: { id: pdtVarientOption.skuId } });
                        if (sku) {
                            sku.skuName = varientOption.sku;
                            sku.price = varientOption.price;
                            sku.quantity = varientOption.quantity ? varientOption.quantity : 1;
                            totalQty += +sku.quantity;
                            sku.isActive = varientOption.isActive;
                            sku.productId = pdtVarientOption.productId;
                            await this.skuService.create(sku);

                            // create variant discount price
                            const variantDiscountPrice: any[] = varientOption.variantDiscountPrice ?? [];
                            if (variantDiscountPrice.length > 0) {
                                const createDiscountArr = [];
                                for (const discountValue of variantDiscountPrice) {
                                    if (varientOption.price <= discountValue.price) {
                                        return response.status(400).send({
                                            status: 0,
                                            message: 'discount price should be less than original price.',
                                        });
                                    }
                                    const findVariantDiscount = discountValue.id ? await this.productDiscountService.findOne({ where: { productDiscountId: discountValue?.id } }) : null;
                                    const newProductDiscount = findVariantDiscount || new ProductDiscount();
                                    newProductDiscount.productId = pdtVarientOption.productId;
                                    newProductDiscount.quantity = 1;
                                    newProductDiscount.skuId = sku.id;
                                    newProductDiscount.priority = discountValue.priority;
                                    newProductDiscount.price = discountValue.price;
                                    newProductDiscount.dateStart = discountValue.dateStart;
                                    newProductDiscount.dateEnd = discountValue.dateEnd;
                                    createDiscountArr.push(newProductDiscount);
                                }
                                await this.productDiscountService.create(createDiscountArr);
                            }

                            // create variant special price
                            const variantSpecialPrice: any[] = varientOption.variantSpecialPrice ?? [];
                            if (variantSpecialPrice.length > 0) {
                                const createSpecialArr = [];
                                for (const specialValue of variantSpecialPrice) {
                                    if (varientOption.price < specialValue.price) {
                                        return response.status(400).send({
                                            status: 0,
                                            message: 'special price should be less than original price.',
                                        });
                                    }
                                    const findVariantSpecial = specialValue.id ? await this.productSpecialService.findOne({ where: { productSpecialId: specialValue?.id } }) : null;
                                    const productSpecial = findVariantSpecial || new ProductSpecial();
                                    productSpecial.productId = pdtVarientOption.productId;
                                    productSpecial.customerGroupId = specialValue.customerGroupId;
                                    productSpecial.skuId = sku.id;
                                    productSpecial.priority = specialValue.priority;
                                    productSpecial.price = specialValue.price;
                                    productSpecial.dateStart = specialValue.dateStart;
                                    productSpecial.dateEnd = specialValue.dateEnd;
                                    createSpecialArr.push(productSpecial);
                                }
                                await this.productSpecialService.create(createSpecialArr);
                            }
                        }
                        pdtVarientOption.isActive = varientOption.isActive;
                        await this.productVarientOptionService.create(pdtVarientOption);

                        const variantValueDetails = varientOption.variantValueDetails;
                        const varientValue: ProductVarientOptionDetail[] = [];
                        for (const variantValueDetail of variantValueDetails) {
                            await this.productVarientOptionDetailService.delete({ productVarientOptionId: pdtVarientOption.id, variantValueId: variantValueDetail.variantValueId });
                            const newProductVarientOptionDetail = new ProductVarientOptionDetail();
                            newProductVarientOptionDetail.productVarientOptionId = pdtVarientOption.id;
                            newProductVarientOptionDetail.variantValueId = variantValueDetail.variantValueId;
                            newProductVarientOptionDetail.productVariantId = (productVariantDetails.find((productVariantDetail) => productVariantDetail.variantId === variantValueDetail.variantId)).id;
                            varientValue.push(newProductVarientOptionDetail);
                        }
                        await this.productVarientOptionDetailService.bulkSave(varientValue);

                        if (varientOption.optionImage) {
                            await this.productVarientOptionImageService.delete({ productVarientOptionId: varientOption.id });
                            const varientOptionsImages = varientOption.optionImage;
                            const image: ProductVarientOptionImage[] = [];
                            for (const varientOptionsImage of varientOptionsImages) {
                                const newProductVarientOptionImage = new ProductVarientOptionImage();
                                newProductVarientOptionImage.productVarientOptionId = varientOption.id;
                                newProductVarientOptionImage.image = varientOptionsImage.image;
                                newProductVarientOptionImage.containerName = varientOptionsImage.containerName;
                                newProductVarientOptionImage.defaultImage = varientOptionsImage.defaultImage;
                                newProductVarientOptionImage.sortOrder = varientOptionsImage.sortOrder;
                                image.push(newProductVarientOptionImage);
                            }
                            await this.productVarientOptionImageService.bulkSave(image);
                        }

                    } else {
                        const errorResponse: any = {
                            status: 0,
                            message: 'Invalid product Varient Option Id.',
                        };
                        return response.status(400).send(errorResponse);
                    }
                } else {
                    const newSkus = new Sku();
                    const find = await this.skuService.findOne({ where: { skuName: varientOption.sku } });
                    if (find) {
                        const errorResponse: any = {
                            status: 0,
                            message: 'Duplicate sku name, give some other name for varient',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    newSkus.skuName = varientOption.sku;
                    newSkus.price = varientOption.price.toString();
                    newSkus.quantity = varientOption.quantity ? varientOption.quantity : 1;
                    totalQty += +newSkus.quantity;
                    newSkus.isActive = varientOption.isActive;
                    const saveSkus = await this.skuService.create(newSkus);
                    const newProductVarientOption: any = new ProductVarientOption();
                    newProductVarientOption.productId = updateProduct.productId;
                    newProductVarientOption.skuId = saveSkus.id;
                    newProductVarientOption.varientName = varientOption.varientName;
                    newProductVarientOption.isActive = varientOption.isActive;
                    const val = await this.productVarientOptionService.create(newProductVarientOption);

                    // create variant discount price
                    const variantDiscountPrice: any[] = varientOption.variantDiscountPrice ?? [];
                    if (variantDiscountPrice.length > 0) {
                        const createDiscountArr = [];
                        for (const discountValue of variantDiscountPrice) {
                            if (varientOption.price <= discountValue.price) {
                                return response.status(400).send({
                                    status: 0,
                                    message: 'discount price should be less than original price.',
                                });
                            }
                            const newProductDiscount = new ProductDiscount();
                            newProductDiscount.productId = val.productId;
                            newProductDiscount.quantity = 1;
                            newProductDiscount.skuId = saveSkus.id;
                            newProductDiscount.priority = discountValue.priority;
                            newProductDiscount.price = discountValue.price;
                            newProductDiscount.dateStart = discountValue.dateStart;
                            newProductDiscount.dateEnd = discountValue.dateEnd;
                            createDiscountArr.push(newProductDiscount);
                        }
                        await this.productDiscountService.create(createDiscountArr);
                    }

                    // create variant special price
                    const variantSpecialPrice: any[] = varientOption.variantSpecialPrice ?? [];
                    if (variantSpecialPrice.length > 0) {
                        const createSpecialArr = [];
                        for (const specialValue of variantSpecialPrice) {
                            if (varientOption.price < specialValue.price) {
                                return response.status(400).send({
                                    status: 0,
                                    message: 'special price should be less than original price.',
                                });
                            }
                            const productSpecial = new ProductSpecial();
                            productSpecial.productId = val.productId;
                            productSpecial.customerGroupId = specialValue.customerGroupId;
                            productSpecial.skuId = saveSkus.id;
                            productSpecial.priority = specialValue.priority;
                            productSpecial.price = specialValue.price;
                            productSpecial.dateStart = specialValue.dateStart;
                            productSpecial.dateEnd = specialValue.dateEnd;
                            createSpecialArr.push(productSpecial);
                        }
                        await this.productSpecialService.create(createSpecialArr);
                    }

                    // --
                    const variantValueDetails = varientOption.variantValueDetails;
                    const varientValue: ProductVarientOptionDetail[] = [];
                    for (const variantValueDetail of variantValueDetails) {
                        const newProductVarientOptionDetail = new ProductVarientOptionDetail();
                        newProductVarientOptionDetail.productVarientOptionId = val.id;
                        newProductVarientOptionDetail.variantValueId = variantValueDetail.variantValueId;
                        newProductVarientOptionDetail.productVariantId = (productVariantDetails.find((productVariantDetail) => productVariantDetail.variantId === variantValueDetail.variantId)).id;
                        varientValue.push(newProductVarientOptionDetail);
                    }
                    await this.productVarientOptionDetailService.bulkSave(varientValue);
                    // --
                    const varientOptionsImages = varientOption.optionImage;
                    const image: ProductVarientOptionImage[] = [];
                    for (const varientOptionsImage of varientOptionsImages) {
                        const newProductVarientOptionImage: any = new ProductVarientOptionImage();
                        newProductVarientOptionImage.productVarientOptionId = val.id;
                        newProductVarientOptionImage.image = varientOptionsImage.image;
                        newProductVarientOptionImage.containerName = varientOptionsImage.containerName;
                        newProductVarientOptionImage.defaultImage = varientOptionsImage.defaultImage;
                        newProductVarientOptionImage.sortOrder = varientOptionsImage.sortOrder;
                        image.push(newProductVarientOptionImage);
                    }
                    await this.productVarientOptionImageService.bulkSave(image);
                }
            }
        }

        // Update Over Stock and Base Price
        const sku = await this.skuService.findOne({ where: { id: updateProduct.skuId } });
        sku.quantity = varientOptions.length > 0 ? totalQty : updateProduct.quantity;
        sku.price = varientOptions.length > 0 ? basePrice : updateProduct.price;
        await this.skuService.create(sku);
        // --

        // Change Product isSimplified status
        const varientSimplified = product.productVariants;

        if (varientSimplified.length > 0) {
            updateProduct.isSimplified = 0;
        } else {
            updateProduct.isSimplified = 1;
        }
        // --

        await this.productService.create(updateProduct);

        const successResponse: any = {
            status: 1,
            message: 'Product variant updated successfully.',
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Product Variants Product Detail API
    /**
     * @api {Get} /api/vendor-product-variant/product/:id Vendor Product Variants Product Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data": {
     *       "productId": 1,
     *       "name": "",
     *       "description": "",
     *       "price": 1,
     *       "productImage": [
     *           {
     *               "productId": 1,
     *               "image": "",
     *               "containerName": "",
     *               "defaultImage": ""
     *           }
     *     ]
     *       "productVariants": [
     *           {
     *               "id": 1,
     *               "variantId": 1,
     *               "productId": 1
     *           }
     *       ],
     *       "productVariantList": [
     *           {
     *               "id": 1,
     *               "productId": 1,
     *               "skuId": 1,
     *               "varientName": "",
     *               "isActive": 1,
     *               "createdDate": "",
     *               "skuName": "",
     *               "price": 1,
     *               "quantity": 1,
     *               "isActive": 1,
     *               "outOfStockThreshold": "",
     *               "notifyMinQuantity": 1,
     *               "minQuantityAllowedCart": "",
     *               "maxQuantityAllowedCart": "",
     *               "enableBackOrders": "",
     *               "vendorId": 1,
     *               "optionImage": [
     *                   {
     *                       "id": 1,
     *                       "image": "",
     *                       "containerName": "",
     *                       "defaultImage": "",
     *                       "productVarientOptionId": 1
     *                   }
     *               ],
     *               "productVarientOptionDetails": [
     *                   {
     *                       "id": 1,
     *                       "productVarientOptionId": 1,
     *                       "variantValueId": 1,
     *                       "productVariantId": 1,
     *                       "value": ""
     *                   }
     *               ],
     *               "discountPrice": [
     *                   {
     *                       "skuId": 1,
     *                       "discount": 1
     *                   }
     *               ],
     *               "specialPrice": [
     *                   {
     *                       "skuId": 1,
     *                       "specialPrice": ""
     *                   }
     *               ]
     *           }
     *       ]
     *      }
     * }
     * @apiSampleRequest /api/vendor-product-variant/product/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/product/:id')
    @Authorized(['vendor', 'list-product-variant'])
    public async productDetail(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId: id,
                vendorId: request.user.tenantId,
            },
        });
        if (!vendorProduct) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Vendor Product',
            });
        }
        const productDetail: any = await this.productService.findOne({
            where: { productId: id },
        });
        if (!productDetail) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid Product Id..!',
            });
        }
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
        productDetails.productVariants = await this.productVarientService.findAll({
            select: ['id', 'variantId', 'productId'],
            where: { productId: productDetail.productId },
        });
        productDetails.hasOrder = (await this.orderProductService.findOne({ where: { productId: productDetail.productId } })) ? 1 : 0;
        productDetails.productVariantList = await this.productVarientOptionService.findAll({
            select: ['id', 'productId', 'skuId', 'varientName', 'isActive', 'createdDate'],
            where: { productId: productDetail.productId },
        }).then((val) => {
            const productVarList = val.map(async (value: any) => {
                const temp: any = value;
                const sku = await this.skuService.findOne({
                    select: ['id', 'skuName', 'price', 'isActive', 'quantity', 'outOfStockThreshold', 'notifyMinQuantity', 'minQuantityAllowedCart', 'maxQuantityAllowedCart', 'enableBackOrders', 'vendorId'],
                    where: { id: value.skuId },
                });
                const orderProducts = await this.orderProductService.findVariantSku(sku.skuName);
                if (orderProducts.length !== 0) {
                    Object.assign(temp, { availedVarient: 1 });
                } else {
                    Object.assign(temp, { availedVarient: 0 });
                }
                const image = await this.productVarientOptionImageService.findAll({
                    select: ['id', 'image', 'containerName', 'defaultImage', 'productVarientOptionId'],
                    where: { productVarientOptionId: value.id },
                    order: {
                        sortOrder: 'ASC',
                    },
                });
                const productVarientOptionDetails = await this.productVarientOptionDetailService.findAll({
                    select: ['id', 'productVarientOptionId', 'variantValueId', 'productVariantId'],
                    where: { productVarientOptionId: value.id },
                }).then((varientValue) => {
                    const varientValueList = varientValue.map(async (vv: any) => {
                        const tempValue: any = vv;
                        const varientValueData = await this.varientsValueService.findOne({
                            select: ['id', 'value', 'variantId'],
                            where: { id: vv.variantValueId },
                        });
                        tempValue.value = (varientValueData) ? varientValueData.value : '';
                        return tempValue;
                    });
                    const rslt = Promise.all(varientValueList);
                    return rslt;
                });
                const discountPrice = await this.productDiscountService.findAll({ where: { skuId: value.skuId } });
                const specialPrice = await this.productSpecialService.findAll({ where: { skuId: value.skuId } });
                temp.skuName = sku.skuName;
                temp.price = sku.price;
                temp.quantity = sku.quantity;
                temp.isActive = sku.isActive;
                temp.outOfStockThreshold = sku.outOfStockThreshold;
                temp.notifyMinQuantity = sku.notifyMinQuantity;
                temp.minQuantityAllowedCart = sku.minQuantityAllowedCart;
                temp.maxQuantityAllowedCart = sku.maxQuantityAllowedCart;
                temp.enableBackOrders = sku.enableBackOrders;
                temp.vendorId = sku.vendorId;
                temp.optionImage = image;
                temp.productVarientOptionDetails = productVarientOptionDetails;
                temp.discountPrice = discountPrice;
                temp.specialPrice = specialPrice;
                return temp;
            });
            const resultData = Promise.all(productVarList);
            return resultData;
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got product variant detail.',
            data: productDetails,
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Product Variant Inventory List API
    /**
     * @api {Get} /api/vendor-product-variant/inventory Vendor Product Variant Inventory List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} sku sku
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} price=1/2 if 1->asc 2->desc
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got Vendor Product list",
     *      "data":{
     *      "vendorProductId" : 1,
     *      "approvalFlag" : 1,
     *      "vendorId" : 1,
     *      "pincodeBasedDelivery" : "",
     *      "name" : "",
     *      "sku" : "",
     *      "productprice" : "",
     *      "quantity" : 1,
     *      "sortOrder" : "",
     *      "isActive" : 1,
     *      "productSlug" : "",
     *      "hasStock" : "",
     *      "hasTirePrice" : "",
     *      "outOfStockThreshold" : "",
     *      "notifyMinQuantity" : 1,
     *      "minQuantityAllowedCart" : 1,
     *      "maxQuantityAllowedCart" : 1,
     *      "enableBackOrders" : "",
     *      "modifiedDate" : "",
     *      "isSimplified" : 1,
     *      "skuId" : 1,
     *      "createdDate": "",
     *      "keywords" : "",
     *      "attributeKeyword" : "",
     *      }
     * }
     * @apiSampleRequest /api/vendor-product-variant/inventory
     * @apiErrorExample {json} inventoryVendorProductList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/inventory')
    @Authorized(['vendor', 'list-variant-stock'])
    public async inventoryVendorProductList(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('keyword') keyword: string,
        @QueryParam('sku') sku: string,
        @QueryParam('status') status: string,
        @QueryParam('ProductName') productName: string,
        @QueryParam('price') price: string,
        @QueryParam('updatedDeta') updatedDeta: string,
        @QueryParam('count') count: number | boolean,
        @Req() request: any,
        @Res() response: any): Promise<Product> {
        const selects = [
            'VendorProducts.vendorProductId as vendorProductId',
            'VendorProducts.approvalFlag as approvalFlag',
            'VendorProducts.vendorId as vendorId',
            'product.productId as productId',
            'product.pincodeBasedDelivery as pincodeBasedDelivery',
            'product.name as name',
            'product.sku as sku',
            'product.price as productprice',
            'product.quantity as quantity',
            'product.sortOrder as sortOrder',
            'product.isActive as isActive',
            'product.productSlug as productSlug',
            'product.hasStock as hasStock',
            'product.hasTirePrice as hasTirePrice',
            'product.outOfStockThreshold as outOfStockThreshold',
            'product.notifyMinQuantity as notifyMinQuantity',
            'product.minQuantityAllowedCart as minQuantityAllowedCart',
            'product.maxQuantityAllowedCart as maxQuantityAllowedCart',
            'product.enableBackOrders as enableBackOrders',
            'product.modifiedDate as modifiedDate',
            'product.isSimplified as isSimplified',
            'product.isSpecification as isSpecification',
            'product.skuId as skuId',
            'VendorProducts.createdDate as createdDate',
            'VendorProducts.modifiedDate as modifiedDate',
            'product.keywords as keywords',
            'product.attributeKeyword as attributeKeyword',
            '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as image',
            '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
        ];
        const relations = [
            {
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            },
        ];
        const whereConditions = [
            {
                name: '(' + 'product.isSimplified',
                op: 'and',
                value: 0,
            },
            {
                name: 'VendorProducts.vendorId',
                op: 'and',
                value: request.user.tenantId,
            },
            {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: ')',
            },
        ];
        if (price && price !== '') {
            whereConditions.push({
                name: 'product.price',
                op: 'and',
                value: price,
            });
        }

        if (status) {
            whereConditions.push({
                name: 'product.isActive',
                op: 'and',
                value: status,
            });
        }
        const searchConditions = [];
        if (keyword) {
            searchConditions.push({
                name: ['product.keywords', 'product.name', 'product.sku'],
                value: keyword.toLowerCase(),
            });
        }

        if (sku && sku !== '') {
            searchConditions.push({
                name: ['product.sku'],
                value: sku.toLowerCase(),
            });
        }

        if (productName && productName !== '') {
            searchConditions.push({
                name: ['product.name'],
                value: productName.toLowerCase(),
            });
        }
        if (updatedDeta) {
            searchConditions.push({
                name: ['VendorProducts.modifiedDate'],
                value: updatedDeta,
            });
        }
        const sort = [];
        sort.push({
            name: 'VendorProducts.createdDate',
            order: 'DESC',
        });
        if (count) {
            const vendorProductListCount: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereConditions, searchConditions, relations, [], sort, true, true);
            const sucResponse: any = {
                status: 1,
                message: 'Successfully got Vendor Product list.',
                data: vendorProductListCount,
            };
            return response.status(200).send(sucResponse);
        }
        const vendorProductList: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereConditions, searchConditions, relations, [], sort, false, true);
        const promise = vendorProductList.map(async (result: any) => {
            let skuValue = undefined;
            if (result.isSimplified === 0) {
                skuValue = await this.productVarientOptionService.findSkuForProductVarient(result.productId);
            }
            const temp: any = result;
            temp.skuValue = skuValue;
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list. ',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // update stock  API
    /**
     * @api {Put} /api/vendor-product-variant/stock Update Stock API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} productId productId
     * @apiParam (Request body) {number} [hasStock] send 0 or 1
     * @apiParam (Request body) {object} [productStock]
     * @apiParam (Request body) {number} productStock.skuId skuId
     * @apiParam (Request body) {number} productStock.outOfStockThreshold for setting out of stock threshold
     * @apiParam (Request body) {number} productStock.notifyMinQuantity notifyMinQuantity
     * @apiParam (Request body) {number} productStock.minQuantityAllowedCart  minQuantityAllowedCart
     * @apiParam (Request body) {number} productStock.maxQuantityAllowedCart maxQuantityAllowedCart
     * @apiParam (Request body) {number} productStock.enableBackOrders enableBackOrders
     * @apiParamExample {json} Input
     * {
     *      "hasStock" : "",
     *      "productId" : 1,
     *      "productStock": [{
     *      "skuId" : 1,
     *      "outOfStockThreshold" : "",
     *      "notifyMinQuantity" : 1,
     *      "minQuantityAllowedCart" : 1,
     *      "maxQuantityAllowedCart" : 1,
     *      "enableBackOrders" : "",
     *      }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully updated stock ",
     *      "data": {
     *       "productId": 1,
     *       "name": "",
     *       "description": "",
     *       "price": "",
     *       "productImage": [
     *           {
     *               "productId": 1,
     *               "image": "",
     *               "containerName": "",
     *               "defaultImage": ""
     *           }
     *     ]
     *       "productVariants": [
     *           {
     *               "id": 1,
     *               "variantId": 1,
     *               "productId": 1
     *           }
     *       ],
     *       "productVariantList": [
     *           {
     *               "id": 1,
     *               "productId": 1,
     *               "skuId": 1,
     *               "varientName": "",
     *               "isActive": 1,
     *               "createdDate": "",
     *               "skuName": "",
     *               "price": 1,
     *               "quantity": 1,
     *               "isActive": 1,
     *               "outOfStockThreshold": "",
     *               "notifyMinQuantity": 1,
     *               "minQuantityAllowedCart": 1,
     *               "maxQuantityAllowedCart": 1,
     *               "enableBackOrders": "",
     *               "vendorId": 1,
     *               "optionImage": [
     *                   {
     *                       "id": 1,
     *                       "image": "",
     *                       "containerName": "",
     *                       "defaultImage": "",
     *                       "productVarientOptionId": 1
     *                   }
     *               ],
     *               "productVarientOptionDetails": [
     *                   {
     *                       "id": "1,
     *                       "productVarientOptionId": 1,
     *                       "variantValueId": 1,
     *                       "productVariantId": 1,
     *                       "value": ""
     *                   }
     *               ],
     *               "discountPrice": [
     *                   {
     *                       "skuId": 1,
     *                       "discount": 1
     *                   }
     *               ],
     *               "specialPrice": [
     *                   {
     *                       "skuId": 1,
     *                       "specialPrice": ""
     *                   }
     *               ]
     *           }
     *       ]
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-variant/stock
     * @apiErrorExample {json} stock error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/stock')
    @Authorized(['vendor', 'update-variant-stock'])
    public async manageStock(@Body({ validate: true }) updateStock: UpdateStockRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const product = await this.productService.findOne({
            where: {
                productId: updateStock.productId,
            },
        });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid product Id.',
            };
            return response.status(400).send(errorResponse);
        }
        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId: updateStock.productId,
                vendorId: request.user.vendorId,
            },
        });
        if (!vendorProduct) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid vendor product Id.',
            });
        }
        product.hasStock = updateStock.hasStock;
        const productStock = updateStock.productStock;
        const valArr: any = [];
        for (const value of productStock) {
            const sku = await this.skuService.findOne({
                where: {
                    id: value.skuId,
                },
            });
            if (!sku) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid sku Id.',
                };
                return response.status(400).send(errorResponse);
            }
            if (sku.quantity < value.outOfStockThreshold) {
                const errorResponse: any = {
                    status: 0,
                    message: 'OutOfStock Threshold should be less than original quantity.',
                };
                return response.status(400).send(errorResponse);
            }
            sku.outOfStockThreshold = value.outOfStockThreshold ? value.outOfStockThreshold : sku.outOfStockThreshold;
            sku.notifyMinQuantity = value.notifyMinQuantity ? value.notifyMinQuantity : sku.notifyMinQuantity;
            sku.minQuantityAllowedCart = value.minQuantityAllowedCart ? value.minQuantityAllowedCart : sku.minQuantityAllowedCart;
            sku.maxQuantityAllowedCart = value.maxQuantityAllowedCart ? value.maxQuantityAllowedCart : sku.maxQuantityAllowedCart;
            sku.enableBackOrders = value.enableBackOrders ? value.enableBackOrders : sku.enableBackOrders;
            sku.backOrderStockLimit = value.backOrderStockLimit ? value.backOrderStockLimit : sku.backOrderStockLimit;
            valArr.push(sku);
        }
        await this.skuService.create(valArr);
        const productValue = await this.productService.create(product);
        if (productValue) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully Updated Stock .',
                data: productValue,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to Update',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Product Varient  API
    /**
     * @api {Delete} /api/vendor-product-variant/:id Delete Product Varient  API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Deleted Product Variant..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-variant/:id
     * @apiErrorExample {json} DeleteProductVarient error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/:id')
    public async deleteProductVarient(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const productVariant = await this.productVarientService.findOne({
            where: {
                id,
            },
        });

        if (!productVariant) {
            return response.status(400).send({
                status: 0,
                message: `Invalid Product Variant Id..!`,
            });
        }

        const productVariantOptionDetail = await this.productVarientOptionDetailService.findAll({
            where: {
                productVariantId: productVariant.id,
            },
        });

        const productVarientOptions = await this.productVarientOptionService.findAll({
            where: {
                id: In(productVariantOptionDetail.map((productVariantOptionDet) => productVariantOptionDet.productVarientOptionId)),
            },
        });

        const orderProductExist: any[] = [];

        for (const productVarientOption of productVarientOptions) {
            const sku = await this.skuService.findOne({
                where: {
                    id: productVarientOption.skuId,
                },
            });
            const orderProduct = await this.orderProductService.productVarientPaymentProcess(sku.skuName);

            if (orderProduct) {
                orderProductExist.push(orderProduct);
            }
        }

        if (orderProductExist.length) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot delete this variant as this particular variants under product is already ordered.',
                data: productVarientOptions,
            };
            return response.status(400).send(errorResponse);
        }

        await this.skuService.bulkDelete({ id: In(productVarientOptions.map((productVarientOption) => productVarientOption.skuId)) });
        await this.productVarientOptionService.bulkDelete({ id: In(productVarientOptions.map((productVarientOption) => productVarientOption.id)) });
        await this.productVarientService.delete(id);

        return response.status(200).send({
            status: 0,
            message: `Successfully Deleted Product Variant..!`,
        });
    }

    // Delete Product Varient Option API
    /**
     * @api {Delete} /api/vendor-product-variant/variant-option/:id Delete Product Varient Option API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted.",
     *      "status": "1",
     *      "data": {
     *         }
     * }
     * @apiSampleRequest /api/vendor-product-variant/variant-option/:id
     * @apiErrorExample {json} DeleteProductVarientOption error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/variant-option/:id')
    @Authorized('vendor')
    public async deleteProductVarientOption(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const productVarientOptionId = await this.productVarientOptionService.findOne({
            where: {
                id,
            },
        });
        if (!productVarientOptionId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Id.',
            };
            return response.status(400).send(errorResponse);
        }
        const sku = await this.skuService.findOne({
            where: {
                id: productVarientOptionId.skuId,
            },
        });
        if (sku) {
            const orderProductId = await this.orderProductService.productVarientPaymentProcess(sku.skuName);
            if (orderProductId) {
                const errorResponse: any = {
                    status: 0,
                    message: 'You cannot delete this variant as this particular variant under product is already ordered.',
                };
                return response.status(400).send(errorResponse);
            }
            await this.skuService.delete({ id: productVarientOptionId.skuId });
        }
        const productVarientOption = await this.productVarientOptionService.delete(id);
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted.',
            data: productVarientOption,
        };
        return response.status(200).send(successResponse);
    }

    // Variants List API
    /**
     * @api {Get} /api/vendor-product-variant/variants Varients List API
     * @apiGroup Variants
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the complete list of varients. ",
     *      "data":{
     *      "id" : 1,
     *      "name" : "",
     *      "type" : "",
     *      "sortOrder" : 1,
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product-variant/variants
     *
     * @apiErrorExample {json} Variantlist error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/variants')
    @Authorized('vendor')
    public async varientsList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['id', 'type', 'name', 'sortOrder'];

        const whereConditions = [{
            name: 'tenantId',
            op: 'and',
            value: request.user.tenantId,
        }];

        const varientsList = await this.varientsService.list(limit, offset, select, [], whereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count',
                data: varientsList,
            };
            return response.status(200).send(successRes);
        }
        const promise = varientsList.map(async (result: any) => {
            const data: any = await this.varientsValueService.find({ where: { variantId: result.id }, order: { sortOrder: 'ASC' } });
            const temp: any = result;
            if (data) {
                temp.varientsValue = data;
                const availablevarientVal = temp.varientsValue.map(async (val: any) => {
                    const availableVarientValue = await this.productVarientOptionDetailService.findOne({
                        where: {
                            variantValueId: val.id,
                        },
                    });
                    if (availableVarientValue) {
                        Object.assign(val, { availedVarientValue: 1 });
                    } else {
                        Object.assign(val, { availedVarientValue: 0 });
                    }
                    return val;
                });
                await Promise.all(availablevarientVal);
            } else {
                temp.varientsValue = [];
            }
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete list of varients. ',
            data: value,
        };
        return response.status(200).send(successResponse);
    }
}
