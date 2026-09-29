/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import 'reflect-metadata';
import { Post, JsonController, Res, Req, Get, QueryParam, Body, BodyParam, UseBefore } from 'routing-controllers';
import { CustomerCart } from '../../core/models/CustomerCart';
import { CreateCartRequest } from './requests/CreateCartRequest';
import { CheckCustomerMiddleware } from '../../core/middlewares/checkTokenMiddleware';
import { TranslationMiddleware } from '../../core/middlewares/TranslationMiddleware';
import { CustomerCartService } from '../../core/services/CustomerCartService';
import { ProductImageService } from '../../core/services/ProductImageService';
import { ProductTirePriceService } from '../../core/services/ProductTirePriceService';
import { ProductService } from '../../core/services/ProductService';
import { SkuService } from '../../core/services/SkuService';
import { TenantValidationMiddleware } from '../../core/middlewares/TenantValidationMiddleware';
import { In } from 'typeorm';
import { Service } from 'typedi';

@Service()
@UseBefore(TenantValidationMiddleware)
@UseBefore(CheckCustomerMiddleware)
@JsonController('/cart')
export class StoreCustomerCartController {
    constructor(
        private cartService: CustomerCartService,
        private productImageService: ProductImageService,
        private productTirePriceService: ProductTirePriceService,
        private customerCartService: CustomerCartService,
        private productService: ProductService,
        private skuService: SkuService
    ) {
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
    @Post()
    public async addCustomerCart(
        @Body({ validate: true }) cartParam: CreateCartRequest,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {
        const productIds = cartParam.cartDetails.map(cartDetail => cartDetail.productId);
        const skuIds = cartParam.cartDetails.map(cartDetail => cartDetail.skuId);

        const products = await this.productService.find({ where: { productId: In(productIds) } });
        const skus = await this.skuService.findAll({ where: { id: In(skuIds) } });

        const existingCart = await this.customerCartService.find({
            where: {
                customerId: request.user.customerId,
                productId: In(productIds),
            },
        });

        const results = [];
        for (const cartDetail of cartParam.cartDetails) {
            const product = products.find(prod => prod.productId === cartDetail.productId);
            if (!product) {
                return response.status(400).send({ status: 0, message: `Invalid Product ID: ${cartDetail.productId}` });
            }

            const sku = skus.find(skuItem => skuItem.id === cartDetail.skuId);
            if (!sku) {
                return response.status(400).send({ status: 0, message: `Invalid SKU for product ${cartDetail.productId}` });
            }

            const cartItem = existingCart.find(
                existCart => existCart.productId === cartDetail.productId && existCart.skuName === sku.skuName
            );

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
            const product = products.find(p => p.productId === cartDetail.productId);
            const sku = skus.find(s => s.id === cartDetail.skuId);
            const cartItem: any = existingCart.find(c => c.productId === cartDetail.productId && c.skuName === sku.skuName);

            let qty = cartDetail.quantity;
            if (cartItem && cartDetail.type === 'new') {
                qty = Number(cartItem.quantity) + Number(cartDetail.quantity);
            }

            if (cartItem) {
                // Update existing
                cartItem.quantity = qty;
                cartItem.productPrice = cartDetail.productPrice;
                cartItem.total = qty * cartDetail.productPrice;
                cartItem.tirePrice = cartDetail.tirePrice || 0;
                cartItem.vendorId = request.tenantId;
                cartItem.skuName = sku.skuName;

                await this.customerCartService.createData(cartItem);
                results.push({ ...cartItem, status: 'updated' });
            } else {
                // Create new
                const newCart: any = {
                    productId: cartDetail.productId,
                    name: product.name,
                    customerId: request.user.customerId,
                    quantity: qty,
                    productPrice: cartDetail.productPrice,
                    tirePrice: cartDetail.tirePrice || 0,
                    vendorId: request.tenantId,
                    total: qty * cartDetail.productPrice,
                    skuName: sku.skuName,
                    ip: '',
                };

                const saved = await this.customerCartService.createData(newCart);
                results.push({ ...saved, status: 'added' });
            }
        }

        return response.status(200).send({
            status: 1,
            message: 'Cart added successfully.',
            data: results,
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
    @UseBefore(TranslationMiddleware)
    @Get()
    public async customerCartList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {

        const selects = [
            'CustomerCart.id as id',
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
            'vendor.vendorId as vendorId',
            'vendor.displayNameUrl as displayNameUrl',
            'vendor.companyName as companyName',
            'vendor.companyLogo as companyLogo',
            'customer.firstName as vendorName',
            'vendor.companyLogoPath as companyLogoPath',
            'vendor.vendorSlugName as vendorSlugName',
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
        const relations = [
            {
                tableName: 'CustomerCart.product',
                aliasName: 'product',
            },
            {
                tableName: 'product.vendorProducts',
                op: 'inner-cond',
                cond: 'vendorProducts.vendorId = CustomerCart.vendorId',
                aliasName: 'vendorProducts',
            },
            {
                tableName: 'vendorProducts.vendor',
                aliasName: 'vendor',
            },
            {
                tableName: 'vendor.customer',
                aliasName: 'customer',
            },
        ];
        const whereConditions = [
            {
                name: 'CustomerCart.customerId',
                op: 'where',
                value: request.user.customerId,
            },
            {
                name: 'product.isActive',
                op: 'and',
                value: 1,
            },
        ];
        const sort = [{
            name: 'CustomerCart.createdDate',
            order: 'DESC',
        }];
        if (count) {
            const cartCount: any = await this.cartService.listByQueryBuilder(limit, offset, selects, whereConditions, [], relations, [], sort, true, true);
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the cart count.',
                data: cartCount,
            });
        }
        const cartList: any = await this.cartService.listByQueryBuilder(limit, offset, selects, whereConditions, [], relations, [], sort, false, true);
        let grandTotal = 0;
        const findImage = cartList.map(async (value: any) => {
            const temp: any = value;
            temp.taxValue = +value.taxValue;
            temp.optionName = value.optionName;
            temp.quantity = value.quantity;
            temp.tirePrice = value.tirePrice;
            temp.productImage = await this.productImageService.findAll({
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
            } else if (value.productDiscount !== null) {
                temp.pricerefer = value.productDiscount;
                temp.flag = 0;
            } else {
                temp.pricerefer = '';
                temp.flag = '';
            }
            temp.productTirePrices = await this.productTirePriceService.findAll({
                select: ['id', 'quantity', 'price'],
                where: { productId: value.productId, skuId: value.skuId },
            });
            if (value.hasStock === 1) {
                if (value.quantity <= value.outOfStockThreshold) {
                    temp.stockStatus = 'outOfStock';
                } else {
                    temp.stockStatus = 'inStock';
                }
            } else {
                temp.stockStatus = 'inStock';
            }
            return temp;
        });
        const finalResult = await Promise.all(findImage);
        if (cartList) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got the cart list.',
                data: { cartList: finalResult, grandTotal },
            });
        } else {
            return response.status(400).send({
                status: 0,
                message: 'Unable to list cart list.',
            });
        }
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
    @Post('/delete-cart-item')
    public async deleteCartItem(@BodyParam('cartId') cartId: string, @Res() response: any, @Req() request: any): Promise<CustomerCart> {

        const cartIds = cartId?.split(',');

        if (!cartId) {
            const customerCart: any = await this.customerCartService.find({
                where: {
                    customerId: request.user.customerId,
                },
            });
            for (const cart of customerCart) {
                await this.customerCartService.delete(cart.id);
            }
            return response.status(200).send({
                status: 1,
                message: 'Your cart is Empty..!',
            });
        }
        const val = await this.customerCartService.find({ where: { id: In(cartIds) } });

        if (val.length !== cartIds.length) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid cart Item',
            });
        }

        await this.customerCartService.delete(cartIds);

        return response.status(400).send({
            status: 1,
            message: 'Removed from the cart',
        });
    }
}
