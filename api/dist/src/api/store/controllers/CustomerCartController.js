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
const ProductTranslationService_1 = require("../../core/services/ProductTranslationService");
const TranslationMiddleware_1 = require("../../core/middlewares/TranslationMiddleware");
const CustomerCartService_1 = require("../../../api/core/services/CustomerCartService");
const ProductImageService_1 = require("../../../api/core/services/ProductImageService");
const ProductTirePriceService_1 = require("../../../api/core/services/ProductTirePriceService");
const CreateMultipleCartRequest_1 = require("./requests/CreateMultipleCartRequest");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
let StoreCustomerCartController = class StoreCustomerCartController {
    constructor(productTranslationService, cartService, productImageService, productTirePriceService, productService, skuService) {
        this.productTranslationService = productTranslationService;
        this.cartService = cartService;
        this.productImageService = productImageService;
        this.productTirePriceService = productTirePriceService;
        this.productService = productService;
        this.skuService = skuService;
        // --
    }
    // create and update customer cart API
    /**
     * @api {post} /api/cart Add to cart API
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
     *      "status": "1",
     *      "data": {
     *              "productId": 1,
     *              "name": "",
     *              "customerId": 1,
     *              "quantity": "",
     *              "productPrice": "",
     *              "tirePrice": "",
     *              "vendorId": 1,
     *              "total": "",
     *              "skuName": "",
     *              "ip": 127.0.0.1,
     *              "createdDate": "",
     *              "modifiedDate": "",
     *              "id": 1
     * }
     * }
     * @apiSampleRequest /api/cart
     * @apiErrorExample {json} vendor category  error
     * HTTP/1.1 500 Internal Server Error
     */
    addCustomerCart(cartParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            var _a;
            const cartResponse = yield (0, cart_1.cartCreate)((0, typeormLoader_1.getDataSource)(), {
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
                vendorId: +cartParam.vendorId,
            });
            return response.status(cartResponse.status ? 200 : 400).send({
                status: cartResponse.status,
                message: cartResponse.message,
                data: (_a = cartResponse.data) !== null && _a !== void 0 ? _a : undefined,
            });
        });
    }
    /**
     * @api {post} /api/cart/add-mutiple-carts Add Multiple Carts
     * @apiGroup Customer Cart
     * @apiHeader {String} Authorization Bearer token
     *
     * @apiParam (Request Body) {Number} vendorId Vendor ID
     * @apiParam (Request Body) {Object[]} cartDetails List of cart product details
     * @apiParam (Request Body) {Number} cartDetails.productId Product ID
     * @apiParam (Request Body) {Number} cartDetails.productPrice Product Price
     * @apiParam (Request Body) {Number} cartDetails.tirePrice Tire Price
     * @apiParam (Request Body) {Number} cartDetails.quantity Quantity
     * @apiParam (Request Body) {String} cartDetails.skuName SKU Name
     * @apiParam (Request Body) {String} cartDetails.type Type
     * @apiParam (Request Body) {String} cartDetails.productType Product Type
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *   "status": 1,
     *   "message": "Cart added successfully.",
     *   "data": []
     * }
     *
     * @apiSampleRequest /api/cart/add-mutiple-carts
     *
     * @apiErrorExample {json} Error Response
     * HTTP/1.1 500 Internal Server Error
     * {
     *   "status": 0,
     *   "message": "Internal server error."
     * }
     */
    addMultipleCustomerCart(cartParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productIds = cartParam.cartDetails.map(cartDetail => cartDetail.productId);
            const skuNames = cartParam.cartDetails.map(cartDetail => cartDetail.skuName);
            const products = yield this.productService.find({ where: { productId: (0, typeorm_1.In)(productIds) } });
            const skus = yield this.skuService.findAll({ where: { skuName: (0, typeorm_1.In)(skuNames) } });
            const existingCart = yield this.cartService.find({
                where: {
                    customerId: request.user.id,
                    productId: (0, typeorm_1.In)(productIds),
                },
            });
            const results = [];
            for (const cartDetail of cartParam.cartDetails) {
                const product = products.find(prod => prod.productId === cartDetail.productId);
                if (!product) {
                    return response.status(400).send({ status: 0, message: `Invalid Product ID: ${cartDetail.productId}` });
                }
                const sku = skus.find(skuItem => skuItem.skuName === cartDetail.skuName);
                if (!sku) {
                    return response.status(400).send({ status: 0, message: `Invalid SKU for product ${cartDetail.productId}` });
                }
                const cartItem = existingCart.find(existCart => existCart.productId === cartDetail.productId && existCart.skuName === sku.skuName);
                if (cartDetail.quantity > 0) {
                    let qty = cartDetail.quantity;
                    if (cartItem && cartDetail.type === 'new') {
                        qty = Number(cartItem.quantity) + Number(cartDetail.quantity);
                    }
                    if (product.hasStock === 1) {
                        if (qty < sku.minQuantityAllowedCart) {
                            return response.status(400).send({
                                status: 0,
                                message: `Quantity should be greater than min quantity. (Product: ${product.name})`,
                            });
                        }
                        if (qty > sku.maxQuantityAllowedCart) {
                            return response.status(400).send({
                                status: 0,
                                message: `Reached maximum quantity limit. (Product: ${product.name})`,
                            });
                        }
                    }
                }
            }
            for (const cartDetail of cartParam.cartDetails) {
                const product = products.find(prod => prod.productId === cartDetail.productId);
                const sku = skus.find(skuVal => skuVal.skuName === cartDetail.skuName);
                const cartItem = existingCart.find(c => c.productId === cartDetail.productId && c.skuName === sku.skuName);
                let qty = cartDetail.quantity;
                if (cartItem && cartDetail.type === 'new') {
                    qty = Number(cartItem.quantity) + Number(cartDetail.quantity);
                }
                if (cartItem) {
                    // Update existing
                    cartItem.quantity = cartDetail.productType === 'physical' ? qty : 1;
                    cartItem.productPrice = cartDetail.productPrice;
                    cartItem.total = qty * cartDetail.productPrice;
                    cartItem.tirePrice = cartDetail.tirePrice || 0;
                    cartItem.vendorId = cartParam.vendorId;
                    cartItem.skuName = sku.skuName;
                    cartItem.productType = cartDetail.productType;
                    yield this.cartService.createData(cartItem);
                    results.push(Object.assign(Object.assign({}, cartItem), { status: 'updated' }));
                }
                else {
                    // Create new
                    const newCart = {
                        productId: cartDetail.productId,
                        name: product.name,
                        customerId: request.user.id,
                        quantity: cartDetail.productType === 'physical' ? qty : 1,
                        productPrice: cartDetail.productPrice,
                        tirePrice: cartDetail.tirePrice || 0,
                        vendorId: cartParam.vendorId,
                        total: qty * cartDetail.productPrice,
                        skuName: sku.skuName,
                        productType: cartDetail.productType,
                        ip: (request.headers['x-forwarded-for'] ||
                            request.connection.remoteAddress ||
                            request.socket.remoteAddress ||
                            request.connection.socket.remoteAddress).split(',')[0],
                    };
                    const saved = yield this.cartService.createData(newCart);
                    results.push(Object.assign(Object.assign({}, saved), { status: 'added' }));
                }
            }
            return response.status(200).send({
                status: 1,
                message: 'Cart added successfully.',
                data: results,
            });
        });
    }
    // Customer Cart List API
    /**
     * @api {get} /api/cart  Customer Cart List API
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
     *       "productId" : 1,
     *       "name" : "",
     *       "quantity" : 1,
     *       "productPrice" : "",
     *       "total" : "",
     *       "image" : "",
     *       "containerName" : "",
     *       "optionName" : "",
     *       "optionValueName" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/cart
     * @apiErrorExample {json} Customer Cart error
     * HTTP/1.1 500 Internal Server Error
     */
    customerCartList(limit, offset, productType, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const selects = [
                'CustomerCart.id as id',
                'CustomerCart.productPrice as productPrice',
                'CustomerCart.tirePrice as tirePrice',
                'CustomerCart.total as total',
                'CustomerCart.skuName as skuName',
                'CustomerCart.productType as productType',
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
                'vendor.vendorId as vendorId',
                'vendor.displayNameUrl as displayNameUrl',
                'vendor.companyName as companyName',
                'vendor.companyLogo as companyLogo',
                'customer.firstName as vendorName',
                'vendor.companyLogoPath as companyLogoPath',
                'vendor.vendorSlugName as vendorSlugName',
                'IF(product.taxType = 2, (SELECT tax.tax_percentage FROM tax WHERE tax.tax_id = `product`.`tax_value` LIMIT 1), product.taxValue)  as taxValue',
                '(SELECT sku.id as skuId FROM sku WHERE sku.sku_name = skuName) as skuId',
                '(SELECT sku.price as price FROM sku WHERE sku.id = skuId) as price',
                '(SELECT sku.out_of_stock_threshold as outOfStockThreshold FROM sku WHERE sku.id = skuId) as outOfStockThreshold',
                '(SELECT sku.notify_min_quantity_below as notifyMinQuantity FROM sku WHERE sku.id = skuId) as notifyMinQuantity',
                '(SELECT sku.min_quantity_allowed_cart as minQuantityAllowedCart FROM sku WHERE sku.id = skuId) as minQuantityAllowedCart',
                '(SELECT sku.max_quantity_allowed_cart as maxQuantityAllowedCart FROM sku WHERE sku.id = skuId) as maxQuantityAllowedCart',
                '(SELECT sku.enable_back_orders as enableBackOrders FROM sku WHERE sku.id = skuId) as enableBackOrders',
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
            ];
            const whereCondition = [{
                    name: 'CustomerCart.customerId',
                    op: 'where',
                    value: request.user.id,
                },
                {
                    name: 'product.isActive',
                    op: 'and',
                    value: 1,
                }];
            const relations = [];
            const groupBy = [];
            const sort = [];
            relations.push({
                tableName: 'CustomerCart.product',
                aliasName: 'product',
            }, {
                tableName: 'product.vendorProducts',
                op: 'inner-cond',
                cond: 'vendorProducts.vendorId = CustomerCart.vendorId',
                aliasName: 'vendorProducts',
            }, {
                tableName: 'vendorProducts.vendor',
                aliasName: 'vendor',
            }, {
                tableName: 'vendor.customer',
                aliasName: 'customer',
            });
            if (productType && productType !== '') {
                whereCondition.push({
                    name: 'CustomerCart.productType',
                    op: 'and',
                    value: productType,
                });
            }
            sort.push({
                name: 'CustomerCart.createdDate',
                order: 'DESC',
            });
            if (count) {
                const cartCount = yield this.cartService.listByQueryBuilder(limit, offset, selects, whereCondition, [], relations, groupBy, sort, true, true);
                return {
                    status: 1,
                    message: 'Successfully got the cart count',
                    data: cartCount,
                };
            }
            const cartList = yield this.cartService.listByQueryBuilder(limit, offset, selects, whereCondition, [], relations, groupBy, sort, false, true);
            let grandTotal = 0;
            const findImage = cartList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a;
                const temp = value;
                const productTranslation = yield this.productTranslationService.findOne({ where: { productId: value.productId, languageId: (_a = request.languageId) !== null && _a !== void 0 ? _a : 0 } });
                temp.productTranslation = productTranslation ? [productTranslation] : [];
                // return cart;
                temp.taxValue = +value.taxValue;
                temp.optionName = value.optionName;
                temp.quantity = value.quantity;
                temp.tirePrice = value.tirePrice;
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
                temp.productTirePrices = yield this.productTirePriceService.findAll({
                    select: ['id', 'quantity', 'price'],
                    where: { productId: value.productId, skuId: value.skuId },
                });
                if (value.productType === 'physical') {
                    if (value.hasStock === 1) {
                        if (value.quantity <= value.outOfStockThreshold) {
                            temp.stockStatus = 'outOfStock';
                        }
                        else {
                            temp.stockStatus = 'inStock';
                        }
                    }
                    else {
                        temp.stockStatus = 'inStock';
                    }
                }
                return temp;
            }));
            const finalResult = yield Promise.all(findImage);
            if (cartList) {
                return {
                    status: 1,
                    message: 'Successfully got the cart list',
                    data: { cartList: finalResult, grandTotal },
                };
            }
            else {
                return {
                    status: 0,
                    message: 'unable to list cart list',
                };
            }
            // const cartDetails = await cartList(
            //     getDataSource(),
            //     request.user.id,
            //     limit,
            //     offset,
            //     +count
            // );
            // if (cartDetails.status === 0) {
            //     return response.status(400).send({
            //         status: cartDetails.status,
            //         message: cartDetails.message,
            //     });
            // }
            // if (!count) {
            //     cartDetails.data.cartList = await Promise.all(cartDetails.data.cartList.map(async (cart) => {
            //         const productTranslation = await this.productTranslationService.findOne({ where: { productId: cart.productId, languageId: request.languageId ?? 0 } });
            //         cart.productTranslation = productTranslation ? [productTranslation] : [];
            //         return cart;
            //     }));
            // }
            // return response.status(200).send({
            //     status: cartDetails.status,
            //     message: cartDetails.message,
            //     data: cartDetails.data,
            // });
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
            var _a;
            const options = {};
            options.customerId = request.user.id;
            if (cartId === null || cartId === void 0 ? void 0 : cartId.trim()) {
                options.productIds = cartId.split(',');
            }
            const cartResponse = yield (0, cart_1.cartDelete)((0, typeormLoader_1.getDataSource)(), options);
            return response.status(cartResponse.status ? 200 : 400).send({
                status: cartResponse.status,
                message: cartResponse.message,
                data: (_a = cartResponse.data) !== null && _a !== void 0 ? _a : undefined,
            });
        });
    }
};
exports.StoreCustomerCartController = StoreCustomerCartController;
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCartRequest_1.CreateCartRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerCartController.prototype, "addCustomerCart", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/add-mutiple-carts'),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateMultipleCartRequest_1.CreateMultipleCartRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreCustomerCartController.prototype, "addMultipleCustomerCart", null);
tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(TranslationMiddleware_1.TranslationMiddleware),
    (0, routing_controllers_1.Get)(),
    tslib_1.__param(0, (0, routing_controllers_1.QueryParam)('limit')),
    tslib_1.__param(1, (0, routing_controllers_1.QueryParam)('offset')),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('productType')),
    tslib_1.__param(3, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__param(4, (0, routing_controllers_1.Req)()),
    tslib_1.__param(5, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object, Object]),
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
exports.StoreCustomerCartController = StoreCustomerCartController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.UseBefore)(checkTokenMiddleware_1.CheckCustomerMiddleware),
    (0, routing_controllers_1.JsonController)('/cart'),
    tslib_1.__metadata("design:paramtypes", [ProductTranslationService_1.ProductTranslationService,
        CustomerCartService_1.CustomerCartService,
        ProductImageService_1.ProductImageService,
        ProductTirePriceService_1.ProductTirePriceService,
        ProductService_1.ProductService,
        SkuService_1.SkuService])
], StoreCustomerCartController);
//# sourceMappingURL=CustomerCartController.js.map