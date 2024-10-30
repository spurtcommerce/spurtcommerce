/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../models/ProductModel';
import { ProductToCategory } from '../models/ProductToCategory';
import { VendorProducts } from '../models/VendorProducts';
import { OrderProduct } from '../models/OrderProduct';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

    public async productList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], categoryId: any = [], priceFrom: string, priceTo: string, price: number, count: number | boolean): Promise<any> {
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
            query.andWhere('(product.price >= :priceFrom AND product.price <= :priceTo)', { priceFrom, priceTo });
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
        if (count) {
            return query.getCount();
        }

        return query.getMany();
    }

    public async recentProductSelling(limit: number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(OrderProduct, 'orderProduct');
        query.select(['COUNT(orderProduct.order_id) as ordercount', 'orderProduct.product_id as product', 'orderProduct.skuName as skuName']);
        query.groupBy('product');
        query.orderBy('ordercount', 'DESC');
        query.limit(limit);
        return query.getRawMany();
    }

    // get product max price
    public async productMaxPrice(maximum: any): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        query.select(maximum);
        return query.getRawOne();
    }
    public async productSlug(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        query.where('product.name = :value', { value: data });
        return query.getMany();
    }

    public async productSlugData(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        query.select('product_slug');
        query.where('product.name = :value', { value: data });
        return query.getMany();
    }

    public async buyedCount(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        query.select('product_slug');
        query.where('OR product.name = :value', { value: data });
        return query.getMany();
    }

    public async findSkuName(productId: number, skuName: string, flag: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        query.select('skuDetail.skuName');
        query.innerJoin('product.skuDetail', 'skuDetail');
        if (flag === 0) {
            query.where('product.productId != :value ', { value: productId });
        } else {
            query.where('product.productId = :value ', { value: productId });
        }
        query.andWhere('skuDetail.skuName LIKE :skuName ', { skuName });
        return query.getRawOne();
    }

    public async validateSkuNameForVendor(productId: number, vendorId: number, skuName: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorProducts, 'vendorProduct');
        query.select('sku.skuName');
        query.innerJoin('vendorProduct.sku', 'sku');
        query.where('vendorProduct.productId != :value ', { value: productId });
        query.andWhere('vendorProduct.vendorId != :vendorId ', { vendorId });
        query.andWhere('sku.skuName = :skuName ', { skuName });
        return query.getRawOne();
    }

    public async checkSlugData(slug: string, id: number): Promise<number> {
        const query = await this.manager.createQueryBuilder(Product, 'product');
        query.where('product.product_slug = :slug', { slug });
        if (id > 0) {
            query.andWhere('product.productId != :id', { id });
        }
        return query.getCount();
    }
    // To get product datas
    public async findProducts(productId: any): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Product, 'product');
        query.select(['product.name as productName', 'product.product_id as productId']);
        query.where('product.product_id IN(:...val)', {val: productId});
        return query.getRawMany();
    }
}
