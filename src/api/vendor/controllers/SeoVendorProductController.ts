/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { JsonController, Res, Post, Authorized, Get, QueryParam, Param, Body, Req } from 'routing-controllers';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { MSeoMetaService } from '../../core/services/MSeoMetaService';
import { MSeoMeta } from '../../core/models/MSeoMetaModel';
import { AddSeoRequest } from '../../../../src/api/vendor/controllers/requests/CreateSeoRequest';
import { ProductImageService } from '../../../../src/api/core/services/ProductImageService';
import { SkuService } from '../../../../src/api/core/services/SkuService';
import { ProductDiscountService } from '../../../../src/api/core/services/ProductDiscountService';
import { ProductSpecialService } from '../../../../src/api/core/services/ProductSpecialService';
// import { CheckVendorAddonMiddleware } from '../../../../src/api/core/middlewares/VendorAddonValidationMiddilware';
import { ProductToCategoryService } from '../../../../src/api/core/services/ProductToCategoryService';
import { CategoryService } from '../../../../src/api/core/services/CategoryService';
import { OrderProductService } from '../../../../src/api/core/services/OrderProductService';
import { VendorProductService } from '../../../../src/api/core/services/VendorProductService';
import { Service } from 'typedi';

@Service()
@JsonController('/vendor-product-seo')
export class SeoVendorProductController {

    constructor(
        private productService: ProductService,
        private mSeoMetaService: MSeoMetaService,
        private productImageService: ProductImageService,
        private skuService: SkuService,
        private productDiscountService: ProductDiscountService,
        private productSpecialService: ProductSpecialService,
        private productToCategoryService: ProductToCategoryService,
        private categoryService: CategoryService,
        private orderProductService: OrderProductService,
        private vendorProductServics: VendorProductService
    ) { }

