"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductRepository = void 0;
const tslib_1 = require("tslib");
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
const typeorm_1 = require("typeorm");
const OrderProduct_1 = require("../models/OrderProduct");
let OrderProductRepository = class OrderProductRepository extends typeorm_1.Repository {
    topPerformingProduct(limit, offset, count, duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'OrderProduct');
            query.select([
                'COUNT(OrderProduct.product_id) as topPerformingProductCount',
                'MAX(OrderProduct.name) as productName',
                'MAX(OrderProduct.product_id) as productId',
                'MAX(productImage.image) as image',
                'MAX(productImage.container_name) as containerName',
                'MAX(productImage.default_image) as defaultImage',
                'MAX(vendorProducts.vendor_id) as vendor',
                'MAX(vendor.company_name) as companyName',
                'Max(OrderProduct.createdDate) as createdDate',
                'Max(OrderProduct.modifiedDate) as modifiedDate'
            ]);
            query.innerJoin('OrderProduct.productInformationDetail', 'productInformationDetail');
            query.leftJoin('OrderProduct.product', 'product');
            query.leftJoin('productInformationDetail.productImage', 'productImage');
            query.leftJoin('productInformationDetail.vendorProducts', 'vendorProducts');
            query.leftJoin('vendorProducts.vendor', 'vendor');
            query.where('productImage.default_image = 1');
            query.andWhere('product.payment_status = 1 AND product.payment_flag = 1 AND product.payment_process = 1');
            if (duration === 1 && duration) {
                query.andWhere('DATE(OrderProduct.created_date) = DATE(NOW())');
            }
            else if (duration === 2 && duration) {
                query.andWhere('WEEK(OrderProduct.created_date) = WEEK(NOW()) AND MONTH(OrderProduct.created_date) = MONTH(NOW()) AND YEAR(OrderProduct.created_date) = YEAR(NOW())');
            }
            else if (duration === 3 && duration) {
                query.andWhere('MONTH(OrderProduct.created_date) = MONTH(NOW()) AND YEAR(OrderProduct.created_date) = YEAR(NOW())');
            }
            else if (duration === 4 && duration) {
                query.andWhere('YEAR(OrderProduct.created_date) = YEAR(NOW())');
            }
            query.groupBy('OrderProduct.product_id');
            query.orderBy('topPerformingProductCount', 'DESC');
            query.orderBy('MAX(OrderProduct.createdDate)', 'DESC');
            query.limit(limit);
            query.offset(offset);
            if (count) {
                return query.getCount();
            }
            else {
                return query.getRawMany();
            }
        });
    }
    List(limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'orderProduct');
            query.select(['DISTINCT product_id as productId', 'order_id as orderId', 'name as ProductName', 'quantity as Quantity', 'total as Total', ' created_date as CreatedDate', 'sku_name as skuName', 'varient_name as varientName']);
            query.orderBy('created_date', 'DESC');
            query.limit(limit);
            return query.getRawMany();
        });
    }
    // get earnings
    getEarnings(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'orderProduct');
            query.select(['SUM(orderProduct.total + orderProduct.discountAmount) as productPriceTotal', 'COUNT(orderProduct.orderId) as orderCount', 'SUM(orderProduct.quantity) as quantityCount', 'COUNT(DISTINCT(product.customer_id)) as buyerCount']);
            query.innerJoin('orderProduct.product', 'product');
            query.where('orderProduct.productId = :productId', { productId: id });
            query.andWhere('product.paymentStatus = :value1', { value1: 1 });
            return query.getRawOne();
        });
    }
    buyedCount(productId, customerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'orderProduct');
            query.select('orderProduct.orderProductId');
            query.innerJoin('orderProduct.order', 'order');
            query.where('orderProduct.productId = :id AND order.customerId = :customerId ', { id: productId, customerId });
            query.andWhere('order.paymentStatus = :paymentStatus', { paymentStatus: 1 });
            return query.getRawMany();
        });
    }
    // get product payment process
    productPaymentProcess(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'orderProduct');
            query.select(['orderProduct.orderProductId']);
            query.innerJoin('orderProduct.order', 'order');
            query.where('orderProduct.productId = :productId', { productId: id });
            query.andWhere('order.paymentProcess = :value1', { value1: 1 });
            return query.getRawOne();
        });
    }
    // get product varient payment process
    productVarientPaymentProcess(sku) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'orderProduct');
            query.select(['orderProduct.orderProductId']);
            query.innerJoin('orderProduct.order', 'order');
            query.where('orderProduct.skuName = :sku', { sku });
            query.andWhere('order.paymentProcess = :value1', { value1: 1 });
            return query.getRawOne();
        });
    }
    salesGraphList(year, month) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'orderProduct');
            query.select(['COUNT(product_id) as productCount', 'DAYOFMONTH(MAX(orderProduct.created_date)) as dayOfMonth', 'MONTH(MAX(orderProduct.created_date)) as month', 'YEAR(MAX(orderProduct.created_date)) as year']);
            query.leftJoin('orderProduct.order', 'order');
            query.where('order.payment_process = :process', { process: 1 });
            query.andWhere('order.payment_status = :status', { status: 1 });
            query.andWhere('order.payment_flag = :flag', { flag: 1 });
            query.andWhere('YEAR(orderProduct.created_date) = :year', { year });
            query.andWhere('MONTH(orderProduct.created_date) = :month', { month });
            query.groupBy('DAYOFMONTH(orderProduct.created_date)');
            query.orderBy('DAYOFMONTH(orderProduct.created_date)', 'ASC');
            return query.getRawMany();
        });
    }
    // Top ten weekly sales list API
    topTenWeeklySales(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'OrderProduct');
            query.select(['MAX(DAYNAME(OrderProduct.created_date)) as days', 'COUNT(OrderProduct.product_id) as value']);
            query.leftJoin('OrderProduct.product', 'product');
            query.where('OrderProduct.product_id = :val', { val: productId });
            query.andWhere('product.payment_status = 1 AND product.payment_flag = 1 AND product.payment_process = 1');
            query.andWhere('WEEK(OrderProduct.created_date) = WEEK(NOW()) AND MONTH(OrderProduct.created_date) = MONTH(NOW()) AND YEAR(OrderProduct.created_date) = YEAR(NOW())');
            query.groupBy('OrderProduct.product_id');
            query.addGroupBy('DAYOFWEEK(OrderProduct.created_date)');
            return query.getRawMany();
        });
    }
    // getting sum of total from order products
    dashboardOrderProductsTotal(duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'OrderProduct');
            query.select(['ROUND(SUM(OrderProduct.total), 2) as orderProductsTotal', 'COUNT(OrderProduct.orderId) as ordersCount']);
            query.leftJoin('OrderProduct.product', 'product');
            query.where('NOT EXISTS(SELECT vendor_product.product_id FROM vendor_product WHERE vendor_product.product_id = OrderProduct.productId)');
            query.andWhere('product.paymentFlag = 1 AND product.paymentStatus = 1 AND product.payment_process = 1');
            if (duration === 1 && duration) {
                query.andWhere('DATE(OrderProduct.created_date) = DATE(NOW())');
            }
            else if (duration === 2 && duration) {
                query.andWhere('WEEK(OrderProduct.created_date) = WEEK(NOW()) AND MONTH(OrderProduct.created_date) = MONTH(NOW()) AND YEAR(OrderProduct.created_date) = YEAR(NOW())');
            }
            else if (duration === 3 && duration) {
                query.andWhere('MONTH(OrderProduct.created_date) = MONTH(NOW()) AND YEAR(OrderProduct.created_date) = YEAR(NOW())');
            }
            else if (duration === 4 && duration) {
                query.andWhere('YEAR(OrderProduct.created_date) = YEAR(NOW())');
            }
            return query.getRawOne();
        });
    }
    checkSkuForVariant(skuName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'orderProduct');
            query.select('orderProduct.skuName');
            query.innerJoin('orderProduct.order', 'order');
            query.where('orderProduct.skuName = :sku', { sku: skuName });
            query.andWhere('order.paymentStatus = 1 AND order.paymentFlag = 1');
            return query.getRawMany();
        });
    }
};
OrderProductRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(OrderProduct_1.OrderProduct)
], OrderProductRepository);
exports.OrderProductRepository = OrderProductRepository;
//# sourceMappingURL=OrderProductRepository.js.map