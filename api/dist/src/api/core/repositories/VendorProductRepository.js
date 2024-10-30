"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductsRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorProducts_1 = require("../models/VendorProducts");
const VendorOrders_1 = require("../models/VendorOrders");
const moment_1 = tslib_1.__importDefault(require("moment"));
let VendorProductsRepository = class VendorProductsRepository extends typeorm_1.Repository {
    topProductSelling(id, duration, limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorOrders_1.VendorOrders, 'vendorOrders');
            query.select(['SUM(orderProduct.quantity) as soldCount', 'COUNT(DISTINCT(order.customer_id)) as buyerCount', 'orderProduct.product_id as product']);
            query.leftJoin('vendorOrders.order', 'order');
            query.leftJoin('vendorOrders.orderProduct', 'orderProduct');
            query.where('vendorOrders.vendorId = :id', { id });
            query.andWhere('order.paymentProcess = :paymentProcess', { paymentProcess: 1 });
            if (duration === 1 && duration) {
                query.andWhere('WEEKOFYEAR(vendorOrders.modified_date) = WEEKOFYEAR(NOW())');
            }
            else if (duration === 2 && duration) {
                query.andWhere('MONTH(vendorOrders.modified_date) = MONTH(NOW()) AND YEAR(vendorOrders.modified_date) = YEAR(NOW())');
            }
            else if (duration === 3 && duration) {
                query.andWhere('YEAR(vendorOrders.modified_date) = YEAR(NOW())');
            }
            query.groupBy('product');
            query.orderBy('soldCount', 'DESC');
            query.limit(limit);
            return query.getRawMany();
        });
    }
    vendorActiveProduct(id, limit, offset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorProducts_1.VendorProducts, 'vendorProducts');
            query.select(['vendorProducts.product_id as productId', 'product.is_active as isActive']);
            query.leftJoin('vendorProducts.product', 'product');
            query.where('vendorProducts.vendorId = :id', { id });
            query.andWhere('product.isActive = :isActive', { isActive: 1 });
            query.andWhere('product.dateAvailable <= :currentDate ', { currentDate: (0, moment_1.default)().format('YYYY-MM-DD') });
            query.limit(limit);
            query.offset(offset);
            return query.getRawMany();
        });
    }
    // finding product for vendor category
    findingProduct(categoryId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorProducts_1.VendorProducts, 'vendorProducts');
            query.select(['vendorProducts.product_id as productId']);
            query.innerJoin('vendorProducts.product', 'product');
            query.innerJoin('product.productToCategory', 'productToCategory');
            query.where('productToCategory.categoryId = :categoryId', { categoryId });
            return query.getRawOne();
        });
    }
    vendorProductBasedOnDuration(vendorId, duration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorProducts_1.VendorProducts, 'vendorProducts');
            query.select(['vendorProducts.product_id as productsCount']);
            query.where('vendorProducts.vendorId = :id', { id: vendorId });
            if (duration === 2 && duration) {
                query.andWhere('WEEKOFYEAR(vendorProducts.created_date) = WEEKOFYEAR(NOW())');
            }
            else if (duration === 3 && duration) {
                query.andWhere('MONTH(vendorProducts.created_date) = MONTH(NOW()) AND YEAR(vendorOrders.created_date) = YEAR(NOW())');
            }
            else if (duration === 4 && duration) {
                query.andWhere('YEAR(vendorProducts.created_date) = YEAR(NOW())');
            }
            else if (duration === 1 && duration) {
                query.andWhere('DATE(vendorProducts.created_date) = CURDATE()');
            }
            return query.getCount();
        });
    }
    outOfStockSBasedOnDuration(vendorId, duration, stock) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorProducts_1.VendorProducts, 'vendorProducts');
            query.select(['vendorProducts.product_id as productsCount']);
            query.innerJoin('vendorProducts.product', 'product');
            query.innerJoin('product.skuDetail', 'skuDetail');
            query.where('vendorProducts.vendorId = :id', { id: vendorId });
            if (stock === 1) {
                query.andWhere('skuDetail.quantity = :quantity', { quantity: 0 });
            }
            else if (stock === 2) {
                query.andWhere('skuDetail.quantity >= :quantity', { quantity: 1 });
            }
            query.andWhere('vendorProducts.approvalFlag = :approvalFlag', { approvalFlag: 1 });
            if (duration === 2 && duration) {
                query.andWhere('WEEKOFYEAR(vendorProducts.created_date) = WEEKOFYEAR(NOW())');
            }
            else if (duration === 3 && duration) {
                query.andWhere('MONTH(vendorProducts.created_date) = MONTH(NOW()) AND YEAR(vendorOrders.created_date) = YEAR(NOW())');
            }
            else if (duration === 4 && duration) {
                query.andWhere('YEAR(vendorProducts.created_date) = YEAR(NOW())');
            }
            else if (duration === 1 && duration) {
                query.andWhere('DATE(vendorProducts.created_date) = CURDATE()');
            }
            return query.getCount();
        });
    }
    vendorProductsCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorProducts_1.VendorProducts, 'vendorProducts');
            query.select(['vendorProducts.vendorId']);
            query.innerJoin('vendorProducts.vendor', 'vendor');
            query.where('vendorProducts.vendor_id = :value', { value: id });
            return query.getCount();
        });
    }
    activeVendorProductCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorProducts_1.VendorProducts, 'vendorProducts');
            const currentDate = (0, moment_1.default)().format('YY-MM-DD');
            query.select(['vendorProducts.vendorId']);
            query.innerJoin('vendorProducts.vendor', 'vendor');
            query.innerJoin('vendorProducts.product', 'product');
            query.where('vendorProducts.vendor_id = :value', { value: id });
            query.andWhere('product.is_active = :id', { id: 1 });
            query.andWhere('product.dateAvailable <= :dateValue', { dateValue: currentDate });
            query.andWhere('vendorProducts.reuse IS NULL' + '');
            query.andWhere('vendorProducts.reuseStatus = :statusValue', { statusValue: 0 });
            return query.getCount();
        });
    }
    vendorCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorProducts_1.VendorProducts, 'vendorProducts');
            query.select(['COUNT(vendorProducts.vendorId) as vendorCount']);
            query.where('vendorProducts.product_id = :value', { value: id });
            query.andWhere('vendorProducts.reuse = :val', { val: 1 });
            return query.getRawOne();
        });
    }
    vendorCountAndMinPrice(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorProducts_1.VendorProducts, 'vendorProducts');
            query.select(['COUNT(vendorProducts.vendorId) as vendorCount', 'MIN(sku.price) as minimumPrice']);
            query.leftJoin('vendorProducts.sku', 'sku');
            query.where('vendorProducts.product_id = :value', { value: id });
            query.andWhere('vendorProducts.reuse = 1');
            return query.getRawOne();
        });
    }
};
VendorProductsRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(VendorProducts_1.VendorProducts)
], VendorProductsRepository);
exports.VendorProductsRepository = VendorProductsRepository;
//# sourceMappingURL=VendorProductRepository.js.map