/*
 * spurtcommerce community API
 * version 1.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {EntityRepository, Repository} from 'typeorm';
import {Product} from '../models/ProductModel';
import {ProductToCategory} from '../models/ProductToCategory';
import {OrderProduct} from '../models/OrderProduct';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

    public async productList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], categoryId: any = [], priceFrom: string, priceTo: string, price: number, count: number | boolean): Promise<any> {
        console.log(select);
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }

        // Keyword Search
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    query.where(table.name + ' = ' + table.value);
                } else if (operator === 'and' && table.value !== '') {
                    query.andWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                } else if (operator === 'or' && table.value !== '') {
                    query.orWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                } else if (operator === 'andWhere' && table.value !== undefined && table.value !== '') {
                    query.andWhere(table.name + ' = ' + table.value);
                }

            });
        }

        // Keyword Search
        if (categoryId) {
            if (whereConditions && whereConditions.length > 0) {
                whereConditions.forEach((table: any) => {
                    const operator: string = table.op;
                    if (operator === 'inraw' && table.value !== undefined) {
                        const subQb = this.manager
                            .getRepository(ProductToCategory)
                            .createQueryBuilder('productToCategory')
                            .select('product_id')
                            .where('category_id = ' + table.value);
                        query.andWhere(table.name + ' IN (' + subQb.getSql() + ')');
                    }
                });
            }
        }

        if (priceFrom && priceTo) {
            query.andWhere('(product.price >= :priceFrom AND product.price <= :priceTo)', {priceFrom, priceTo});
        }

        if (price) {
            query.orderBy('product.price', price === 1 ? 'ASC' : 'DESC');
        }

        query.orderBy('product.sortOrder', 'ASC');

        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }
        console.log(query.getQuery());
        if (count) {
            return query.getCount();
        }

        return query.getMany();
    }

    public async recentProductSelling(limit: number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(OrderProduct, 'orderProduct');
        query.select(['COUNT(orderProduct.order_id) as ordercount', 'orderProduct.product_id as product']);
        query.groupBy('product');
        query.orderBy('ordercount', 'DESC');
        query.limit(limit);
        console.log(query.getQuery());
        return query.getRawMany();
    }

    // get product max price
    public async productMaxPrice(maximum: any): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        query.select(maximum);
        return query.getRawOne();
    }
    // custom product list
    public async customProductList(limit: number, offset: number, categoryId: any = [], manufacturerId: number, condition: number, keyword: string, priceFrom: string, priceTo: string, price: string): Promise<Product[]> {

        let sql: any = 'SELECT p.product_id as productId, p.price, p.sku, p.upc, p.quantity, p.stock_status_id as stockStatusId, p.manufacturer_id as manufacturerId, p.date_available as dateAvailable,' +
            ' p.sort_order as sortOrder, p.name, p.description, p.amount, p.condition, p.meta_tag_title as metaTagTitle, p.meta_tag_description as metaTagDescription, p.meta_tag_keyword as metaTagKeyword , p.is_active as is_active'  + ' ';

        if (categoryId) {
            sql += 'FROM product_to_category p2c LEFT JOIN product p ON (p2c.product_id = p.product_id) WHERE  p2c.category_id = ' + categoryId +  ' ';
            sql += 'HAVING p.is_Active = 1' + ' ';
        } else {
            sql += 'FROM product p HAVING p.is_Active = 1' + ' ' ;
        }

        if (manufacturerId) {
            sql += 'AND p.manufacturer_id = ' + manufacturerId + ' ';
        }
        if (condition) {
            sql += 'AND p.condition = ' + condition + ' ';
        }
        if (keyword) {
            sql += 'AND p.name LIKE ' +  "'%" + keyword + "%'" + ' ';
        }
        if (priceFrom && priceTo) {
            sql += ' AND p.price >= ' + priceFrom + ' AND p.price <= ' + priceTo + ' ';
        }

        if (price) {
            sql += 'ORDER BY p.price' + ' ' + price + ' ';
        } else {
            sql += 'ORDER BY p.price ASC' + ' ';
        }
        if (limit) {
            sql += 'LIMIT ' + limit + ' ' ;
        }
        if (offset) {
            sql += 'OFFSET ' + offset ;
        }

        const query: any = await this.manager.query(sql);
        console.log(query);
        return query;
    }
    // product count
    public async productCount(keyword: string, manufacturerId: number, categoryId: number, priceFrom: number, priceTo: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        query.select(['COUNT(product.product_id) as productCount']);
        query.where('product.is_active =' + 1);
        if (keyword) {
            query.andWhere('product.name LIKE' + "'%" + keyword + "%'");
        }
        if (manufacturerId) {
        query.andWhere('product.manufacturer_id =' + manufacturerId);
        }
        if (categoryId) {
            const subQb = this.manager
            .getRepository(ProductToCategory)
            .createQueryBuilder('productToCategory')
            .select('product_id')
            .where('category_id = ' + categoryId);
        query.andWhere('product.product_id' + ' IN (' + subQb.getSql() + ')');
        }
        if (priceFrom && priceTo) {
            query.andWhere('(product.price >= :priceFrom AND product.price <= :priceTo)', {priceFrom, priceTo});
        }
        return query.getRawOne();
    }
}
