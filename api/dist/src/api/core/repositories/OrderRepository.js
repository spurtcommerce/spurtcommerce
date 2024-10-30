"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Order_1 = require("../models/Order");
let OrderRepository = class OrderRepository extends typeorm_1.Repository {
    salesList() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['COUNT(order_id) as ordercount', 'MONTH(created_date) as month', 'YEAR(created_date) as year']);
            query.andWhere('payment_process = :process', { process: 1 });
            query.groupBy('month');
            query.addGroupBy('year');
            query.orderBy('year', 'ASC');
            query.addOrderBy('month', 'ASC');
            query.limit('12');
            return query.getRawMany();
        });
    }
    transactionList(year) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['COUNT(order_id) as ordercount', 'MONTH(created_date) as month', 'SUM(order.total) as orderAmount']);
            query.where('order.payment_flag = 1 AND order.payment_status = 1');
            if (year) {
                query.andWhere('YEAR(order.created_date) = :year', { year });
            }
            query.groupBy('month');
            query.addGroupBy('YEAR(created_date)');
            query.orderBy('YEAR(created_date)', 'ASC');
            query.addOrderBy('month', 'ASC');
            return query.getRawMany();
        });
    }
    findAllTodayOrder(todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['SUM(order.total) as total']);
            query.where('DATE(order.createdDate) = :todaydate', { todaydate });
            query.andWhere('payment_process = :process', { process: 1 });
            return query.getRawOne();
        });
    }
    findAllTodayOrderCount(todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['COUNT(order.orderId) as orderCount']);
            query.where('DATE(order.createdDate) = :todaydate', { todaydate });
            query.andWhere('payment_process = :process', { process: 1 });
            return query.getRawOne();
        });
    }
    findTotalOrderAmount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['SUM(order.total) as total']);
            query.where('payment_process = :process', { process: 1 });
            return query.getRawOne();
        });
    }
    orderCount(orderId, orderStatusId, totalAmount, customerName, dateAdded) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['COUNT(DISTINCT(order.orderId)) as orderCount']);
            query.innerJoin('order.orderProduct', 'orderProduct');
            query.where('payment_process = :process', { process: 1 });
            if (orderId) {
                query.andWhere('order.orderPrefixId = :orderPrefixId', { orderPrefixId: orderId });
            }
            if (orderStatusId) {
                query.andWhere('orderProduct.orderStatusId = :orderStatusId', { orderStatusId });
            }
            if (totalAmount) {
                query.andWhere('order.total = :total', { total: totalAmount });
            }
            if (customerName) {
                query.andWhere('order.shippingFirstname = :shippingFirstname', { shippingFirstname: customerName });
            }
            if (dateAdded) {
                query.andWhere(`order.createdDate Like '%${dateAdded}%'`);
            }
            return query.getRawOne();
        });
    }
    dashboardOrdersCount(duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'Order');
            query.select(['COUNT(Order.order_id) as ordersCount', 'COUNT(DISTINCT(vendorOrders.vendor_id)) as vendorsCount']);
            query.leftJoin('Order.vendorOrders', 'vendorOrders');
            query.where('Order.payment_status = 1 AND Order.payment_flag = 1 AND Order.paymentProcess = 1');
            if (duration === 1 && duration) {
                query.andWhere('DATE(Order.created_date) = DATE(NOW())');
            }
            else if (duration === 2 && duration) {
                query.andWhere('WEEK(Order.created_date) = WEEK(NOW()) AND MONTH(Order.created_date) = MONTH(NOW()) AND YEAR(Order.created_date) = YEAR(NOW())');
            }
            else if (duration === 3 && duration) {
                query.andWhere('MONTH(Order.created_date) = MONTH(NOW()) AND YEAR(Order.created_date) = YEAR(NOW())');
            }
            else if (duration === 4 && duration) {
                query.andWhere('YEAR(Order.created_date) = YEAR(NOW())');
            }
            return query.getRawOne();
        });
    }
    ordersCount(duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'Order');
            query.andWhere('Order.paymentFlag = 1 AND Order.paymentStatus = 1 AND Order.paymentProcess = 1');
            if (duration === 1 && duration) {
                query.andWhere('DATE(Order.created_date) = DATE(NOW())');
            }
            else if (duration === 2 && duration) {
                query.andWhere('WEEK(Order.created_date) = WEEK(NOW()) AND MONTH(Order.created_date) = MONTH(NOW()) AND YEAR(Order.created_date) = YEAR(NOW())');
            }
            else if (duration === 3 && duration) {
                query.andWhere('MONTH(Order.created_date) = MONTH(NOW()) AND YEAR(Order.created_date) = YEAR(NOW())');
            }
            else if (duration === 4 && duration) {
                query.andWhere('YEAR(Order.created_date) = YEAR(NOW())');
            }
            return query.getCount();
        });
    }
};
OrderRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Order_1.Order)
], OrderRepository);
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=OrderRepository.js.map