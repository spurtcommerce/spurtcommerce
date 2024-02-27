"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreCustomerWishListController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CustomerWishlist_1 = require("../../core/models/CustomerWishlist");
const ProductService_1 = require("../../core/services/ProductService");
const CustomerWishlistService_1 = require("../../core/services/CustomerWishlistService");
const ProductImageService_1 = require("../../core/services/ProductImageService");
const checkTokenMiddleware_1 = require("../../core/middlewares/checkTokenMiddleware");
let StoreCustomerWishListController = class StoreCustomerWishListController {
    constructor(customerWishlistService, productImageService, productService) {
        this.customerWishlistService = customerWishlistService;
        this.productImageService = productImageService;
        this.productService = productService;
    }
    // Add Product To Wishlist API
    /**
     * @api {post} /api/customer/add-product-to-wishlist Add Product To Wishlist
     * @apiGroup Store wishlist
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId Product Id
     * @apiParam (Request body) {String} productOptionValueId Product Option Value Id
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     *      "ProductOptionValueId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you product added to the wishlist successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/add-product-to-wishlist
     * @apiErrorExample {json} Add Product To Wishlist error
     * HTTP/1.1 500 Internal Server Error
     */
    // Add Product To Wishlist Function
    addProductToWishlist(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const data = yield this.customerWishlistService.findOne({
                    where: {
                        productId: request.body.productId,
                        customerId: request.user.id,
                    },
                });
                if (data) {
                    const errorResponse = {
                        status: 1,
                        message: 'Already added this product to wishlist.',
                    };
                    return response.status(400).send(errorResponse);
                }
                const newProduct = new CustomerWishlist_1.CustomerWishlist();
                newProduct.customerId = request.user.id;
                newProduct.productId = request.body.productId;
                newProduct.isActive = 1;
                const resultData = yield this.customerWishlistService.create(newProduct);
                const id = resultData.wishlistProductId;
                const product = yield this.productService.findOne({ where: { productId: resultData.productId } });
                const image = yield this.productImageService.findOne({
                    where: {
                        productId: resultData.productId,
                        defaultImage: 1,
                    },
                });
                const successResponse = {
                    status: 1,
                    message: 'You have Successfully add to wishlist. ',
                    data: {
                        wishlistProductId: id,
                        product,
                        productImage: image,
                    },
                };
                return response.status(200).send(successResponse);
            }));
        });
    }
    // Wish List Product Delete API
    /**
     * @api {delete} /api/customer/wishlist-product-delete/:id  Delete Product From Wishlist
     * @apiGroup Store wishlist
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "wishlistProductId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you deleted the product from wishlist successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/wishlist-product-delete/:id
     * @apiErrorExample {json} Wishlist Product Delete error
     * HTTP/1.1 500 Internal Server Error
     */
    // Add Product Wishlist Function
    wishlistProductDelete(wishlistId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerwishlistId = yield this.customerWishlistService.findOne({ where: { productId: wishlistId, customerId: request.user.id } });
            if (!customerwishlistId) {
                const errResponse = {
                    status: 1,
                    message: 'Invalid Product',
                };
                return response.status(200).send(errResponse);
            }
            yield this.customerWishlistService.delete(customerwishlistId.wishlistProductId);
            const successResponse = {
                status: 1,
                message: 'You have successfully remove from wishlist. ',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Wish List Product List API
    /**
     * @api {get} /api/customer/wishlist-product-list WishList Product List
     * @apiGroup Store wishlist
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the wishlist Product List",
     *      "status": "1",
     *      "data": "{}"
     * }
     * @apiSampleRequest /api/customer/wishlist-product-list
     * @apiErrorExample {json} Wishlist Product List error
     * HTTP/1.1 500 Internal Server Error
     */
    // View Product Wishlist Function
    wishlistProductlist(limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const selects = ['CustomerWishlist.wishlistProductId as wishlistProductId',
                'product.productId as productId',
                'product.taxType as taxType',
                'product.taxValue as taxValue',
                'product.name as name',
                'product.price as price',
                'product.taxType as taxType',
                'product.quantity as quantity',
                'product.description as description',
                'product.dateAvailable as dateAvailable',
                'product.sku as sku',
                'product.skuId as skuId',
                'product.sortOrder as sortOrder',
                'product.isSimplified as isSimplified',
                'product.upc as upc',
                'product.rating as rating',
                'product.isActive as isActive',
                'product.productSlug as productSlug',
                'product.hasStock as hasStock',
                'product.outOfStockThreshold as outOfStockThreshold',
                'product.stockStatusId as stockStatusId',
                'product.createdDate as createdDate',
                'product.keywords as keywords',
                'productImage.containerName as containerName',
                'productImage.image as image',
                'productImage.defaultImage as defaultImage',
                '(SELECT COUNT(pr.rating) as ratingCount FROM product_rating pr WHERE pr.product_id = product.productId) as ratingCount',
                '(SELECT COUNT(pr.review) as reviewCount FROM product_rating pr WHERE pr.product_id = product.productId AND pr.review IS NOT NULL) as reviewCount',
                'IF(product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `product`.`tax_value` LIMIT 1), (product.taxValue) )  as taxValue',
                '(SELECT sku.sku_name as skuName FROM sku WHERE sku.id = skuId) as skuName',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
            ];
            const whereCondition = [];
            const relations = [];
            const groupBy = [];
            const sort = [];
            relations.push({
                tableName: 'CustomerWishlist.product',
                aliasName: 'product',
            }, {
                tableName: 'product.productImage',
                op: 'leftCond',
                aliasName: 'productImage',
                cond: 'productImage.defaultImage = 1',
            });
            whereCondition.push({
                name: 'CustomerWishlist.customerId',
                op: 'where',
                value: request.user.id,
            });
            sort.push({
                name: 'CustomerWishlist.createdDate',
                order: 'DESC',
            });
            const productCount = yield this.customerWishlistService.listByQueryBuilder(limit, offset, selects, whereCondition, [], relations, groupBy, sort, true, true);
            if (count) {
                const successresponse = {
                    status: 1,
                    message: 'Successfully get count',
                    data: productCount,
                };
                return response.status(200).send(successresponse);
            }
            const productList = yield this.customerWishlistService.listByQueryBuilder(limit, offset, selects, whereCondition, [], relations, groupBy, sort, false, true);
            const promises = productList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = result;
                if (result.productSpecial !== null) {
                    temp.pricerefer = result.productSpecial;
                    temp.flag = 1;
                }
                else if (result.productDiscount !== null) {
                    temp.pricerefer = result.productDiscount;
                    temp.flag = 0;
                }
                else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
                if (result.hasStock === 1) {
                    if (result.quantity <= result.outOfStockThreshold) {
                        temp.stockStatus = 'outOfStock';
                    }
                    else {
                        temp.stockStatus = 'inStock';
                    }
                }
                else {
                    temp.stockStatus = 'inStock';
                }
                return temp;
            }));
            const finalResult = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Successfully show the wishlist Product List',
                data: finalResult,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/add-product-to-wishlist'),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerWishListController.prototype, "addProductToWishlist", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)('/wishlist-product-delete/:id'),
    tslib_1.__param(0, (0, routing_controllers_1.Param)('id')),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerWishListController.prototype, "wishlistProductDelete", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/wishlist-product-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerWishListController.prototype, "wishlistProductlist", null);
StoreCustomerWishListController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.JsonController)('/customer'),
    tslib_1.__metadata("design:paramtypes", [CustomerWishlistService_1.CustomerWishlistService,
        ProductImageService_1.ProductImageService, ProductService_1.ProductService])
], StoreCustomerWishListController);
exports.StoreCustomerWishListController = StoreCustomerWishListController;
//# sourceMappingURL=CustomerWishListController.js.map