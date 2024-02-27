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
const CreateCartRequest_1 = require("./requests/CreateCartRequest");
const checkTokenMiddleware_1 = require("../../core/middlewares/checkTokenMiddleware");
const cart_1 = require("@spurtcommerce/cart");
const typeorm_1 = require("typeorm");
let StoreCustomerCartController = class StoreCustomerCartController {
    constructor() {
        // --
    }
    // create and update customer cart API
    /**
     * @api {post} /api/customer-cart/add-cart Add to cart API
     * @apiGroup Customer Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} [productPrice] productPrice
     * @apiParam (Request body) {Number} [tirePrice] tirePrice
     * @apiParam (Request body) {Number} [quantity] quantity
     * @apiParam (Request body) {String} [skuName] skuName
     * @apiParam (Request body) {string} [type] type
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     *      "productPrice" : "",
     *      "tirePrice" : "",
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
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cartResponse = yield (0, cart_1.cartCreate)((0, typeorm_1.getConnection)(), {
                productId: cartParam.productId,
                skuName: cartParam.skuName,
                customerId: request.user.id,
                quantity: cartParam.quantity,
                type: cartParam.type,
                productPrice: cartParam.productPrice,
                tirePrice: cartParam.tirePrice,
                ipAddress: (request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress ||
                    request.connection.socket.remoteAddress).split(',')[0],
            });
            return response.status(cartResponse.status ? 200 : 400).send({
                status: cartResponse.status,
                message: cartResponse.message,
                data: (_a = cartResponse.data) !== null && _a !== void 0 ? _a : undefined,
            });
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
            const cartDetails = yield (0, cart_1.cartList)((0, typeorm_1.getConnection)(), request.user.id, limit, offset, +count);
            if (cartDetails.status === 0) {
                return response.status(400).send({
                    status: cartDetails.status,
                    message: cartDetails.message,
                });
            }
            return response.status(200).send({
                status: cartDetails.status,
                message: cartDetails.message,
                data: cartDetails.data,
            });
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
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const options = {};
            options.customerId = request.user.id;
            if (cartId === null || cartId === void 0 ? void 0 : cartId.trim()) {
                options.productIds = cartId.split(',');
            }
            const cartResponse = yield (0, cart_1.cartDelete)((0, typeorm_1.getConnection)(), options);
            return response.status(cartResponse.status ? 200 : 400).send({
                status: cartResponse.status,
                message: cartResponse.message,
                data: (_a = cartResponse.data) !== null && _a !== void 0 ? _a : undefined,
            });
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
    tslib_1.__metadata("design:paramtypes", [])
], StoreCustomerCartController);
exports.StoreCustomerCartController = StoreCustomerCartController;
//# sourceMappingURL=CustomerCartController.js.map