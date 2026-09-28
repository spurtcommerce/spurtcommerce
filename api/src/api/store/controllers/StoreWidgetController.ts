/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Get, JsonController, Res, Req, QueryParam, Param, UseBefore } from 'routing-controllers';
import { CategoryService } from '../../../../src/api/core/services/CategoryService';
import { ProductService } from '../../../../src/api/core/services/ProductService';
import { ProductToCategoryService } from '../../../../src/api/core/services/ProductToCategoryService';
import { WidgetService } from '../../core/services/WidgetService';
import { WidgetItemService } from '../../core/services/WidgetItemService';
import { CheckTokenMiddleware } from '../../../../src/api/core/middlewares/checkTokenMiddleware';
import { TranslationMiddleware } from '../../../../src/api/core/middlewares/TranslationMiddleware';
import { IndustryValidationMiddleware } from '../../../../src/api/core/middlewares/IndustryValidationMiddleware';
import { TenantValidationMiddleware } from '../../../../src/api/core/middlewares/TenantValidationMiddleware';
import moment = require('moment');
import { pluginModule } from '../../../../src/loaders/pluginLoader';
import { VendorPluginService } from '../../../../src/api/core/services/VendorPluginService';
import { Service } from 'typedi';

@Service()
@UseBefore(TranslationMiddleware)
@UseBefore(TenantValidationMiddleware)
@UseBefore(IndustryValidationMiddleware)
@JsonController('/store-widget')
export class StoreWidgetController {
    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        private widgetService: WidgetService,
        private widgetItemService: WidgetItemService,
        private productToCategoryService: ProductToCategoryService,
        private vendorPluginService: VendorPluginService
    ) {
    }

    // Widget Name List API
    /**
     * @api {Get} /api/list/widget-menu-name  Widget Name List
     * @apiGroup Store Widget
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Got widget name list successfully!",
     *      "data": {
     *          "widgetId": 1,
     *          "widgetTitle": "",
     *          "widgetSlugName": ""
     *      }
     * }
     * @apiSampleRequest /api/list/widget-menu-name
     * @apiErrorExample {json} Widget Name List error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(CheckTokenMiddleware)
    @Get('/menu-name')
    public async widgetNameList(@Res() response: any, @Req() request: any): Promise<any> {
        const select = ['widgetId', 'widgetTitle', 'widgetSlugName'];
        const whereConditions = [
            {
                name: 'isActive',
                value: 1,
            },
            {
                name: 'ShowHomePageWidget',
                value: 1,
            },
            {
                name: 'tenantId',
                value: request.tenantId,
            },
        ];
        const relations = ['widgetTranslation'];
        const widgetList: any = await this.widgetService.list(undefined, undefined, select, undefined, whereConditions, relations, false);

        const widgetListLangugage = widgetList.map((widget) => {
            const widgetTranslationExist = widget.widgetTranslation.find((widgetTrans) => widgetTrans.languageId === request.languageId);
            widget.widgetTranslation = widgetTranslationExist ? [widgetTranslationExist] : [];
            return widget;
        });

        return response.status(200).send({
            status: 1,
            message: 'Got widget name list successfully!',
            data: widgetListLangugage,
        });
    }

    // Widget List API
    /**
     * @api {Get} /api/list/widget-list Widget List
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got widget list",
     *      "data": {
     *          "productId": 1,
     *          "taxType": "",
     *          "taxValue": "",
     *          "name": "",
     *          "price": 1,
     *          "taxType": "",
     *          "description": "",
     *          "sku": "",
     *          "skuId": 1,
     *          "isSimplified": 1,
     *          "upc": "",
     *          "quantity": 1,
     *          "rating": 1,
     *          "productSlug": "",
     *          "hasStock": "",
     *          "outOfStockThreshold": "",
     *          "stockStatusId": "",
     *          "createdDate": "",
     *          "sortOrder": 1,
     *          "containerName": "",
     *          "image": "",
     *          "defaultImage": "",
     *          "taxValue": "",
     *          "skuName": "",
     *          "price": 1,
     *          "productDiscount": 1,
     *          "productSpecial": "",
     *      }
     * }
     * @apiSampleRequest /api/list/widget-list
     * @apiErrorExample {json} Widget List error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(CheckTokenMiddleware)
    @Get('/list')
    public async widgetList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['widgetId', 'widgetTitle', 'widgetLongTitle', 'widgetLinkType', 'position', 'ShowHomePageWidget', 'metaTagKeyword', 'metaTagDescription', 'metaTagTitle', 'widgetSlugName'];

        const whereConditions = [
            {
                name: 'tenantId',
                value: request.tenantId,
            },
            {
                name: 'isActive',
                value: 1,
            },
            {
                name: 'ShowHomePageWidget',
                value: 1,
            },
        ];
        const relations = ['widgetTranslation'];
        const widgetList: any = await this.widgetService.list(limit, offset, select, [], whereConditions, relations, count);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully get widget count.',
                data: widgetList,
            });
        }
        const vendorPlugin = await this.vendorPluginService.findOne(
            {
                where: {
                    vendorId: request.tenantId,
                    isActive: 1,
                    plugins: {
                        pluginName: 'ShoppingCart',
                        pluginStatus: 1,
                    },
                },
                relations: ['plugins'],
            }
        );
        const promise = widgetList.map(async (result: any) => {
            const temp: any = result;

            const widgetTranslationExist = result.widgetTranslation.find((widgetTrans) => widgetTrans.languageId === request.languageId);
            temp.widgetTranslation = widgetTranslationExist ? [widgetTranslationExist] : [];

            const BannerItem = await this.widgetItemService.find({
                where: {
                    widgetId: result.widgetId,
                },
            });
            const arr: any = [];
            for (const item of BannerItem) {
                arr.push(item.refId);
            }
            const selects = [
                ('DISTINCT Product.productId as productId'),
                'Product.taxType as taxType',
                'Product.taxValue as taxValue',
                'Product.name as name',
                'Product.price as price',
                'Product.description as description',
                'Product.sku as sku',
                'Product.skuId as skuId',
                'Product.isSimplified as isSimplified',
                'Product.isSpecification as isSpecification',
                'Product.quantity as quantity',
                'Product.productSlug as productSlug',
                'Product.hasStock as hasStock',
                'Product.outOfStockThreshold as outOfStockThreshold',
                'Product.stockStatusId as stockStatusId',
                'Product.createdDate as createdDate',
                'Product.sort_order as sort_order',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
            ];
            if (pluginModule.includes('ShoppingCart') && vendorPlugin) {
                selects.push(`(SELECT sc.id FROM shopping_cart AS sc INNER JOIN shopping_cart_detail as scd ON sc.id = scd.shopping_cart_id WHERE sc.customer_id = ${request.id ? request.id : 0} AND scd.sku_id = skuId ORDER BY sc.created_date DESC LIMIT 1) AS shoppingCartId`);
            }
            const productWhereConditions = [];
            const prRelations = [];
            const currentDate = moment().format('YYYY-MM-DD');
            if (result.widgetLinkType === 2) {
                prRelations.push(
                    {
                        tableName: 'Product.productToCategory',
                        aliasName: 'productToCategory',
                    },
                    {
                        tableName: 'productToCategory.category',
                        aliasName: 'category',
                    }
                );
                productWhereConditions.push(
                    {
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
                    },
                    {
                        name: 'category.is_active',
                        op: 'and',
                        value: 1,
                    },
                    {
                        name: 'Product.product_id',
                        op: 'IN',
                        value: arr,
                    },
                    {
                        name: 'category.industry_id',
                        op: 'and',
                        value: request.store.industryId,
                    },
                    {
                        name: 'Product.dateAvailable',
                        op: 'raw',
                        sign: '<=',
                        value: currentDate.toString(),
                    }
                );
            } else {
                prRelations.push({
                    tableName: 'Product.productToCategory',
                    aliasName: 'productToCategory',
                }, {
                    tableName: 'productToCategory.category',
                    aliasName: 'category',
                });
                productWhereConditions.push(
                    {
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
                    },
                    {
                        name: 'category.is_active',
                        op: 'and',
                        value: 1,
                    },
                    {
                        name: 'category.category_id',
                        op: 'IN',
                        value: arr,
                    },
                    {
                        name: 'category.industry_id',
                        op: 'and',
                        value: request.store.industryId,
                    },
                    {
                        name: 'Product.dateAvailable',
                        op: 'raw',
                        sign: '<=',
                        value: currentDate.toString(),
                    }
                );
            }
            if (request.id) {
                selects.push('customerWishlist.wishlistProductId as wishlistProductId');
                prRelations.push({
                    tableName: 'Product.wishlist',
                    op: 'leftCond',
                    aliasName: 'customerWishlist',
                    cond: 'customerWishlist.customerId = ' + request.id,
                });
            }
            const sort = [
                {
                    name: 'Product.sortOrder',
                    order: 'ASC',
                },
                {
                    name: 'Product.name',
                    order: 'ASC',
                },
            ];
            const productList: any = await this.productService.listByQueryBuilder(5, 0, selects, productWhereConditions, [], prRelations, [], sort, false, true);
            const promises = productList.map(async (resultData: any) => {
                const tempVal: any = resultData;
                const product = await this.productToCategoryService.findAll({
                    where: {
                        productId: resultData.productId,
                    },
                });
                const categories = product.map(async (val: any) => {
                    const categoryData = await this.categoryService.findOne({ where: { categoryId: val.categoryId } });
                    const tempVals: any = val;
                    tempVals.categoryName = categoryData ? categoryData.name : '';
                    tempVals.categoryId = categoryData ? categoryData.categoryId : '';
                    tempVals.categorySlug = categoryData ? categoryData.categorySlug : '';
                    tempVals.parentInt = categoryData ? categoryData.parentInt : '';
                    tempVals.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                    return tempVals;
                });

                tempVal.categoryLevels = await Promise.all(categories);

                if (resultData.hasStock === 1) {
                    if (resultData.quantity === 0) {
                        tempVal.stockStatus = 'outOfStock';
                    } else if (resultData.quantity <= resultData.outOfStockThreshold) {
                        tempVal.stockStatus = 'outOfStock';
                    } else {
                        tempVal.stockStatus = 'inStock';
                    }
                } else {
                    tempVal.stockStatus = 'inStock';
                }
                if (resultData.productSpecial !== null) {
                    tempVal.pricerefer = resultData.productSpecial;
                    tempVal.flag = 1;
                } else if (resultData.productDiscount !== null) {
                    tempVal.pricerefer = resultData.productDiscount;
                    tempVal.flag = 0;
                } else {
                    tempVal.pricerefer = '';
                    tempVal.flag = '';
                }
                if ((resultData.wishlistProductId !== null) && resultData.wishlistProductId) {
                    tempVal.wishListStatus = 1;
                } else {
                    tempVal.wishListStatus = 0;
                }
                return tempVal;
            });
            temp.items = await Promise.all(promises);
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got widget list.',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // Widget detail API
    /**
     * @api {Get} /api/list/widget-detail/:widgetSlug Widget Detail API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully got widget detail",
     *      "data": {}
     * }
     * @apiSampleRequest /api/list/widget-detail/:widgetSlug
     * @apiErrorExample {json} Widget Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @UseBefore(CheckTokenMiddleware)
    @Get('/detail/:slug')
    public async widgetDetail(@Param('slug') widgetSlug: string, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const widget = await this.widgetService.findOne({
            where: {
                widgetSlugName: widgetSlug, tenantId: request.tenantId,
            },
            relations: ['widgetTranslation'],
        });
        if (!widget) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid widget ID.',
            };
            return response.status(400).send(errorResponse);
        }

        const widgetTranslationExist = widget.widgetTranslation.find((widgetTrans) => widgetTrans.languageId === request.languageId);
        widget.widgetTranslation = widgetTranslationExist ? [widgetTranslationExist] : [];

        const BannerItem = await this.widgetItemService.find({
            where: {
                widgetId: widget.widgetId,
            },
        });
        const arr: any = [];
        const vendorPlugin = await this.vendorPluginService.findOne(
            {
                where: {
                    vendorId: request.tenantId,
                    isActive: 1,
                    plugins: {
                        pluginName: 'ShoppingCart',
                        pluginStatus: 1,
                    },
                },
                relations: ['plugins'],
            }
        );
        for (const item of BannerItem) {
            arr.push(item.refId);
        }
        const selects = [
            ('DISTINCT Product.productId as productId'),
            'Product.taxType as taxType',
            'Product.taxValue as taxValue',
            'Product.name as name',
            'Product.price as price',
            'Product.description as description',
            'Product.sku as sku',
            'Product.skuId as skuId',
            'Product.isSimplified as isSimplified',
            'Product.isSpecification as isSpecification',
            'Product.quantity as quantity',
            'Product.productSlug as productSlug',
            'Product.hasStock as hasStock',
            'Product.sortOrder as sortOrder',
            'Product.outOfStockThreshold as outOfStockThreshold',
            'Product.stockStatusId as stockStatusId',
            'Product.createdDate as createdDate',
            '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
            '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
            '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
            '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
            '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
            '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
            ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
            '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
        ];
        if (pluginModule.includes('ShoppingCart') && vendorPlugin) {
            selects.push(`(SELECT sc.id FROM shopping_cart AS sc INNER JOIN shopping_cart_detail as scd ON sc.id = scd.shopping_cart_id WHERE sc.customer_id = ${request.id ? request.id : 0} AND scd.sku_id = skuId ORDER BY sc.created_date DESC LIMIT 1) AS shoppingCartId`);
        }
        const relations = [];
        const whereConditions = [];
        const currentDate = moment().format('YYYY-MM-DD');
        if (widget.widgetLinkType === 2) {
            relations.push(
                {
                    tableName: 'Product.productToCategory',
                    aliasName: 'productToCategory',
                },
                {
                    tableName: 'productToCategory.category',
                    aliasName: 'category',
                }
            );
            whereConditions.push(
                {
                    name: 'Product.isActive',
                    op: 'and',
                    value: 1,
                },
                {
                    name: 'category.is_active',
                    op: 'and',
                    value: 1,
                },
                {
                    name: 'Product.product_id',
                    op: 'IN',
                    value: arr,
                },
                {
                    name: 'category.industry_id',
                    op: 'and',
                    value: request.store.industryId,
                },
                {
                    name: 'Product.dateAvailable',
                    op: 'raw',
                    sign: '<=',
                    value: currentDate.toString(),
                }
            );
        } else {
            relations.push(
                {
                    tableName: 'Product.productToCategory',
                    aliasName: 'productToCategory',
                },
                {
                    tableName: 'productToCategory.category',
                    aliasName: 'category',
                }
            );
            whereConditions.push(
                {
                    name: 'Product.isActive',
                    op: 'and',
                    value: 1,
                },
                {
                    name: 'category.is_active',
                    op: 'and',
                    value: 1,
                },
                {
                    name: 'category.category_id',
                    op: 'IN',
                    value: arr,
                },
                {
                    name: 'category.industry_id',
                    op: 'and',
                    value: request.store.industryId,
                },
                {
                    name: 'Product.dateAvailable',
                    op: 'raw',
                    sign: '<=',
                    value: currentDate.toString(),
                }
            );
        }
        if (request.id) {
            selects.push('customerWishlist.wishlistProductId as wishlistProductId');
            relations.push(
                {
                    tableName: 'Product.wishlist',
                    op: 'leftCond',
                    aliasName: 'customerWishlist',
                    cond: 'customerWishlist.customerId = ' + request.id,
                }
            );
        }
        const sort = [
            {
                name: 'Product.sortOrder',
                order: 'ASC',
            },
            {
                name: 'Product.name',
                order: 'ASC',
            },
        ];
        if (count) {
            const productCount: any = await this.productService.listByQueryBuilder(limit, offset, selects, whereConditions, [], relations, [], sort, true, true);
            const successCountResponse: any = {
                status: 1,
                message: 'Successfully got product count.',
                data: productCount,
            };
            return response.status(200).send(successCountResponse);
        }
        const productList: any = await this.productService.listByQueryBuilder(limit, offset, selects, whereConditions, [], relations, [], sort, false, true);
        const promises = productList.map(async (resultData: any) => {
            const tempVal: any = resultData;
            const product = await this.productToCategoryService.findAll({
                where: {
                    productId: resultData.productId,
                },
            });
            const categories = product.map(async (val: any) => {
                const categoryData = await this.categoryService.findOne({ where: { categoryId: val.categoryId } });
                const tempVals: any = val;
                tempVals.categoryName = categoryData ? categoryData.name : '';
                tempVals.categoryId = categoryData ? categoryData.categoryId : '';
                tempVals.categorySlug = categoryData ? categoryData.categorySlug : '';
                tempVals.parentInt = categoryData ? categoryData.parentInt : '';
                tempVals.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                return tempVals;
            });
            tempVal.categoryLevels = await Promise.all(categories);

            if (resultData.hasStock === 1) {
                if (resultData.quantity === 0) {
                    tempVal.stockStatus = 'outOfStock';
                } else if (resultData.quantity <= resultData.outOfStockThreshold) {
                    tempVal.stockStatus = 'outOfStock';
                } else {
                    tempVal.stockStatus = 'inStock';
                }
            } else {
                tempVal.stockStatus = 'inStock';
            }
            if (resultData.productSpecial !== null) {
                tempVal.pricerefer = resultData.productSpecial;
                tempVal.flag = 1;
            } else if (resultData.productDiscount !== null) {
                tempVal.pricerefer = resultData.productDiscount;
                tempVal.flag = 0;
            } else {
                tempVal.pricerefer = '';
                tempVal.flag = '';
            }
            if ((resultData.wishlistProductId !== null) && resultData.wishlistProductId) {
                tempVal.wishListStatus = 1;
            } else {
                tempVal.wishListStatus = 0;
            }
            return tempVal;
        });
        widget.widgetItems = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got widget detail.',
            data: widget,
        };
        return response.status(200).send(successResponse);
    }
}
