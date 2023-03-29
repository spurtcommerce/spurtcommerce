/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, JsonController, Res, Req, QueryParam, Body, Post, QueryParams, UseBefore } from 'routing-controllers';
import { MAILService } from '../../../auth/mail.services';
import { classToPlain } from 'class-transformer';
import { CategoryService } from '../../core/services/CategoryService';
import { ProductService } from '../../core/services/ProductService';
import arrayToTree from 'array-to-tree';
import { CountryService } from '../../core/services/CountryService';
import { ContactService } from '../../core/services/ContactService';
import { ContactRequest } from './requests/ContactRequest';
import { Contact } from '../../core/models/Contact';
import { EmailTemplateService } from '../../core/services/EmailTemplateService';
import { ZoneService } from '../../core/services/zoneService';
import { LanguageService } from '../../core/services/LanguageService';
import { CategoryPathService } from '../../core/services/CategoryPathService';
import { PluginService } from '../../core/services/PluginService';
import { UserService } from '../../core/services/UserService';
import { OrderStatusService } from '../../core/services/OrderStatusService';
import { OrderProductService } from '../../core/services/OrderProductService';
import { OrderProductLogService } from '../../core/services/OrderProductLogService';
import { SettingService } from '../../core/services/SettingService';
import { env } from '../../../env';
import { ListRequest } from './requests/ListRequest';
import moment = require('moment');
import { CheckTokenMiddleware } from '../../core/middlewares/checkTokenMiddleware';
@JsonController('/list')
export class CommonListController {
    constructor(
        private categoryService: CategoryService,
        private productService: ProductService, private languageService: LanguageService, private countryService: CountryService, private contactService: ContactService,
        private emailTemplateService: EmailTemplateService,
        private zoneService: ZoneService,
        private categoryPathService: CategoryPathService, private pluginService: PluginService,
        private userService: UserService, private orderStatusService: OrderStatusService, private settingsService: SettingService,
        private orderProductService: OrderProductService, private orderProductLogService: OrderProductLogService
    ) {
    }

