/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { JsonController, Get, QueryParam, Req, Res, UseBefore } from 'routing-controllers';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { ProductRelatedService } from '../../../../src/api/core/services/ProductRelatedService';
import { CheckTokenMiddleware } from '../../../../src/api/core/middlewares/checkTokenMiddleware';
import { ProductToCategoryService } from '../../../../src/api/core/services/ProductToCategoryService';
import { CategoryService } from '../../../../src/api/core/services/CategoryService';
import { instanceToPlain } from 'class-transformer';
import moment from 'moment';
import { Service } from 'typedi';

@Service()
@JsonController('/list')
export class RelatedProductController {
    constructor(
        private productService: ProductService,
        private productRelatedService: ProductRelatedService,
        private productToCategoryService: ProductToCategoryService,
        private categoryService: CategoryService
    ) {
        // --
    }
    // Related Product Showing API
    /**
     * @api {get} /api/list/related-product-list  Related Product List
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId Product Id
     * @apiParam (Request body) {Number} count
     * @apiParamExample {json} Input
     * {
     *      "productId" : 1,
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Related Product List Showing Successfully..!",
     *      "status": "1",
     *      "data": {
     *                       "productId": 1,
     *                       "id": 1,
     *                       "taxType": "",
     *                       "taxValue": "",
     *                       "skuId": 1,
     *                       "price": "",
     *                       "name": "",
     *                       "isSimplified": 1,
     *                       "description": "",
     *                       "quantity": 1,
     *                       "rating": 1,
     *                       "productSlug": "",
     *                       "hasStock": "",
     *                       "outOfStockThreshold": "",
     *                       "containerName": "",
     *                       "image": "",
     *                       "defaultImage": "",
     *                       "skuName": "",
     *                       "productDiscount": 1,
     *                       "productSpecial": "",
     *                       "productNameTrans": "",
     *                       "productDescriptionTrans": "",
     *                       "categoryLevels": [
     *                         {
     *                               "createdDate": "",
     *                               "productToCategoryId": 1,
     *                               "categoryId": 1,
     *                               "categoryName": "",
     *                               "categorySlug": "",
     *                               "parentInt": 1,
     *                               "categoryDescription": ""
     *                         }
     *                     ],
     *                       "pricerefer": "",
     *                       "flag": 1,
     *                       "stockStatus": 1,
     *                       "wishListStatus": 1
     *         }
     * }
     * @apiSampleRequest /api/list/related-product-list
     * @apiErrorExample {json} Related Product List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Category List Function
    @UseBefore(CheckTokenMiddleware)
    @Get('/related-product-list')
    public async relatedProductList(@QueryParam('productId') productid: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
            where: {
                productSlug: productid,
                isActive: 1,
            },
        });
        if (!productDetail) {
            return response.status(400).send({
                status: 1,
                message: 'Invalid product.',
            });
        }
        const currentDate = moment().format('YYYY-MM-DD');
        const selects = ['ProductRelated.relatedProductId as productId',
            'ProductRelated.id as id',
            'product.taxType as taxType',
            'product.taxValue as taxValue',
            'product.skuId as skuId',
            'product.price as price',
            'product.name as name',
            'product.isSimplified as isSimplified',
            'product.isSpecification as isSpecification',
            'product.description as description',
            'product.quantity as quantity',
            'product.productId as productId',
            'product.rating as rating',
            'product.productSlug as productSlug',
            'product.hasStock as hasStock',
            'product.outOfStockThreshold as outOfStockThreshold',
            '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
            '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as image',
            '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
            'IF(product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `product`.`tax_value` AND `product`.`tax_type` = 2 LIMIT 1), (product.taxValue) )  as taxValue',
            '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
            '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
            '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
            ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
            '(SELECT price FROM product_special ps WHERE ps.product_id = product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial'];
        const searchConditions = [];
        const relations = [];
        relations.push({
            tableName: 'ProductRelated.productRelated',
            aliasName: 'product',
        });
        if (request.id) {
            selects.push('customerWishlist.wishlistProductId as wishlistProductId');
            relations.push({
                tableName: 'product.wishlist',
                op: 'leftCond',
                aliasName: 'customerWishlist',
                cond: 'customerWishlist.customerId = ' + request.id,
            });
        }
        const whereConditions = [
            {
                name: 'product.isActive',
                op: 'and',
                value: 1,
            },
            {
                name: 'ProductRelated.productId',
                op: 'and',
                value: productDetail.productId,
            },
            {
                name: 'product.dateAvailable',
                op: 'raw',
                sign: '<=',
                value: currentDate.toString(),
            },
        ];

        const sort = [
            {
                name: 'ProductRelated.id',
                order: 'ASC',
            },
        ];
        if (count) {
            const relatedDataCount: any = await this.productRelatedService.listByQueryBuilder(0, 0, selects, whereConditions, searchConditions, relations, [], sort, true, true);
            const Response: any = {
                status: 1,
                message: 'Related product list is successfully being shown. ',
                data: relatedDataCount,
            };
            return response.status(200).send(Response);
        }
        const relatedData: any = await this.productRelatedService.listByQueryBuilder(0, 0, selects, whereConditions, searchConditions, relations, [], sort, false, true);
        const promises = relatedData.map(async (results: any) => {
            const temp: any = results;
            // const productTranslation = await this.productTranslationService.findOne({ where: { productId: results.productId, languageId: request.languageId ?? 0 } });
            // temp.productNameTrans = productTranslation?.name ?? '';
            // temp.productDescriptionTrans = productTranslation?.description ?? '';
            const product = await this.productToCategoryService.findAll({
                where: {
                    productId: results.productId,
                },
            });
            const categories = product.map(async (val: any) => {
                const categoryData = await this.categoryService.findOne({ where: { categoryId: val.categoryId } });
                const tempVal: any = val;
                tempVal.categoryName = categoryData ? categoryData.name : '';
                tempVal.categoryId = categoryData ? categoryData.categoryId : '';
                tempVal.categorySlug = categoryData ? categoryData.categorySlug : '';
                tempVal.parentInt = categoryData ? categoryData.parentInt : '';
                tempVal.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                return tempVal;
            });
            temp.categoryLevels = await Promise.all(categories);
            if (results.productSpecial !== null) {
                temp.pricerefer = results.productSpecial;
                temp.flag = 1;
            } else if (results.productDiscount !== null) {
                temp.pricerefer = results.productDiscount;
                temp.flag = 0;
            } else {
                temp.pricerefer = '';
                temp.flag = '';
            }
            if (results.hasStock === 1) {
                if (results.quantity <= results.outOfStockThreshold) {
                    temp.stockStatus = 'outOfStock';
                } else {
                    temp.stockStatus = 'inStock';
                }
            } else {
                temp.stockStatus = 'inStock';
            }
            if ((results.wishlistProductId !== null) && results.wishlistProductId) {
                temp.wishListStatus = 1;
            } else {
                temp.wishListStatus = 0;
            }
            return temp;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Related product list is successfully being shown. ',
            data: instanceToPlain(result),
        };
        return response.status(200).send(successResponse);
    }

}
