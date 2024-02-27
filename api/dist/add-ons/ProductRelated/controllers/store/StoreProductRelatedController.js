"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatedProductController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const ProductRelatedService_1 = require("../../services/ProductRelatedService");
const checkTokenMiddleware_1 = require("../../../../src/api/core/middlewares/checkTokenMiddleware");
const ProductToCategoryService_1 = require("../../../../src/api/core/services/ProductToCategoryService");
const CategoryService_1 = require("../../../../src/api/core/services/CategoryService");
const class_transformer_1 = require("class-transformer");
const moment_1 = tslib_1.__importDefault(require("moment"));
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let RelatedProductController = class RelatedProductController {
    constructor(productService, productRelatedService, productToCategoryService, categoryService) {
        this.productService = productService;
        this.productRelatedService = productRelatedService;
        this.productToCategoryService = productToCategoryService;
        this.categoryService = categoryService;
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
     *      "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Related Product List Showing Successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/related-product-list
     * @apiErrorExample {json} Related Product List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Category List Function
    relatedProductList(productid, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                productSlug: productid,
                isActive: 1,
            });
            if (!productDetail) {
                return response.status(400).send({
                    status: 1,
                    message: 'Invalid product.',
                });
            }
            const currentDate = (0, moment_1.default)().format('YYYY-MM-DD');
            const selects = ['ProductRelated.relatedProductId as productId',
                'ProductRelated.id as id',
                'product.taxType as taxType',
                'product.taxValue as taxValue',
                'product.skuId as skuId',
                'product.price as price',
                'product.name as name',
                'product.isSimplified as isSimplified',
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
            const whereCondition = [];
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
            whereCondition.push({
                name: 'product.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'ProductRelated.productId',
                op: 'and',
                value: productDetail.productId,
            }, {
                name: 'product.dateAvailable',
                op: 'raw',
                sign: '<=',
                value: currentDate.toString(),
            });
            const groupBy = [];
            const sort = [];
            sort.push({
                name: 'ProductRelated.id',
                order: 'ASC',
            });
            if (count) {
                const relatedDataCount = yield this.productRelatedService.listByQueryBuilder(0, 0, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
                const Response = {
                    status: 1,
                    message: 'Related product list is successfully being shown. ',
                    data: relatedDataCount,
                };
                return response.status(200).send(Response);
            }
            const relatedData = yield this.productRelatedService.listByQueryBuilder(0, 0, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
            const promises = relatedData.map((results) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = results;
                const product = yield this.productToCategoryService.findAll({
                    where: {
                        productId: results.productId,
                    },
                });
                const categories = product.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const categoryData = yield this.categoryService.findOne({ categoryId: val.categoryId });
                    const tempVal = val;
                    tempVal.categoryName = categoryData ? categoryData.name : '';
                    tempVal.categoryId = categoryData ? categoryData.categoryId : '';
                    tempVal.categorySlug = categoryData ? categoryData.categorySlug : '';
                    tempVal.parentInt = categoryData ? categoryData.parentInt : '';
                    tempVal.categoryDescription = categoryData ? categoryData.categoryDescription : '';
                    return tempVal;
                }));
                temp.categoryLevels = yield Promise.all(categories);
                if (results.productSpecial !== null) {
                    temp.pricerefer = results.productSpecial;
                    temp.flag = 1;
                }
                else if (results.productDiscount !== null) {
                    temp.pricerefer = results.productDiscount;
                    temp.flag = 0;
                }
                else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
                if (results.hasStock === 1) {
                    if (results.quantity <= results.outOfStockThreshold) {
                        temp.stockStatus = 'outOfStock';
                    }
                    else {
                        temp.stockStatus = 'inStock';
                    }
                }
                else {
                    temp.stockStatus = 'inStock';
                }
                if ((results.wishlistProductId !== null) && results.wishlistProductId) {
                    temp.wishListStatus = 1;
                }
                else {
                    temp.wishListStatus = 0;
                }
                return temp;
            }));
            const result = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Related product list is successfully being shown. ',
                data: (0, class_transformer_1.instanceToPlain)(result),
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckTokenMiddleware),
    (0, routing_controllers_1.Get)('/related-product-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('productId')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__param(3, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RelatedProductController.prototype, "relatedProductList", null);
RelatedProductController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/list'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService, ProductRelatedService_1.ProductRelatedService, ProductToCategoryService_1.ProductToCategoryService, CategoryService_1.CategoryService])
], RelatedProductController);
exports.RelatedProductController = RelatedProductController;
//# sourceMappingURL=StoreProductRelatedController.js.map