    // Category List Tree API
    /**
     * @api {get} /api/list/category-list Category List Tree API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "keyorder": "",
     *      "sortOrder": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "category list shown successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/category-list
     * @apiErrorExample {json} Category List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Category List Function
    @Get('/category-list')
    public async ParentCategoryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'categorySlug', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const WhereConditions = [];
        const categoryData = await this.categoryService.list(limit, offset, select, search, WhereConditions, sortOrder, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get All category List',
                data: categoryData,
            };
            return response.status(200).send(successResponse);
        } else {
            const categoryList = arrayToTree(categoryData, {
                parentProperty: 'parentInt',
                customID: 'categoryId',
            });
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the list of categories.',
                data: categoryList,
            };
            return response.status(200).send(successResponse);
        }
    }

    // Custom Product List API
    /**
     * @api {get} /api/list/custom-product-list Custom Product List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} categoryslug categoryslug
     * @apiParam (Request body) {Number} priceFrom price from you want to list
     * @apiParam (Request body) {Number} priceTo price to you want to list
     * @apiParam (Request body) {String} price ASC OR DESC
     * @apiParam (Request body) {String} keyword keyword
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/list/custom-product-list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    // @UseBefore(CheckTokenMiddleware)
    @Get('/custom-product-list')
    public async customProductList(
        @QueryParams() params: ListRequest,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {
        return new Promise(async () => {
            const limit = params.limit;
            const offset = params.offset;
            const selects = ['Product.productId as productId',
                'Product.taxType as taxType',
                'Product.taxValue as taxValue',
                'Product.name as name',
                'Product.price as price',
                'Product.description as description',
                'Product.dateAvailable as dateAvailable',
                'Product.sku as sku',
                'Product.skuId as skuId',
                'Product.isSimplified as isSimplified',
                'Product.upc as upc',
                'Product.quantity as quantity',
                'Product.isActive as isActive',
                'Product.productSlug as productSlug',
                'Product.hasStock as hasStock',
                'Product.outOfStockThreshold as outOfStockThreshold',
                'Product.createdDate as createdDate',
                'Product.keywords as keywords',
                'Product.attributeKeyword as attributeKeyword',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                'IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )  as taxValue',
                '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
            ];
            const whereCondition = [];
            const currentDate = moment().format('YYYY-MM-DD');
            const relations = [];
            const groupBy = [];
            groupBy.push({
                name: 'Product.productId',
            });
            if (params.categoryslug === '' || params.categoryslug === undefined) {
                whereCondition.push({
                    name: 'Product.isActive',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'Product.dateAvailable',
                    op: 'raw',
                    sign: '<=',
                    value: currentDate.toString(),
                });
            } else {
                relations.push({
                    tableName: 'Product.productToCategory',
                    op: 'left',
                    aliasName: 'productToCategory',
                }, {
                    tableName: 'productToCategory.category',
                    op: 'left',
                    aliasName: 'category',
                });
                whereCondition.push({
                    name: 'Product.isActive',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'category.category_slug',
                    op: 'and',
                    value: '"' + params.categoryslug + '"',
                }, {
                    name: 'Product.dateAvailable',
                    op: 'raw',
                    sign: '<=',
                    value: currentDate.toString(),
                });
            }
            if (request.id) {
                selects.push('MAX(customerWishlist.wishlistProductId) as wishlistProductId');
                relations.push({
                    tableName: 'Product.wishlist',
                    op: 'leftCond',
                    aliasName: 'customerWishlist',
                    cond: 'customerWishlist.customerId = ' + request.id,
                });
            }
            const searchConditions = [];
            if (params.keyword) {
                searchConditions.push({
                    name: ['Product.keywords', 'Product.name'],
                    value: params.keyword.toLowerCase(),
                });
            }

            if (params.priceFrom) {
                whereCondition.push({
                    name: '(CASE WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)) + (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = ' +
                        ' Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) + IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )) ' +
                        ' WHEN (((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                        'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                        'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) WHEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))'
                        + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)' +
                        ' WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN (`Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT sku.price as price FROM sku WHERE sku.id = Product.skuId)) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                        ' Product.skuId) WHEN (`Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                        'Product.skuId)) ELSE (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                        'Product.skuId) END)',
                    op: 'raw',
                    sign: '>=',
                    value: params.priceFrom,
                });
            }
            if (params.priceTo) {
                whereCondition.push({
                    name: '(CASE WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)) + (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = ' +
                        ' Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) + IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )) ' +
                        ' WHEN (((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                        'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                        'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) WHEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                        'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))'
                        + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)' +
                        ' WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN (`Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT sku.price as price FROM sku WHERE sku.id = Product.skuId)) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                        ' Product.skuId) WHEN (`Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                        'Product.skuId)) ELSE (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                        'Product.skuId) END)',
                    op: 'raw',
                    sign: '<=',
                    value: params.priceTo,
                });
            }
            const sort = [];
            if (params.price) {
                sort.push({
                    name: '(CASE WHEN ((productSpecial IS NOT NULL) AND `Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * productSpecial) + productSpecial WHEN ((productSpecial IS NOT NULL) AND `Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (productSpecial + taxValue) ' +
                        ' WHEN ((productDiscount IS NOT NULL) AND `Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * productDiscount) + productDiscount WHEN (productDiscount IS NOT NULL AND `Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue + productDiscount) WHEN (productSpecial IS NOT NULL) THEN productSpecial' +
                        ' WHEN (productDiscount IS NOT NULL) THEN productDiscount WHEN (`Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * modifiedPrice) + modifiedPrice WHEN (`Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue + modifiedPrice) ELSE modifiedPrice END)',
                    order: params.price,
                });
            } else {
                sort.push({
                    name: 'Product.sortOrder',
                    order: 'ASC',
                });
            }
            const productList: any = await this.productService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
            const promises = productList.map(async (result: any) => {
                const temp: any = result;
                temp.taxValue = +result.taxValue;
                if (result.productSpecial !== null) {
                    temp.pricerefer = result.productSpecial;
                    temp.flag = 1;
                } else if (result.productDiscount !== null) {
                    temp.pricerefer = result.productDiscount;
                    temp.flag = 0;
                } else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
                if (result.hasStock === 1) {
                    if (result.quantity <= result.outOfStockThreshold) {
                        temp.stockStatus = 'outOfStock';
                    } else {
                        temp.stockStatus = 'inStock';
                    }
                } else {
                    temp.stockStatus = 'inStock';
                }
                if ((result.wishlistProductId !== null) && result.wishlistProductId) {
                    temp.wishListStatus = 1;
                } else {
                    temp.wishListStatus = 0;
                }
                return temp;
            });
            const finalResult = await Promise.all(promises);
            let categoryLevel;
            if (params.categoryslug) {
                const category = await this.categoryService.findOne({ categorySlug: params.categoryslug, isActive: 1 });
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
                    categoryLevel = categoryLevels;
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Invalid category',
                    };
                    return response.status(400).send(errorResponse);
                }
            } else {
                categoryLevel = '';
            }
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the complete list of products.',
                data: finalResult,
                categoryLevel,
            };
            return response.status(200).send(successResponse);
        });
    }

    // Country List API
    /**
     * @api {get} /api/list/country-list Country List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get country list",
     *      "data":{
     *      "countryId"
     *      "name"
     *      "isoCode2"
     *      "isoCode3"
     *      "addressFormat"
     *      "postcodeRequired"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/country-list
     * @apiErrorExample {json} countryFront error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/country-list')
    public async countryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['countryId', 'name', 'isoCode2', 'isoCode3', 'postcodeRequired', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const WhereConditions = [];
        const countryList = await this.countryService.list(limit, offset, select, search, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the list of countries.',
            data: countryList,
        };
        return response.status(200).send(successResponse);

    }

    // Contact Us API
    /**
     * @api {post} /api/list/contact-us  Contact Us API
     * @apiGroup Store List
     * @apiParam (Request body) {String{..255}} name Name
     * @apiParam (Request body) {String{..96}} email Email
     * @apiParam (Request body) {String{..15}} phoneNumber Phone Number
     * @apiParam (Request body) {String{..6}} message Message
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "email" : "",
     *      "phoneNumber" : "",
     *      "message" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your mail send to admin..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/contact-us
     * @apiErrorExample {json} Contact error
     * HTTP/1.1 500 Internal Server Error
     */
    // ContactUs Function
    @Post('/contact-us')
    public async userContact(@Body({ validate: true }) contactParam: ContactRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const contactInformation = new Contact();
        contactInformation.name = contactParam.name;
        contactInformation.email = contactParam.email;
        contactInformation.phoneNumber = contactParam.phoneNumber;
        contactInformation.message = contactParam.message;
        const informationData = await this.contactService.create(contactInformation);
        const emailContent = await this.emailTemplateService.findOne(3);
        const logo = await this.settingsService.findOne();
        const message = emailContent.content.replace('{name}', informationData.name).replace('{email}', informationData.email).replace('{phoneNumber}', informationData.phoneNumber).replace('{message}', informationData.message);
        const adminId: any = [];
        const adminUser = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1 } });
        for (const user of adminUser) {
            const val = user.username;
            adminId.push(val);
        }
        const redirectUrl = env.storeRedirectUrl;
        const mailContent: any = {};
        mailContent.logo = logo;
        mailContent.emailContent = message;
        mailContent.redirectUrl = redirectUrl;
        mailContent.productDetailData = undefined;
        const sendMailRes = MAILService.sendMail(mailContent, adminId, emailContent.subject, false, false, '');
        if (sendMailRes) {
            const successResponse: any = {
                status: 1,
                message: 'Thanks for reaching out. We will be in touch soon',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Mail does not send',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Zone List API
    /**
     * @api {get} /api/list/zone-list Zone List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} countryId countryId
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get zone list",
     *      "data":{
     *      "countryId"
     *      "code"
     *      "name"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/zone-list
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/zone-list')
    public async zonelist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('countryId') countryId: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['zoneId', 'countryId', 'code', 'name', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        if (countryId) {
            search.push({
                name: 'countryId',
                op: 'where',
                value: countryId,
            });
        }
        const WhereConditions = [];
        const relation = ['country'];

        const zoneList = await this.zoneService.list(limit, offset, select, search, WhereConditions, relation, count);
        if (zoneList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get all zone List',
                data: classToPlain(zoneList),
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to get zone List',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Language List API
    /**
     * @api {get} /api/list/language-list Language List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got language list",
     *      "data":{
     *      "languageId"
     *      "name"
     *      "status"
     *      "code"
     *      "sortOrder"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/language-list
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/language-list')
    public async languageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['languageId', 'name', 'code', 'image', 'imagePath', 'isActive', 'sortOrder', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const WhereConditions = [];
        const languageList = await this.languageService.list(limit, offset, select, search, WhereConditions, count);
        if (languageList) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the complete language list.',
                data: languageList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to show language list',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Specific parent Category List API
    /**
     * @api {get} /api/list/specific-category-list Specific Category List
     * @apiGroup Store List
     * @apiParam (Request body) {String} categorySlug categorySlug
     * @apiParamExample {json} Input
     * {
     *      "parentInt" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Category listed successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/specific-category-list
     * @apiErrorExample {json} Category List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Category List Function
    @Get('/specific-category-list')
    public async SpecificcategoryList(@QueryParam('categorySlug') categorySlugParam: string, @Req() request: any, @Res() response: any): Promise<any> {
        const categoryDataId = await this.categoryService.findOne({
            where: {
                categorySlug: categorySlugParam,
            },
        });
        if (categoryDataId === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid categoryId',
            };
            return response.status(400).send(errorResponse);
        }
        const categoryDetailId = await this.categoryPathService.findOne({ categoryId: categoryDataId.categoryId, level: 0 });
        const select = ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'categorySlug'];
        const search = [
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const categoryData = await this.categoryService.list(0, 0, select, search, 0, 0, 0);
        const categoryList = arrayToTree(categoryData, {
            parentProperty: 'parentInt',
            customID: 'categoryId',
        });
        const mainCategoryId = categoryDetailId.pathId;
        let dataList;
        const key = 'categoryId';
        for (const data of categoryList) {
            if (data[key] === mainCategoryId) {
                dataList = data;
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully get the related category List',
            data: dataList,
        };
        return response.status(200).send(successResponse);
    }

    // get payment setting API
    /**
     * @api {get} /api/list/get-payment-setting Get payment setting API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got payment setting",
     *      "data":{
     *      "plugin_name"
     *      "plugin_avatar"
     *      "plugin_avatar_path"
     *      "plugin_type"
     *      "plugin_status"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/get-payment-setting
     * @apiErrorExample {json} get payment setting error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/get-payment-setting')
    public async paymentSettingList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['id', 'pluginName', 'pluginAvatar', 'pluginAvatarPath', 'pluginType', 'pluginAdditionalInfo', 'pluginStatus'];

        const search = [
            {
                name: 'pluginType',
                op: 'like',
                value: keyword,
            },
            {
                name: 'pluginStatus',
                op: 'where',
                value: 1,
            },
        ];
        const WhereConditions = [];
        const paymentSettingList = await this.pluginService.list(limit, offset, select, search, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got payment List.',
            data: paymentSettingList,
        };
        return response.status(200).send(successResponse);

    }

    // Active product count API
    /**
     * @api {get} /api/list/product-count  Product Count API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword for search
     * @apiParam (Request body) {String} categoryslug categoryslug
     * @apiParam (Request body) {Number} priceFrom price from you want to list
     * @apiParam (Request body) {Number} priceTo price to you want to list
     * @apiParam (Request body) {String} variant
     * @apiParam (Request body) {String} attribute
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Product Count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/product-count
     * @apiErrorExample {json} product count error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(CheckTokenMiddleware)
    @Get('/product-count')
    public async productCount(@QueryParams() params: ListRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const currentDate = moment().format('YYYY-MM-DD');
        const maximum: any = ['Max(product.price) As maximumProductPrice'];
        const maximumPrice: any = await this.productService.productMaxPrice(maximum);
        const productPrice: any = maximumPrice.maximumProductPrice;
        const limit = params.limit;
        const offset = params.offset;
        const selects = ['Product.productId as productId',
            'Product.taxType as taxType',
            'Product.taxValue as taxValue',
            'Product.name as name',
            'Product.price as price',
            'Product.description as description',
            'Product.dateAvailable as dateAvailable',
            'Product.sku as sku',
            'Product.skuId as skuId',
            'Product.isSimplified as isSimplified',
            'Product.upc as upc',
            'Product.quantity as quantity',
            'Product.rating as rating',
            'Product.isActive as isActive',
            'Product.productSlug as productSlug',
            'Product.hasStock as hasStock',
            'Product.outOfStockThreshold as outOfStockThreshold',
            'Product.createdDate as createdDate',
            'Product.keywords as keywords',
            'Product.attributeKeyword as attributeKeyword',
            '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
            '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
            '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
            'IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )  as taxValue',
            '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
            '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
            '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as modifiedPrice',
            '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
            ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
            '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
        ];
        const whereCondition = [];
        const relations = [];
        const groupBy = [];
        if (params.categoryslug === '' || params.categoryslug === undefined) {
            whereCondition.push({
                name: 'Product.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'Product.dateAvailable',
                op: 'raw',
                sign: '<=',
                value: currentDate.toString(),
            });
        } else {
            relations.push({
                tableName: 'Product.productToCategory',
                op: 'left',
                aliasName: 'productToCategory',
            }, {
                tableName: 'productToCategory.category',
                op: 'left',
                aliasName: 'category',
            });
            whereCondition.push({
                name: 'Product.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'category.category_slug',
                op: 'and',
                value: '"' + params.categoryslug + '"',
            }, {
                name: 'Product.dateAvailable',
                op: 'raw',
                sign: '<=',
                value: currentDate.toString(),
            });
        }

        if (request.id) {
            selects.push('customerWishlist.wishlistProductId as wishlistProductId');
            relations.push({
                tableName: 'Product.wishlist',
                op: 'leftCond',
                aliasName: 'customerWishlist',
                cond: 'customerWishlist.customerId = ' + request.id,
            });
        }
        const searchConditions = [];
        if (params.keyword) {
            searchConditions.push({
                name: ['Product.keywords', 'Product.name'],
                value: params.keyword.toLowerCase(),
            });
        }

        if (params.priceFrom) {
            whereCondition.push({
                name: '(CASE WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)) + (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = ' +
                    ' Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) + IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )) ' +
                    ' WHEN (((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                    'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                    'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) WHEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))'
                    + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)' +
                    ' WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN (`Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT sku.price as price FROM sku WHERE sku.id = Product.skuId)) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    ' Product.skuId) WHEN (`Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    'Product.skuId)) ELSE (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    'Product.skuId) END)',
                op: 'raw',
                sign: '>=',
                value: params.priceFrom,
            });
        }
        if (params.priceTo) {
            whereCondition.push({
                name: '(CASE WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)) + (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) WHEN (((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = ' +
                    ' Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) + IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )) ' +
                    ' WHEN (((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) AND `Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                    'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL AND `Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = ' +
                    'Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1)) WHEN ((SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' +
                    'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = Product.skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))'
                    + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1)' +
                    ' WHEN ((SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) IS NOT NULL) THEN (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = Product.skuId AND ((pd2.date_start <= CURDATE() AND pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) WHEN (`Product`.`tax_type` = 2 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue )/100 * (SELECT sku.price as price FROM sku WHERE sku.id = Product.skuId)) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    ' Product.skuId) WHEN (`Product`.`tax_type` = 1 AND (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != 0 || IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) != NULL)) THEN (IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value`  LIMIT 1), Product.taxValue ) + (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    'Product.skuId)) ELSE (SELECT sku.price as price FROM sku WHERE sku.id = ' +
                    'Product.skuId) END)',
                op: 'raw',
                sign: '<=',
                value: params.priceTo,
            });
        }
        const sort = [];
        if (params.price) {
            sort.push({
                name: '(CASE WHEN ((productSpecial IS NOT NULL) AND `Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * productSpecial) + productSpecial WHEN ((productSpecial IS NOT NULL) AND `Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (productSpecial + taxValue) ' +
                    ' WHEN ((productDiscount IS NOT NULL) AND `Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * productDiscount) + productDiscount WHEN (productDiscount IS NOT NULL AND `Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue + productDiscount) WHEN (productSpecial IS NOT NULL) THEN productSpecial' +
                    ' WHEN (productDiscount IS NOT NULL) THEN productDiscount WHEN (`Product`.`tax_type` = 2 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue/100 * modifiedPrice) + modifiedPrice WHEN (`Product`.`tax_type` = 1 AND (taxValue != 0 || taxValue != NULL)) THEN (taxValue + modifiedPrice) ELSE modifiedPrice END)',
                order: params.price,
            });
        } else {
            sort.push({
                name: 'Product.sortOrder',
                order: 'ASC',
            });
        }
        const productList: any = await this.productService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Product Count',
            data: {
                productCount: productList,
                maximumProductPrice: productPrice,
            },
        };
        return response.status(200).send(successResponse);

    }

    // order log List API
    /**
     * @api {get} /api/list/orderLoglist Order Log List API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderPrefixId orderPrefixId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order log list",
     *      "data":{
     *      "orderStatus" : "",
     *      "createdDate" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/orderLoglist
     * @apiErrorExample {json} order log error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/orderLoglist')
    public async listOrderLog(@QueryParam('orderPrefixId') orderProductPrefixId: string, @Res() response: any): Promise<any> {
        const orderProductData = await this.orderProductService.findOne({
            where: {
                orderProductPrefixId,
            },
        });
        if (!orderProductData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid OrderProductId',
            };
            return response.status(400).send(errorResponse);
        }
        const orderProductId = orderProductData.orderProductId;
        const select = ['orderProductId', 'orderStatusId', 'total', 'createdDate', 'modifiedDate'];
        const relation = [];
        const WhereConditions = [
            {
                name: 'orderProductId',
                op: 'where',
                value: orderProductId,
            },
        ];
        const orderProductList = await this.orderProductLogService.list(0, 0, select, relation, WhereConditions, 0);
        const orderStatuss = await this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1 } });
        const orderProduct = orderStatuss.map(async (value: any) => {
            const user = orderProductList.find(item => item.orderStatusId === value.orderStatusId);
            const temp: any = value;
            if (user === undefined) {
                temp.createdDate = '';
            } else {
                temp.createdDate = user.createdDate;
            }
            return temp;
        });
        const result = await Promise.all(orderProduct);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete order Log list.',
            data: result,
        };
        return response.status(200).send(successResponse);
    }

    // Plugin list
    /**
     * @api /api/list/get-addons Plugin List
     * @apiGroup Store
     * @apiParam (Request Body) {number} limit limit
     * @apiParam (Request Body) {number} offset offset
     * @apiParam (Request Body) {number} count count
     * @apiSuccessExample {json} success
     * HTTP/1.1 200 Ok
     * {
     *      "status": "1",
     *      "message": "Successfully get the plugin list. ",
     *      "data": {}
     * }
     * @apiSampleRequest /api/list/get-addons
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server error
     */

    @Get('/get-addons')
    public async PluginList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const pluginList = await this.pluginService.pluginList(limit, offset, count);
        if (!pluginList) {
            const errorMessage = {
                status: 0,
                message: 'Unable to get the plugin list. ',
            };
            return response.status(400).send(errorMessage);
        }
        const values = {};
        for (const value of pluginList) {
            values[value.slugName] = value.pluginStatus;
        }
        return response.status(200).send({ status: 1, message: 'Successfully get the list', data: values });
    }

    // gmap redirect url

    /**
     * @api {Get} /api/list/gmap-key Get client id
     * @apiGroup Store
     * @apiParam (Request body) {string} pluginName pluginName
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 Ok
     * @apiSampleRequest /api/list/gmap-key
     * @apiErrorExample {json} Error
     * HTTP/1.1 500 Internal server errorS
     */
    @Get('/gmap-key')
    public async gmapKey(@QueryParam('pluginName') pluginName: string, @Res() response: any): Promise<any> {
        if (pluginName === 'gmap') {
            const plugin = await this.pluginService.findOne({ where: { pluginName, pluginStatus: 1 } });
            if (plugin) {
                const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
                const route = env.baseUrl + pluginInfo.defaultRoute;
                const successResponse: any = {
                    status: 1,
                    message: 'Redirect to this url.',
                    data: {
                        returnPath: route,
                        clientId: pluginInfo.clientId,
                    },
                };
                return response.status(200).send(successResponse);
            } else {
                const successResponse: any = {
                    status: 0,
                    message: 'You are not install this plugin or problem in installation',
                };
                return response.status(400).send(successResponse);
            }
        }
    }
}