    /**
     * @api {get} /api/vendor-product-seo List Vendor SEO Products
     * @apiGroup Vendor SEO
     * @apiName VendorSeoProductList
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiQuery {Number} [limit] Number of records to return
     * @apiQuery {Number} [offset] Pagination offset
     * @apiQuery {String} [status] Product active status
     * @apiQuery {String} [keyword] Keyword search for product/vendor
     * @apiQuery {String} [price] Filter by product price
     * @apiQuery {String} [approvalFlag] Product approval status
     * @apiQuery {String} [productName] Filter by product name
     * @apiQuery {String} [vendorName] Filter by vendor name
     * @apiQuery {String} [sortBy] Field to sort by ('productName', 'stock', 'sku', 'modifiedDate', 'createdDate')
     * @apiQuery {String} [updatedOn] Filter by modified date
     * @apiQuery {String} [sortOrder] Sort order ('ASC' or 'DESC')
     * @apiQuery {Number} [count] Return count only if 1
     * @apiQuery {String} [sku] Filter by SKU
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got your product list.",
     *         "data": [
     *             {
     *                 "vendorProductId": 1,
     *                 "productId": 1,
     *                 "name": "Product Name",
     *                 "sku": "SKU001",
     *                 "price": 100,
     *                 "isActive": 1,
     *                 "vendorCategory": []
     *             }
     *         ]
     *     }
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal Server Error
     *     {
     *         "status": 0,
     *         "message": "Internal Server Error"
     *     }
     *
     * @apiSampleRequest /api/vendor-product-seo
     */
    @Get()
    @Authorized(['vendor', 'seo-product'])
    public async vendorProductList(
        @QueryParam('limit') limit: number,
        @QueryParam('offset') offset: number,
        @QueryParam('status') status: string,
        @QueryParam('keyword') keyword: string,
        @QueryParam('price') price: string,
        @QueryParam('approvalFlag') approvalFlag: string,
        @QueryParam('productName') productName: string,
        @QueryParam('vendorName') vendorName: string,
        @QueryParam('sortBy') sortBy: string,
        @QueryParam('updatedOn') updatedOn: string,
        @QueryParam('sortOrder') sortOrder: string,
        @QueryParam('count') count: number,
        @QueryParam('sku') sku: string,
        @Req() request: any): Promise<any> {

        const selects = [
            'VendorProducts.vendorProductId as vendorProductId',
            'VendorProducts.vendorProductCommission as vendorProductCommission',
            'VendorProducts.quotationAvailable as quotationAvailable',
            'VendorProducts.approvalFlag as approvalFlag',
            'VendorProducts.rejectReason as rejectReason',
            'vendor.vendorId as vendorId',
            'product.productId as productId',
            'product.name as name',
            'product.sku as sku',
            'product.skuId as skuId',
            'product.price as productprice',
            'product.quantity as quantity',
            'customer.firstName as vendorName',
            'product.sortOrder as sortOrder',
            'product.isActive as isActive',
            'product.productSlug as productSlug',
            'product.width as width',
            'product.height as height',
            'product.length as length',
            'product.weight as weight',
            'VendorProducts.createdDate as createdDate',
            'VendorProducts.modifiedDate as modifiedDate',
            'product.keywords as keywords',
            'product.isSimplified as isSimplified',
            'product.isSpecification as isSpecification',
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
        const whereConditions = [
            {
                name: 'vendor.vendorId',
                op: 'and',
                value: request.user.tenantId,
            },
            {
                name: 'VendorProducts.reuse',
                op: 'IS NULL',
                value: '',
            },
        ];
        if (status && status !== '') {
            whereConditions.push({
                name: 'product.isActive',
                op: 'and',
                value: +status,
            });
        }
        if (approvalFlag && approvalFlag !== '') {
            whereConditions.push({
                name: 'VendorProducts.approvalFlag',
                op: 'and',
                value: +approvalFlag,
            });
        }
        const searchConditions = [];
        if (keyword) {
            searchConditions.push({
                name: ['product.keywords', 'product.name', 'customer.first_name'],
                value: keyword.toLowerCase(),
            });
        } else if (!keyword) {
            if (productName?.trim()) {
                searchConditions.push({
                    name: ['product.name'],
                    value: productName.toLowerCase(),
                });
            }
            if (vendorName?.trim()) {
                searchConditions.push({
                    name: ['customer.first_name'],
                    value: vendorName.toLowerCase(),
                });
            }
            if (sku?.trim()) {
                searchConditions.push({
                    name: ['product.sku'],
                    value: sku.toLowerCase(),
                });
            }
            if (updatedOn?.trim()) {
                searchConditions.push({
                    name: ['VendorProducts.modifiedDate'],
                    value: updatedOn,
                });
            }
            if (price) {
                whereConditions.push({
                    name: 'product.price',
                    op: 'and',
                    value: price,
                });
            }
        }
        const sorts = [];
        if (sortBy === 'productName') {
            sorts.push({
                name: 'product.name',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'stock') {
            sorts.push({
                name: 'product.quantity',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'sku') {
            sorts.push({
                name: 'product.sku',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'modifiedDate') {
            sorts.push({
                name: 'VendorProducts.modifiedDate',
                order: sortOrder ?? 'DESC',
            });
        }
        if (sortBy === 'createdDate' || !sortBy || sortBy === 'orderId') {
            sorts.push({
                name: 'VendorProducts.createdDate',
                order: 'DESC',
            });
        }
        if (count) {
            const vendorProductListCount: any = await this.vendorProductServics.listByQueryBuilder(limit, offset, selects, whereConditions, searchConditions, relations, [], sorts, true, true);
            return {
                status: 1,
                message: 'Successfully got vendor product count.',
                data: vendorProductListCount,
            };
        }
        const vendorProductList: any = await this.vendorProductServics.listByQueryBuilder(limit, offset, selects, whereConditions, searchConditions, relations, [], sorts, false, true);
        const productList = vendorProductList.map(async (value: any) => {
            const temp: any = value;
            const categories = await this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: { productId: value.productId },
            }).then((val) => {
                const category = val.map(async (values: any) => {
                    const categoryNames: any = await this.categoryService.findOne({ where: { categoryId: values.categoryId } });
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
            const orderProduct = await this.orderProductService.getOrderEarnings(value.productId);
            if (orderProduct) {
                temp.earnings = orderProduct.productPriceTotal;
            } else {
                temp.earnings = '';
            }
            return temp;
        });
        return {
            status: 1,
            message: 'Successfully got your product list.',
            data: await Promise.all(productList),
        };
    }

    /**
     * @api {post} /api/vendor-product-seo/:productId Create or Update Product SEO
     * @apiGroup Vendor SEO
     * @apiName VendorUpdateProductSeo
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} productId Product ID
     *
     * @apiBody {String} [metaTagTitle] Meta title (max 140 chars)
     * @apiBody {String} [metaTagDescription] Meta description (max 160 chars)
     * @apiBody {String} [metaTagKeyword] Meta keywords (max 255 chars)
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Seo Updated successfully"
     *     }
     *
     * @apiErrorExample {json} Invalid-Product:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid product. "
     *     }
     *
     * @apiSampleRequest /api/vendor-product-seo/:productId
     */
    @Post('/:productId')
    @Authorized(['vendor', 'seo-product'])
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
                message: 'Seo Updated successfully',
            };
            return response.status(200).send(successResponse);
        }

        const newSeo = new MSeoMeta();
        newSeo.metaTagTitle = seo.metaTagTitle ? seo.metaTagTitle : product.name;
        newSeo.metaTagDescription = seo.metaTagDescription ? await this.mSeoMetaService.escapeChar(seo.metaTagDescription) : '';
        newSeo.metaTagKeyword = seo.metaTagKeyword;
        newSeo.refId = productId;
        newSeo.seoType = 'product';

        const createSeo = await this.mSeoMetaService.create(newSeo);
        if (createSeo) {
            const successResponse: any = {
                status: 1,
                message: 'Seo created Successfully.',
                data: createSeo,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create Seo.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /**
     * @api {get} /api/vendor-product-seo/:productId Get Product SEO Details
     * @apiGroup Vendor SEO
     * @apiName VendorProductSeoDetail
     *
     * @apiHeader {String} Authorization Bearer Token
     *
     * @apiParam (Path) {Number} productId Product ID
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *         "status": 1,
     *         "message": "Successfully got Seo details.",
     *         "data": {
     *             "productId": 1,
     *             "name": "Product Name",
     *             "sku": "SKU001",
     *             "productSlug": "product-name",
     *             "price": 100,
     *             "seo": {
     *                 "seoId": 1,
     *                 "metaTagTitle": "Meta Title",
     *                 "metaTagDescription": "Meta Description",
     *                 "metaTagKeyword": "keywords",
     *                 "refId": 1,
     *                 "seoType": "product"
     *             }
     *         }
     *     }
     *
     * @apiErrorExample {json} Product-Not-Found:
     *     HTTP/1.1 400 Bad Request
     *     {
     *         "status": 0,
     *         "message": "Invalid product ID."
     *     }
     *
     * @apiSampleRequest /api/vendor-product-seo/:productId
     */
    @Get('/:productId')
    @Authorized(['vendor', 'seo-product'])
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
                message: 'Invalid product ID.',
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
            message: 'Successfully got Seo details.',
            data: product,
        };
        return response.status(200).send(successResponse);
    }
}
