"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreCustomerCartController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../core/services/ProductService");
const CustomerCartService_1 = require("../../core/services/CustomerCartService");
const ProductImageService_1 = require("../../core/services/ProductImageService");
const CustomerCart_1 = require("../../core/models/CustomerCart");
const CreateCartRequest_1 = require("./requests/CreateCartRequest");
const SkuService_1 = require("../../core/services/SkuService");
const checkTokenMiddleware_1 = require("../../core/middlewares/checkTokenMiddleware");
let StoreCustomerCartController = class StoreCustomerCartController {
    constructor(productService, skuService, customerCartService, productImageService) {
        this.productService = productService;
        this.skuService = skuService;
        this.customerCartService = customerCartService;
        this.productImageService = productImageService;
    }
    // create and update customer cart API
    /**
     * @api {post} /api/customer-cart/add-cart Add to cart API
     * @apiGroup Customer Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} [productPrice] productPrice
     * @apiParam (Request body) {Number} [quantity] quantity
     * @apiParam (Request body) {String} [skuName] skuName
     * @apiParam (Request body) {string} [type] type
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     *      "productPrice" : "",
     *      "quantity" : "",
     *      "skuName" : "",
     *      "type" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added product to cart",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-cart/add-cart
     * @apiErrorExample {json} vendor category  error
     * HTTP/1.1 500 Internal Server Error
     */
    addCustomerCart(cartParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId: cartParam.productId,
                },
            });
            if (!product) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid ProductId',
                };
                return response.status(400).send(errorResponse);
            }
            const sku = yield this.skuService.findOne({ where: { skuName: cartParam.skuName } });
            if (!sku) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid sku',
                };
                return response.status(400).send(errorResponse);
            }
            const findOption = yield this.customerCartService.findOne({
                where: {
                    skuName: cartParam.skuName, productId: cartParam.productId, customerId: request.user.id,
                },
            });
            if (findOption) {
                if (cartParam.type && cartParam.type === 'new') {
                    if (cartParam.quantity === 0) {
                        yield this.customerCartService.delete(findOption.id);
                        const deleteCart = {
                            status: 1,
                            message: 'Successfully removed from Cart',
                        };
                        return response.status(200).send(deleteCart);
                    }
                    const qty = Number(findOption.quantity) + +cartParam.quantity;
                    console.log('qty:', qty);
                    if (product.hasStock === 1) {
                        if (!(sku.minQuantityAllowedCart <= qty)) {
                            const minCart = {
                                status: 0,
                                message: 'Quantity should greater than min Quantity.',
                            };
                            return response.status(400).send(minCart);
                        }
                        else if (!(sku.maxQuantityAllowedCart >= qty)) {
                            const maxCart = {
                                status: 0,
                                message: 'Reached maximum quantity limit',
                            };
                            return response.status(400).send(maxCart);
                        }
                    }
                    findOption.quantity = qty;
                }
                else {
                    findOption.quantity = cartParam.quantity;
                }
                findOption.productPrice = cartParam.productPrice;
                findOption.total = +cartParam.quantity * +cartParam.productPrice;
                findOption.skuName = cartParam.skuName;
                yield this.customerCartService.createData(findOption);
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated cart.',
                    data: findOption,
                };
                return response.status(200).send(successResponse);
            }
            else {
                if (cartParam.quantity === 0) {
                    if (!findOption) {
                        return response.status(200).send({
                            status: 1,
                            message: 'Successfully removed from Cart',
                        });
                    }
                    yield this.customerCartService.delete(findOption.id);
                    const deleteCart = {
                        status: 1,
                        message: 'Successfully removed from Cart',
                    };
                    return response.status(200).send(deleteCart);
                }
                if (product.hasStock === 1) {
                    if (!(sku.minQuantityAllowedCart <= +cartParam.quantity)) {
                        const minCart = {
                            status: 0,
                            message: 'Quantity should greater than min Quantity.',
                        };
                        return response.status(400).send(minCart);
                    }
                    else if (!(sku.maxQuantityAllowedCart >= +cartParam.quantity)) {
                        const maxCart = {
                            status: 0,
                            message: 'Reached maximum quantity limit',
                        };
                        return response.status(400).send(maxCart);
                    }
                }
                const addCustomerCart = new CustomerCart_1.CustomerCart();
                addCustomerCart.productId = cartParam.productId,
                    addCustomerCart.name = product.name,
                    addCustomerCart.customerId = request.user.id,
                    addCustomerCart.quantity = cartParam.quantity,
                    addCustomerCart.productPrice = cartParam.productPrice,
                    addCustomerCart.total = +cartParam.quantity * +cartParam.productPrice,
                    addCustomerCart.skuName = cartParam.skuName;
                addCustomerCart.ip = (request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress ||
                    request.connection.socket.remoteAddress).split(',')[0];
                const val = yield this.customerCartService.createData(addCustomerCart);
                const cart = {
                    status: 1,
                    message: 'Added to cart',
                    data: val,
                };
                return response.status(200).send(cart);
            }
        });
    }
    // Customer Cart List API
    /**
     * @api {get} /api/customer-cart/customer-cart-list  Customer Cart List API
     * @apiGroup Customer Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Boolean} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Customer Cart List",
     *      "data":{
     *       "productId" : "",
     *       "name" : "",
     *       "quantity" : "",
     *       "productPrice" : "",
     *       "total" : "",
     *       "image" : "",
     *       "containerName" : "",
     *       "optionName" : "",
     *       "optionValueName" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-cart/customer-cart-list
     * @apiErrorExample {json} Customer Cart error
     * HTTP/1.1 500 Internal Server Error
     */
    customerCartList(limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const selects = ['CustomerCart.id as id',
                'CustomerCart.productPrice as productPrice',
                'CustomerCart.total as total',
                'CustomerCart.skuName as skuName',
                'product.productId as productId',
                'product.taxType as taxType',
                'product.taxValue as taxValue',
                'product.name as name',
                'product.price as price',
                'product.taxType as taxType',
                'CustomerCart.quantity as quantity',
                'product.description as description',
                'product.dateAvailable as dateAvailable',
                'product.sku as sku',
                'product.skuId as skuId',
                'product.sortOrder as sortOrder',
                'product.upc as upc',
                'product.rating as rating',
                'product.isActive as isActive',
                'product.productSlug as productSlug',
                'product.hasStock as hasStock',
                'product.outOfStockThreshold as outOfStockThreshold',
                'product.stockStatusId as stockStatusId',
                'product.createdDate as createdDate',
                'product.keywords as keywords',
                'IF(product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `product`.`tax_value` LIMIT 1), product.taxValue)  as taxValue',
                '(SELECT sku.id as skuId FROM sku WHERE sku.sku_name = skuName) as skuId',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT sku.out_of_stock_threshold as outOfStockThreshold FROM sku WHERE sku.id = skuId) as outOfStockThreshold',
                '(SELECT sku.notify_min_quantity_below as notifyMinQuantity FROM sku WHERE sku.id = skuId) as notifyMinQuantity',
                '(SELECT sku.min_quantity_allowed_cart as minQuantityAllowedCart FROM sku WHERE sku.id = skuId) as minQuantityAllowedCart',
                '(SELECT sku.max_quantity_allowed_cart as maxQuantityAllowedCart FROM sku WHERE sku.id = skuId) as maxQuantityAllowedCart',
                '(SELECT sku.enable_back_orders as enableBackOrders FROM sku WHERE sku.id = skuId) as enableBackOrders',
            ];
            const whereCondition = [];
            const relations = [];
            const groupBy = [];
            const sort = [];
            relations.push({
                tableName: 'CustomerCart.product',
                aliasName: 'product',
            });
            whereCondition.push({
                name: 'CustomerCart.customerId',
                op: 'where',
                value: request.user.id,
            });
            sort.push({
                name: 'CustomerCart.createdDate',
                order: 'DESC',
            });
            const cartCount = yield this.customerCartService.listByQueryBuilder(limit, offset, selects, whereCondition, [], relations, groupBy, sort, true, true);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the cart count.',
                    data: cartCount,
                };
                return response.status(200).send(successResponse);
            }
            const cartList = yield this.customerCartService.listByQueryBuilder(limit, offset, selects, whereCondition, [], relations, groupBy, sort, false, true);
            let grandTotal = 0;
            const findImage = cartList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                temp.taxValue = +value.taxValue;
                temp.optionName = value.optionName;
                temp.quantity = value.quantity;
                temp.productImage = yield this.productImageService.findAll({
                    select: ['productId', 'image', 'containerName', 'defaultImage'],
                    where: {
                        productId: temp.productId,
                    },
                });
                temp.productOriginalImage = temp.productImage.slice();
                grandTotal = 0;
                if (value.productSpecial !== null) {
                    temp.pricerefer = value.productSpecial;
                    temp.flag = 1;
                }
                else if (value.productDiscount !== null) {
                    temp.pricerefer = value.productDiscount;
                    temp.flag = 0;
                }
                else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
            }));
            const finalResult = yield Promise.all(findImage);
            if (cartList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the cart list.',
                    data: { cartList: finalResult, grandTotal },
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to list cart list',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete cart items API
    /**
     * @api {post} /api/customer-cart/delete-cart-item Delete Cart items API
     * @apiGroup Customer Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} cartId cartId
     * @apiParamExample {json} Input
     * {
     * "cartId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted items.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/customer-cart/delete-cart-item
     * @apiErrorExample {json} cartDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteCartItem(cartId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productId = cartId.split(',');
            if (cartId === '') {
                const customerCart = yield this.customerCartService.find({
                    where: {
                        customerId: request.user.id,
                    },
                });
                for (const cart of customerCart) {
                    const itemId = cart.id;
                    yield this.customerCartService.delete(itemId);
                }
                const Response = {
                    status: 1,
                    message: 'your cart is empty.',
                };
                return response.status(200).send(Response);
            }
            const err = [];
            for (const id of productId) {
                const itemId = parseInt(id, 10);
                const val = yield this.customerCartService.findOne(itemId);
                if (!val) {
                    err.push(1);
                }
            }
            if (err.length > 0) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid cart Item',
                };
                return response.status(400).send(errorResponse);
            }
            for (const id of productId) {
                const itemId = parseInt(id, 10);
                yield this.customerCartService.delete(itemId);
            }
            const successResponse = {
                status: 1,
                message: 'Removed from the cart',
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/add-cart'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCartRequest_1.CreateCartRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerCartController.prototype, "addCustomerCart", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/customer-cart-list'),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(3, (0, routing_controllers_1.Req)()),
    tslib_1.__param(4, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerCartController.prototype, "customerCartList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/delete-cart-item'),
    tslib_1.__param(0, (0, routing_controllers_1.BodyParam)('cartId')),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__param(2, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerCartController.prototype, "deleteCartItem", null);
StoreCustomerCartController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.JsonController)('/customer-cart'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        SkuService_1.SkuService,
        CustomerCartService_1.CustomerCartService,
        ProductImageService_1.ProductImageService])
], StoreCustomerCartController);
exports.StoreCustomerCartController = StoreCustomerCartController;
//# sourceMappingURL=CustomerCartController.js.map