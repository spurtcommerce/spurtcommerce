/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorProducts } from '../models/VendorProducts';
import { VendorOrders } from '../models/VendorOrders';
import moment from 'moment';

@EntityRepository(VendorProducts)
export class VendorProductsRepository extends Repository<VendorProducts> {

    public async topProductSelling(id: number, duration: number, limit: number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrders');
        query.select(['SUM(orderProduct.quantity) as soldCount', 'COUNT(DISTINCT(order.customer_id)) as buyerCount', 'orderProduct.product_id as product']);
        query.leftJoin('vendorOrders.order', 'order');
        query.leftJoin('vendorOrders.orderProduct', 'orderProduct');
        query.where('vendorOrders.vendorId = :id', { id });
        query.andWhere('order.paymentProcess = :paymentProcess', { paymentProcess: 1 });
        if (duration === 1 && duration) {
            query.andWhere('WEEKOFYEAR(vendorOrders.modified_date) = WEEKOFYEAR(NOW())');
        } else if (duration === 2 && duration) {
            query.andWhere('MONTH(vendorOrders.modified_date) = MONTH(NOW()) AND YEAR(vendorOrders.modified_date) = YEAR(NOW())');
        } else if (duration === 3 && duration) {
            query.andWhere('YEAR(vendorOrders.modified_date) = YEAR(NOW())');
        }
        query.groupBy('product');
        query.orderBy('soldCount', 'DESC');
        query.limit(limit);
        return query.getRawMany();
    }

    public async vendorActiveProduct(id: number, limit: number, offset: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorProducts, 'vendorProducts');
        query.select(['vendorProducts.product_id as productId', 'product.is_active as isActive']);
        query.leftJoin('vendorProducts.product', 'product');
        query.where('vendorProducts.vendorId = :id', { id });
        query.andWhere('product.isActive = :isActive', { isActive: 1 });
        query.andWhere('product.dateAvailable <= :currentDate ', { currentDate: moment().format('YYYY-MM-DD') });
        query.limit(limit);
        query.offset(offset);
        return query.getRawMany();
    }

    // finding product for vendor category
    public async findingProduct(categoryId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorProducts, 'vendorProducts');
        query.select(['vendorProducts.product_id as productId']);
        query.innerJoin('vendorProducts.product', 'product');
        query.innerJoin('product.productToCategory', 'productToCategory');
        query.where('productToCategory.categoryId = :categoryId', { categoryId });
        return query.getRawOne();
    }

    public async vendorProductBasedOnDuration(vendorId: number, duration: number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(VendorProducts, 'vendorProducts');
        query.select(['vendorProducts.product_id as productsCount']);
        query.where('vendorProducts.vendorId = :id', { id: vendorId });
        if (duration === 2 && duration) {
            query.andWhere('WEEKOFYEAR(vendorProducts.created_date) = WEEKOFYEAR(NOW())');
        } else if (duration === 3 && duration) {
            query.andWhere('MONTH(vendorProducts.created_date) = MONTH(NOW()) AND YEAR(vendorOrders.created_date) = YEAR(NOW())');
        } else if (duration === 4 && duration) {
            query.andWhere('YEAR(vendorProducts.created_date) = YEAR(NOW())');
        } else if (duration === 1 && duration) {
            query.andWhere('DATE(vendorProducts.created_date) = CURDATE()');
        }
        return query.getCount();
    }

    public async outOfStockSBasedOnDuration(vendorId: number, duration: number, stock: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorProducts, 'vendorProducts');
        query.select(['vendorProducts.product_id as productsCount']);
        query.innerJoin('vendorProducts.product', 'product');
        query.innerJoin('product.skuDetail', 'skuDetail');
        query.where('vendorProducts.vendorId = :id', { id: vendorId });
        if (stock === 1) {
            query.andWhere('skuDetail.quantity = :quantity', { quantity: 0 });
        } else if (stock === 2) {
            query.andWhere('skuDetail.quantity >= :quantity', { quantity: 1 });
        }
        query.andWhere('vendorProducts.approvalFlag = :approvalFlag', { approvalFlag: 1 });
        if (duration === 2 && duration) {
            query.andWhere('WEEKOFYEAR(vendorProducts.created_date) = WEEKOFYEAR(NOW())');
        } else if (duration === 3 && duration) {
            query.andWhere('MONTH(vendorProducts.created_date) = MONTH(NOW()) AND YEAR(vendorOrders.created_date) = YEAR(NOW())');
        } else if (duration === 4 && duration) {
            query.andWhere('YEAR(vendorProducts.created_date) = YEAR(NOW())');
        } else if (duration === 1 && duration) {
            query.andWhere('DATE(vendorProducts.created_date) = CURDATE()');
        }
        return query.getCount();
    }
    public async vendorProductsCount(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorProducts, 'vendorProducts');
        query.select(['vendorProducts.vendorId']);
        query.innerJoin('vendorProducts.vendor', 'vendor');
        query.where('vendorProducts.vendor_id = :value', { value: id });
        return query.getCount();
    }
    public async activeVendorProductCount(id: number): Promise<any> {
        const query = await this.manager.createQueryBuilder(VendorProducts, 'vendorProducts');
        const currentDate = moment().format('YY-MM-DD');
        query.select(['vendorProducts.vendorId']);
        query.innerJoin('vendorProducts.vendor', 'vendor');
        query.innerJoin('vendorProducts.product', 'product');
        query.where('vendorProducts.vendor_id = :value', { value: id });
        query.andWhere('product.is_active = :id', { id: 1 });
        query.andWhere('product.dateAvailable <= :dateValue', { dateValue: currentDate });
        query.andWhere('vendorProducts.reuse IS NULL' + '');
        query.andWhere('vendorProducts.reuseStatus = :statusValue', { statusValue: 0 });
        return query.getCount();
    }

    public async vendorCount(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorProducts, 'vendorProducts');
        query.select(['COUNT(vendorProducts.vendorId) as vendorCount']);
        query.where('vendorProducts.product_id = :value', { value: id });
        query.andWhere('vendorProducts.reuse = :val', { val: 1 });
        return query.getRawOne();
    }

    public async vendorCountAndMinPrice(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorProducts, 'vendorProducts');
        query.select(['COUNT(vendorProducts.vendorId) as vendorCount', 'MIN(sku.price) as minimumPrice']);
        query.leftJoin('vendorProducts.sku', 'sku');
        query.where('vendorProducts.product_id = :value', { value: id });
        query.andWhere('vendorProducts.reuse = 1');
        return query.getRawOne();
    }
}
