/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { JsonController, Post, Body, Res, Get, Authorized, QueryParam, Req, Param } from 'routing-controllers';
import { VendorProductService } from '../../../../src/api/core/services/VendorProductService';
import { ProductToCategoryService } from '../../../../src/api/core/services/ProductToCategoryService';
import { CategoryService } from '../../../../src/api/core/services/CategoryService';
import { OrderProductService } from '../../../../src/api/core/services/OrderProductService';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { instanceToPlain } from 'class-transformer';
import { ProductRelated } from '../../../api/core/models/ProductRelated';
import { ProductRelatedService } from '../../../api/core/services/ProductRelatedService';
import { VendorRelatedProductRequest } from './requests/VendorRelatedProductRequest';
import { ProductImageService } from '../../core/services/ProductImageService';
import { In } from 'typeorm';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-related-product')
export class AdminVendorRelatedProductController {
    constructor(
        private vendorProductService: VendorProductService,
        private orderProductService: OrderProductService,
        private relatedProductService: ProductRelatedService,
        private productToCategoryService: ProductToCategoryService,
        private categoryService: CategoryService,
        private productService: ProductService,
        private productImageService: ProductImageService
    ) {
        // --
    }

    // Update Product Related API
    /**
     * @api {Post} /api/vendor-related-product/update-vendor-related-product Update Product Related API
     * @apiGroup Vendor Related Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} relatedProductId relatedProductId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": 1,
     *      "message": "successfully updated the vendor related products",
     *       "data"  :   {
     *          "productId": 1,
     *          "relatedProductId": 1
     *       }
     * }
     * @apiSampleRequest /api/vendor-related-product/update-vendor-related-product
     * @apiErrorExample  {json} ProductRelated error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/update-vendor-related-product')
    @Authorized(['vendor', 'configure-Product-recomandations'])
    public async productRelated(@Body({ validate: true }) productRelatedRequest: VendorRelatedProductRequest, @Res() response: any): Promise<any> {
        const ifExistProduct = await this.productService.findOne({ where: { productId: productRelatedRequest.productId } });
        if (!ifExistProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const ifExistVendorRelated = await this.vendorProductService.findOne({
            where: {
                productId: productRelatedRequest.productId,
            },
        });
        if (!ifExistVendorRelated) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid product id on VendorProduct',
            };
            return response.status(400).send(errorResponse);
        }
        for (const id of productRelatedRequest.relatedProductId) {
            const findVendorRelatedProducts = await this.productService.findOne({
                where: {
                    productId: id,
                },
            });
            if (!findVendorRelatedProducts) {
                const errorResponse: any = {
                    status: 0,
                    message: 'The selected product has an invalid related product ID. Please review and try again.',
                };
                return response.status(400).send(errorResponse);
            }

            const ifExistProductRelatedOnVendorProduct = await this.vendorProductService.findOne(
                {
                    where: {
                        productId: id,
                    },
                }
            );
            if (!ifExistProductRelatedOnVendorProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'The related product ID for this vendor is invalid. Please check and update it.',
                };
                return response.status(400).send(errorResponse);
            }

        }
        const ifExistVendorRelatedProduct = await this.relatedProductService.find({
            where: {
                productId: productRelatedRequest.productId,
            },
        });
        const vendorRelatedProductData: any = [];
        if (ifExistVendorRelatedProduct.length > 0) {
            await this.relatedProductService.delete({ productId: productRelatedRequest.productId });
        }
        for (const id of productRelatedRequest.relatedProductId) {
            const newVendorRelated = new ProductRelated();
            newVendorRelated.productId = productRelatedRequest.productId;
            newVendorRelated.relatedProductId = id;
            vendorRelatedProductData.push(newVendorRelated);
        }
        const updateRelatedProduct = await this.relatedProductService.create(vendorRelatedProductData);
        if (!updateRelatedProduct) {
            const errorStatus = {
                status: 0,
                message: 'Unable to update the vendor related products',
            };
            return response.status(400).send(errorStatus);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully updated the vendor related products.',
            data: vendorRelatedProductData,
        };
        return response.status(200).send(successResponse);
    }
    // Vendor Product List API
    /**
     * @api {Get} /api/vendor-related-product/vendor-related-product-list Vendor related Product List API
     * @apiGroup  Vendor Related Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} status 0->inactive 1-> active
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} price price
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got your product list",
     *      "data":{
     *          "vendorProductId" : 1,
     *          "vendorProductCommission" : "",
     *          "quotationAvailable" : "",
     *          "approvalFlag" : "",
     *          "vendorId" : 1,
     *          "productId" : 1,
     *          "pincodeBasedDelivery" : "",
     *          "name" : "",
     *          "sku" : "",
     *          "skuId" : 1,
     *          "productprice" : "",
     *          "quantity" : 1,
     *          "vendorName" : "",
     *          "price" : 1,
     *          "quantity" : 1,
     *          "sortOrder" : 1,
     *          "sku" : "",
     *          "price" : 1,
     *          "modifiedPrice" : "",
     *          "productDiscount" : 1,
     *          "productSpecial" : ""
     *      }
     * }
     * @apiSampleRequest /api/vendor-related-product/vendor-related-product-list
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendor-related-product-list')
    @Authorized(['vendor', 'list-vendor-product-recommendations'])
    public async vendorProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('productName') productName: string, @QueryParam('sku') sku: string, @QueryParam('status') status: string, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorId = request.user.tenantId;
        const selects = [
            'VendorProducts.vendorProductId as vendorProductId',
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
            '(SELECT price FROM product_special ps WHERE ps.product_id = product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
        ];
        const whereConditions = [
            {
                name: 'vendor.vendorId',
                op: 'and',
                value: vendorId,
            },
            {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            },
        ];
        const relations = [
            {
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            },
            {
                tableName: 'VendorProducts.vendor',
                aliasName: 'vendor',
            },
            {
                tableName: 'vendor.customer',
                aliasName: 'customer',
            },
        ];

        const groupBy = [];

        if (status && status !== '') {
            whereConditions.push({
                name: 'product.isActive',
                op: 'and',
                value: +status,
            });
        }
        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['product.keywords', 'product.name', 'customer.first_name', 'product.sku', 'product.price'],
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
        const sort = [
            {
                name: 'VendorProducts.createdDate',
                order: 'DESC',
            },
        ];

        if (count) {
            const vendorProductListCount: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const sucResponse: any = {
                status: 1,
                message: 'Successfully got Vendor Product list.',
                data: vendorProductListCount,
            };
            return response.status(200).send(sucResponse);
        }
        const vendorProductList: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const productList = vendorProductList.map(async (value: any) => {
            const temp: any = value;
            const categories = await this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: { productId: value.productId },
            }).then((val) => {
                const category = val.map(async (values: any) => {
                    const categoryNames = await this.categoryService.findOne({ where: { categoryId: values.categoryId } });
                    const tempp: any = values;
                    if (categoryNames) {
                        tempp.categoryName = categoryNames.name;
                    } else {
                        tempp.categoryName = '';
                    }
                    return tempp;
                });
                const result = Promise.all(category);
                return result;
            });
            temp.vendorCategory = categories;
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
            const orderProduct = await this.orderProductService.getEarnings(value.productId);
            if (orderProduct) {
                temp.earnings = orderProduct.productPriceTotal;
            } else {
                temp.earnings = '';
            }
            temp.vendorRelatedCount = await this.relatedProductService.productRelatedCount(value.productId);
            return temp;
        });
        const results = await Promise.all(productList);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got your product list.',
            data: results,
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Product Related Detail APIs
    /**
     * @api {Get} /api/vendor-related-product/vendor-related-product-details/:id Vendor Product Related Detail APIs
     * @apiGroup Vendor Related Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 success
     * {
     *      "status": "1",
     *      "message": "Successfully got the vendor related product detail.",
     *      "data": {
     *         "productId": 1,
     *         "description": "",
     *         "sku": "",
     *         "name": "",
     *         "price": 1,
     *         "vendorRelatedProduct": [
     *             {
     *                 "vendorProductId": "1
     *                 "productId": 1,
     *                 "name": "",
     *                 "sku": "",
     *                 "containerName": "",
     *                 "image": ""
     *             },
     *             {
     *                 "vendorProductId":1,
     *                 "productId": 1,
     *                 "name": "",
     *                 "sku": "",
     *                 "containerName": "",
     *                 "image": ""
     *             }
     *         ]
     *     },
     *     "category": [
     *         {
     *             "categoryId": 1,
     *             "name": ""
     *         },
     *         {
     *             "categoryId": 1,
     *             "name": ""
     *         }
     *      ]
     * }
     * @apiSampleRequest /api/vendor-related-product/vendor-related-product-details/:id
     * @apiErrorExample {json} error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/vendor-related-product-details/:id')
    @Authorized('vendor')
    public async vendorRelatedProductDetail(@Param('id') productId: number, @Res() response: any): Promise<any> {
        const ifExistVendorProductDetails = await this.vendorProductService.findOne({ where: { productId } });
        if (!ifExistVendorProductDetails) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid vendor related product id',
            };
            return response.status(400).send(errorResponse);
        }
        const ifExistProduct: any = await this.productService.findOne(
            {
                select: ['productId', 'description', 'sku', 'name', 'price'],
                where: { productId: ifExistVendorProductDetails.productId }, relations: ['productImage'],
            });
        if (!ifExistProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid product id',
            };
            return response.status(400).send(errorResponse);
        }
        // find product category
        const productToCategory = await this.productToCategoryService.findAll({ where: { productId } });
        const category = await this.categoryService.find({ where: { categoryId: In(productToCategory.map((val => val.categoryId))) }, select: ['categoryId', 'name'] });

        ifExistProduct.vendorRelatedProduct = await this.relatedProductService.find({
            select: ['relatedProductId', 'productId'],
            where: { productId },
        }).then((val) => {
            const vendorRelatedData = val.map(async (values) => {
                const vendorProduct = await this.vendorProductService.findOne({ where: { productId: values.relatedProductId }, relations: ['product'] });
                const temp: any = {};
                temp.vendorProductId = vendorProduct.vendorProductId;
                temp.productId = vendorProduct.product.productId;
                temp.name = vendorProduct.product.name;
                temp.sku = vendorProduct.product.sku;
                temp.containerName = (await this.productImageService.findOne({ select: ['containerName'], where: { productId: values.relatedProductId, defaultImage: 1 } })).containerName;
                temp.image = (await this.productImageService.findOne({ select: ['image'], where: { productId: values.relatedProductId, defaultImage: 1 } })).image;
                return instanceToPlain(temp);
            });
            const resultDatas = Promise.all(vendorRelatedData);
            return resultDatas;
        });
        const successResponse = {
            status: 1,
            message: 'Successfully got the vendor related product detail.',
            data: ifExistProduct, category,
        };
        return response.status(200).send(successResponse);
    }
}
