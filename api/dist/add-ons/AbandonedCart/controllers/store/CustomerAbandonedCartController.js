"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAbandonedCartController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const CustomerCartService_1 = require("../../../../src/api/core/services/CustomerCartService");
const ProductImageService_1 = require("../../../../src/api/core/services/ProductImageService");
const ProductService_1 = require("../../../../src/api/core/services/ProductService");
const ProductTirePriceService_1 = require("../../../../src/api/core/services/ProductTirePriceService");
const SkuService_1 = require("../../../../src/api/core/services/SkuService");
const CustomerCart_1 = require("../../../../src/api/core/models/CustomerCart");
const AuthService_1 = require("../../../../src/auth/AuthService");
const CreateCartRequest_1 = require("../../../../src/api/store/controllers/requests/CreateCartRequest");
const AddonValidationMiddleware_1 = require("../../../../src/api/core/middlewares/AddonValidationMiddleware");
let CustomerAbandonedCartController = class CustomerAbandonedCartController {
    constructor(productService, skuService, customerCartService, productImageService, productTirePriceService, authSerivce) {
        this.productService = productService;
        this.skuService = skuService;
        this.customerCartService = customerCartService;
        this.productImageService = productImageService;
        this.productTirePriceService = productTirePriceService;
        this.authSerivce = authSerivce;
    }
    // create and update guest cart API
    /**
     * @api {post} /api/guest-cart Add to cart API
     * @apiGroup Guest Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} [productPrice] productPrice
     * @apiParam (Request body) {Number} [tirePrice] tirePrice
     * @apiParam (Request body) {Number} [quantity] quantity
     * @apiParam (Request body) {String} [skuName] skuName
     * @apiParam (Request body) {string} [type] type
     * @apiParamExample {json} Input
     * {
     *      'productId' : ',
     *      'productPrice' : ',
     *      'tirePrice' : ',
     *      'quantity' : ',
     *      'skuName' : ',
     *      'type' : ',
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'message': 'Successfully added product to cart',
     *      'status': '1'
     * }
     * @apiSampleRequest /api/guest-cart
     * @apiErrorExample {json} Guest cart error
     * HTTP/1.1 500 Internal Server Error
     */
    addGuestCart(cartParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ip = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
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
                    skuName: cartParam.skuName, productId: cartParam.productId, ip, customerId: 0,
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
                findOption.tirePrice = cartParam.tirePrice ? cartParam.tirePrice : 0;
                findOption.vendorId = cartParam.vendorId ? cartParam.vendorId : 0;
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
                    addCustomerCart.customerId = 0,
                    addCustomerCart.quantity = cartParam.quantity,
                    addCustomerCart.productPrice = cartParam.productPrice,
                    addCustomerCart.tirePrice = cartParam.tirePrice ? cartParam.tirePrice : 0,
                    addCustomerCart.vendorId = cartParam.vendorId ? cartParam.vendorId : 0;
                addCustomerCart.total = +cartParam.quantity * +cartParam.productPrice,
                    addCustomerCart.skuName = cartParam.skuName;
                addCustomerCart.ip = ip;
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
    // Guest Cart List API
    /**
     * @api {get} /api/guest-cart  Guest Cart List API
     * @apiGroup Guest Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Boolean} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      'message': 'Successfully got Cart List',
     *      'data':{
     *       'productId' : ',
     *       'name' : ',
     *       'quantity' : ',
     *       'productPrice' : ',
     *       'total' : ',
     *       'image' : ',
     *       'containerName' : ',
     *       'optionName' : ',
     *       'optionValueName' : ',
     *      }
     *      'status': '1'
     * }
     * @apiSampleRequest /api/guest-cart
     * @apiErrorExample {json} Guest Cart error
     * HTTP/1.1 500 Internal Server Error
     */
    guestCartList(response, request, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ip = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            const selects = ['CustomerCart.id as id',
                'CustomerCart.productPrice as productPrice',
                'CustomerCart.tirePrice as tirePrice',
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
                '(SELECT price FROM product_discount pd2 WHERE pd2.product_id = product.product_id AND pd2.sku_id = skuId AND ((pd2.date_start <= CURDATE() AND  pd2.date_end >= CURDATE())) ' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS productDiscount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = product.product_id AND ps.sku_id = skuId AND ((ps.date_start <= CURDATE() AND ps.date_end >= CURDATE()))' + ' ' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS productSpecial',
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
                name: 'CustomerCart.ip',
                op: 'where',
                value: '"' + `${ip.toString()}` + '"',
            });
            whereCondition.push({
                name: 'CustomerCart.customer_id',
                op: 'and',
                value: 0,
            });
            sort.push({
                name: 'CustomerCart.createdDate',
                order: 'DESC',
            });
            const cartCount = yield this.customerCartService.listByQueryBuilder(undefined, undefined, selects, whereCondition, [], relations, groupBy, sort, true, true);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the cart count.',
                    data: cartCount,
                };
                return response.status(200).send(successResponse);
            }
            const cartList = yield this.customerCartService.listByQueryBuilder(undefined, undefined, selects, whereCondition, [], relations, groupBy, sort, false, true);
            let grandTotal = 0;
            const findImage = cartList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
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
                return temp;
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
    // Converts The Guest Cart into Respective Registered Customer's Cart
    // API is called Automactically (Axios) when Customer Log's in..!
    guestToCustomer(customer, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authSerivce.decryptToken(customer.data.token);
            const guestCartDetails = yield this.customerCartService.find({
                select: ['id'],
                where: { ip: customer.data.ip, customerId: 0 },
            });
            const guestCartIds = guestCartDetails.map((item) => item.id);
            if (guestCartIds.length && user) {
                yield this.customerCartService.update(guestCartIds, user.id);
            }
            return response.status(200).send({
                status: 1,
                message: 'GuestCart into CustomerCart Api is called',
            });
        });
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)({ validate: true })),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCartRequest_1.CreateCartRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerAbandonedCartController.prototype, "addGuestCart", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)(),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Req)()),
    tslib_1.__param(2, (0, routing_controllers_1.QueryParam)('count')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerAbandonedCartController.prototype, "guestCartList", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Put)(),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerAbandonedCartController.prototype, "guestToCustomer", null);
CustomerAbandonedCartController = tslib_1.__decorate([
    (0, routing_controllers_1.UseBefore)(AddonValidationMiddleware_1.CheckAddonMiddleware),
    (0, routing_controllers_1.JsonController)('/guest-cart'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        SkuService_1.SkuService,
        CustomerCartService_1.CustomerCartService,
        ProductImageService_1.ProductImageService,
        ProductTirePriceService_1.ProductTirePriceService,
        AuthService_1.AuthService])
], CustomerAbandonedCartController);
exports.CustomerAbandonedCartController = CustomerAbandonedCartController;
//# sourceMappingURL=CustomerAbandonedCartController.js.map