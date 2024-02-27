"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreWidgetListController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CategoryService_1 = require("../../../../src/api/core/services/CategoryService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const ProductToCategoryService_1 = require("../../../../src/api/core/services/ProductToCategoryService");
const WidgetService_1 = require("../../services/WidgetService");
const WidgetItemService_1 = require("../../services/WidgetItemService");
const moment = require("moment");
const checkTokenMiddleware_1 = require("../../../../src/api/core/middlewares/checkTokenMiddleware");
let StoreWidgetListController = class StoreWidgetListController {
    constructor(categoryService, productService, widgetService, widgetItemService, productToCategoryService) {
        this.categoryService = categoryService;
        this.productService = productService;
        this.widgetService = widgetService;
        this.widgetItemService = widgetItemService;
        this.productToCategoryService = productToCategoryService;
    }
    // Widget Name List API
    /**
     * @api {get} /api/list/widget-menu-name Widget name List
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Got Widget name List Successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/widget-menu-name
     * @apiErrorExample {json} Widget List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Widget Name list Function
    widgetNameList(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['widgetId', 'widgetTitle', 'widgetSlugName'];
            const WhereConditions = [
                {
                    name: 'isActive',
                    value: 1,
                },
                {
                    name: 'ShowHomePageWidget',
                    value: 1,
                },
            ];
            const widgetList = yield this.widgetService.list(undefined, undefined, select, undefined, WhereConditions, false);
            return response.status(200).send({
                status: 1,
                message: 'Got Widget name List Successfully..!',
                data: widgetList,
            });
        });
    }
    // Widget List API
    /**
     * @api {get} /api/list/widget-list Widget List
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you Widget list show successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/widget-list
     * @apiErrorExample {json} Widget List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Widget list Function
    widgetList(limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['widgetId', 'widgetTitle', 'widgetLinkType', 'position', 'ShowHomePageWidget', 'metaTagKeyword', 'metaTagDescription', 'metaTagTitle', 'widgetSlugName'];
            const search = [];
            const WhereConditions = [
                {
                    name: 'isActive',
                    value: 1,
                },
            ];
            const widgetList = yield this.widgetService.list(limit, offset, select, search, WhereConditions, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully get count',
                    data: widgetList,
                });
            }
            const promise = widgetList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = result;
                const BannerItem = yield this.widgetItemService.find({
                    where: {
                        widgetId: result.widgetId,
                    },
                });
                const arr = [];
                for (const item of BannerItem) {
                    arr.push(item.refId);
                }
                const selects = [('DISTINCT Product.productId as productId'),
                    'Product.taxType as taxType',
                    'Product.taxValue as taxValue',
                    'Product.name as name',
                    'Product.price as price',
                    'Product.taxType as taxType',
                    'Product.description as description',
                    'Product.sku as sku',
                    'Product.skuId as skuId',
                    'Product.isSimplified as isSimplified',
                    'Product.upc as upc',
                    'Product.quantity as quantity',
                    'Product.rating as rating',
                    'Product.productSlug as productSlug',
                    'Product.hasStock as hasStock',
                    'Product.outOfStockThreshold as outOfStockThreshold',
                    'Product.stockStatusId as stockStatusId',
                    'Product.createdDate as createdDate',
                    'Product.sort_order as sort_order',
                    '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                    '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                    '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                    'IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value` LIMIT 1), (Product.taxValue) )  as taxValue',
                    '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
                    '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                    '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                    '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial'];
                const whereCondition = [];
                const relations = [];
                const groupBy = [];
                const currentDate = moment().format('YYYY-MM-DD');
                if (result.widgetLinkType === 2) {
                    whereCondition.push({
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
                    }, {
                        name: 'Product.product_id',
                        op: 'IN',
                        value: arr,
                    }, {
                        name: 'Product.dateAvailable',
                        op: 'raw',
                        sign: '<=',
                        value: currentDate.toString(),
                    });
                }
                else {
                    relations.push({
                        tableName: 'Product.productToCategory',
                        aliasName: 'productToCategory',
                    }, {
                        tableName: 'productToCategory.category',
                        aliasName: 'category',
                    });
                    whereCondition.push({
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
                    }, {
                        name: 'category.is_active',
                        op: 'and',
                        value: 1,
                    }, {
                        name: 'category.category_id',
                        op: 'IN',
                        value: arr,
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
                const sort = [];
                sort.push({
                    name: 'Product.sortOrder',
                    order: 'ASC',
                });
                const productList = yield this.productService.listByQueryBuilder(5, 0, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
                const promises = productList.map((resultData) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const tempVal = resultData;
                    const product = yield this.productToCategoryService.findAll({
                        where: {
                            productId: resultData.productId,
                        },
                    });
                    const categories = product.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryData = yield this.categoryService.findOne({ categoryId: val.categoryId });
                        const tempVals = val;
                        tempVals.categoryName = categoryData ? categoryData.name : '';
                        tempVals.categoryId = categoryData ? categoryData.categoryId : '';
                        tempVals.categorySlug = categoryData ? categoryData.categorySlug : '';
                        tempVals.parentInt = categoryData ? categoryData.parentInt : '';
                        tempVals.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                        return tempVals;
                    }));
                    tempVal.categoryLevels = yield Promise.all(categories);
                    if (resultData.hasStock === 1) {
                        if (resultData.quantity <= resultData.outOfStockThreshold) {
                            tempVal.stockStatus = 'outOfStock';
                        }
                        else {
                            tempVal.stockStatus = 'inStock';
                        }
                    }
                    else {
                        tempVal.stockStatus = 'inStock';
                    }
                    if (resultData.productSpecial !== null) {
                        tempVal.pricerefer = resultData.productSpecial;
                        tempVal.flag = 1;
                    }
                    else if (resultData.productDiscount !== null) {
                        tempVal.pricerefer = resultData.productDiscount;
                        tempVal.flag = 0;
                    }
                    else {
                        tempVal.pricerefer = '';
                        tempVal.flag = '';
                    }
                    if ((resultData.wishlistProductId !== null) && resultData.wishlistProductId) {
                        tempVal.wishListStatus = 1;
                    }
                    else {
                        tempVal.wishListStatus = 0;
                    }
                    return tempVal;
                }));
                temp.items = yield Promise.all(promises);
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully got widget list',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // get widget detail API
    /**
     * @api {get} /api/list/widget-detail/:widgetSlug get widget detail API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get  Detail",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/widget-detail/:widgetSlug
     * @apiErrorExample {json} Store list error
     * HTTP/1.1 500 Internal Server Error
     */
    widgetDetail(widgetSlug, limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const widget = yield this.widgetService.findOne({
                where: {
                    widgetSlugName: widgetSlug,
                },
            });
            if (!widget) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid widget Id',
                };
                return response.status(400).send(errorResponse);
            }
            const BannerItem = yield this.widgetItemService.find({
                where: {
                    widgetId: widget.widgetId,
                },
            });
            const arr = [];
            for (const item of BannerItem) {
                arr.push(item.refId);
            }
            const selects = [('DISTINCT Product.productId as productId'),
                'Product.taxType as taxType',
                'Product.taxValue as taxValue',
                'Product.name as name',
                'Product.price as price',
                'Product.taxType as taxType',
                'Product.description as description',
                'Product.sku as sku',
                'Product.skuId as skuId',
                'Product.isSimplified as isSimplified',
                'Product.upc as upc',
                'Product.quantity as quantity',
                'Product.rating as rating',
                'Product.productSlug as productSlug',
                'Product.hasStock as hasStock',
                'Product.sortOrder as sortOrder',
                'Product.outOfStockThreshold as outOfStockThreshold',
                'Product.stockStatusId as stockStatusId',
                'Product.createdDate as createdDate',
                '(SELECT pi.container_name as containerName FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as containerName',
                '(SELECT pi.image as image FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as image',
                '(SELECT pi.default_image as defaultImage FROM product_image pi WHERE pi.product_id = Product.productId AND pi.default_image = 1 LIMIT 1) as defaultImage',
                'IF(Product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `Product`.`tax_value` LIMIT 1), (Product.taxValue) )  as taxValue',
                '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial'];
            const whereCondition = [];
            const relations = [];
            const groupBy = [];
            const currentDate = moment().format('YYYY-MM-DD');
            if (widget.widgetLinkType === 2) {
                whereCondition.push({
                    name: 'Product.isActive',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'Product.product_id',
                    op: 'IN',
                    value: arr,
                }, {
                    name: 'Product.dateAvailable',
                    op: 'raw',
                    sign: '<=',
                    value: currentDate.toString(),
                });
            }
            else {
                relations.push({
                    tableName: 'Product.productToCategory',
                    aliasName: 'productToCategory',
                }, {
                    tableName: 'productToCategory.category',
                    aliasName: 'category',
                });
                whereCondition.push({
                    name: 'Product.isActive',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'category.is_active',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'category.category_id',
                    op: 'IN',
                    value: arr,
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
            const sort = [];
            sort.push({
                name: 'Product.sortOrder',
                order: 'ASC',
            });
            if (count) {
                const productCount = yield this.productService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
                const successCountResponse = {
                    status: 1,
                    message: 'Successfully got product count',
                    data: productCount,
                };
                return response.status(200).send(successCountResponse);
            }
            const productList = yield this.productService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
            const promises = productList.map((resultData) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const tempVal = resultData;
                const product = yield this.productToCategoryService.findAll({
                    where: {
                        productId: resultData.productId,
                    },
                });
                const categories = product.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const categoryData = yield this.categoryService.findOne({ categoryId: val.categoryId });
                    const tempVals = val;
                    tempVals.categoryName = categoryData ? categoryData.name : '';
                    tempVals.categoryId = categoryData ? categoryData.categoryId : '';
                    tempVals.categorySlug = categoryData ? categoryData.categorySlug : '';
                    tempVals.parentInt = categoryData ? categoryData.parentInt : '';
                    tempVals.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                    return tempVals;
                }));
                tempVal.categoryLevels = yield Promise.all(categories);
                if (resultData.hasStock === 1) {
                    if (resultData.quantity <= resultData.outOfStockThreshold) {
                        tempVal.stockStatus = 'outOfStock';
                    }
                    else {
                        tempVal.stockStatus = 'inStock';
                    }
                }
                else {
                    tempVal.stockStatus = 'inStock';
                }
                if (resultData.productSpecial !== null) {
                    tempVal.pricerefer = resultData.productSpecial;
                    tempVal.flag = 1;
                }
                else if (resultData.productDiscount !== null) {
                    tempVal.pricerefer = resultData.productDiscount;
                    tempVal.flag = 0;
                }
                else {
                    tempVal.pricerefer = '';
                    tempVal.flag = '';
                }
                if ((resultData.wishlistProductId !== null) && resultData.wishlistProductId) {
                    tempVal.wishListStatus = 1;
                }
                else {
                    tempVal.wishListStatus = 0;
                }
                return tempVal;
            }));
            const value = yield Promise.all(promises);
            widget.widgetItems = value;
            const successResponse = {
                status: 1,
                message: 'Successfully got widget detail',
                data: widget,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.Get)('/widget-menu-name'),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreWidgetListController.prototype, "widgetNameList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.Get)('/widget-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreWidgetListController.prototype, "widgetList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.Get)('/widget-detail/:widgetSlug'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('widgetSlug')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreWidgetListController.prototype, "widgetDetail", null);
StoreWidgetListController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)('/list'),
    tslib_1.__metadata("design:paramtypes", [CategoryService_1.CategoryService,
        ProductService_1.ProductService,
        WidgetService_1.WidgetService,
        WidgetItemService_1.WidgetItemService,
        ProductToCategoryService_1.ProductToCategoryService])
], StoreWidgetListController);
exports.StoreWidgetListController = StoreWidgetListController;
//# sourceMappingURL=StoreWidgetController.js.map