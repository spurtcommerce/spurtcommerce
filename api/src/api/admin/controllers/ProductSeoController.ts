/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import {
    JsonController, Res, Post, Authorized, Get, QueryParam, Param, Body,
} from 'routing-controllers';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { MSeoMetaService } from '../../core/services/MSeoMetaService';
import { instanceToPlain } from 'class-transformer';
import { MSeoMeta } from '../../core/models/MSeoMetaModel';
import { AddSeoRequest } from '../../../../src/api/admin/controllers/requests/CreateSeoRequest';
import { ProductImageService } from '../../../../src/api/core/services/ProductImageService';
import { SkuService } from '../../../../src/api/core/services/SkuService';
import { ProductDiscountService } from '../../../../src/api/core/services/ProductDiscountService';
import { ProductSpecialService } from '../../../../src/api/core/services/ProductSpecialService';
// import { CheckAddonMiddleware } from '../../../../src/api/core/middlewares/AddonValidationMiddleware';
import { Service } from 'typedi';

@Service()
// @UseBefore(CheckAddonMiddleware)
@JsonController('/product-seo')
export class SeoProductController {

    constructor(
        private productService: ProductService,
        private mSeoMetaService: MSeoMetaService,
        private productImageService: ProductImageService,
        private skuService: SkuService,
        private productDiscountService: ProductDiscountService,
        private productSpecialService: ProductSpecialService
    ) { }

    // Seo Product List
    /**
     * @api {Get} /api/product-seo Seo Product List API
     * @apiGroup Seo
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got the  product list.",
     *      "data": [{
     *      "productId": 1,
     *      "sku": "",
     *      "name": "",
     *      "quantity": 1,
     *      "price": 1,
     *      "skuId": 1,
     *      "productSlug": "",
     *      "isActive": 1,
     *      "image": "",
     *      "containerName": "",
     *      "defaultImage": "",
     *      "sku": "",
     *      "modifiedPrice": 1,
     *      "productDiscount": 1,
     *      "productSpecial": ""
     *         }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-seo
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get()
    @Authorized(['admin', 'product-seo'])
    public async productList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
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
            searchConditions.push(
                {
                    name: ['Product.name'],
                    value: keyword,
                });
        }
        const sort = [{
            name: 'Product.createdDate',
            order: 'DESC',
        }];
        const productLists: any = await this.productService.listByQueryBuilder(limit, offset, select, [], searchConditions, [], [], sort, false, true);
        if (count) {
            const productListCount: any = await this.productService.listByQueryBuilder(limit, offset, select, [], searchConditions, [], [], sort, true, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got product lists count.',
                data: productListCount,
            });
        }
        const productList = productLists.map(async (value: any) => {
            const temp: any = value;
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
            message: 'Successfully got the  product list.',
            data: instanceToPlain(results),
        };
        return response.status(200).send(successResponse);
    }

    // Create/Update Seo  API
    /**
     * @api {Post} /api/product-seo/:productId Create/Update Seo API
     * @apiGroup Seo
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {Number} productId productId
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
     *      "data": {
     *       "seoId": 1,
     *       "metaTagTitle": "",
     *       "metaTagDescription": "",
     *       "metaTagKeyword": "",
     *       "refId": 1,
     *       "seoType": ""
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-seo/:productId
     * @apiErrorExample {json} Update Seo  error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/:productId')
    @Authorized(['admin', 'product-seo'])
    public async updateSeo(@Param('productId') productId: number, @Body({ validate: true }) seo: AddSeoRequest, @Res() response: any): Promise<any> {

        const product = await this.productService.findOne({ where: { productId } });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid product. ',
            };
            return response.status(400).send(errorResponse);
        }

        const updateSeo = await this.mSeoMetaService.findOne({
            where: {
                refId: productId,
                seoType: 'product',
            },
        });
        if (updateSeo) {

            updateSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : product.name;
            updateSeo.metaTagDescription = seo.metaTagDescription ? await this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
            updateSeo.metaTagKeyword = seo.metaTagKeyword;
            updateSeo.refId = productId;
            updateSeo.seoType = 'product';

            await this.mSeoMetaService.update(updateSeo.seoId, updateSeo);
            const successResponse: any = {
                status: 1,
                message: 'SEO Updated successfully',
            };
            return response.status(200).send(successResponse);
        }

        const NewSeo = new MSeoMeta();

        NewSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : product.name;
        NewSeo.metaTagDescription = seo.metaTagDescription ? await this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
        NewSeo.metaTagKeyword = seo.metaTagKeyword;
        NewSeo.refId = productId;
        NewSeo.seoType = 'product';

        const createSeo = await this.mSeoMetaService.create(NewSeo);
        if (createSeo) {
            const successResponse: any = {
                status: 1,
                message: 'SEO created Successfully. ',
                data: createSeo,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create SEO. ',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Seo Detail API
    /**
     * @api {Get} /api/product-seo/:productId Seo Detail API
     * @apiGroup seo
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully got SEO details.",
     *    "data": [{
     *      "productId": 1,
     *      "sku": "",
     *      "name": "",
     *      "productSlug": ""
     *     }]
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/product-seo/:productId
     * @apiErrorExample {json} Seo Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/:productId')
    @Authorized(['admin', 'product-seo'])
    public async seoDetail(@Param('productId') productId: number, @Res() response: any): Promise<any> {
        const product: any = await this.productService.findOne({
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
        product.productImage = await this.productImageService.findOne({
            select: ['image', 'containerName'],
            where: {
                productId: product.productId,
                defaultImage: 1,
            },
        });
        const sku = await this.skuService.findOne({
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
        const discountPrice = await this.productDiscountService.findOne({
            select: ['price'],
            where: {
                productId: product.productId,
                skuId: sku.id,
            },
        });
        const specialPrice = await this.productSpecialService.findOne({
            select: ['price'],
            where: {
                productId: product.productId,
                skuId: sku.id,
            },
        });
        product.seo = await this.mSeoMetaService.findOne({
            where: {
                refId: product.productId,
                seoType: 'product',
            },
        });
        if (specialPrice && specialPrice.price !== null) {
            product.pricerefer = specialPrice.price;
            product.flag = 1;
        } else if (discountPrice && discountPrice.price !== null) {
            product.pricerefer = discountPrice.price;
            product.flag = 0;
        } else {
            product.pricerefer = '';
            product.flag = '';
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got SEO details. ',
            data: product,
        };
        return response.status(200).send(successResponse);
    }
}
