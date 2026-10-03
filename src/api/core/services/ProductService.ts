/*
 * spurtcommerce API
 * version 1.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Product } from '../models/ProductModel';
import { ProductRepository } from '../repositories/ProductRepository';
import { Brackets, Like, Not } from 'typeorm';
import { pluginModule } from '../../../loaders/pluginLoader';

@Service()
export class ProductService {
    constructor(
        private productRepository: ProductRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public find(product: any): Promise<any> {
        this.log.info('find method called');
        return this.productRepository.repository.find(product);
    }

    public findAll(): Promise<any> {
        this.log.info('findAll method called');
        return this.productRepository.repository.find();
    }

    public async findOne(findCondition: any): Promise<any> {
        this.log.info('findOne method called');
        return await this.productRepository.repository.findOne(findCondition);
    }

    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], search: any = [], price: number, count: number | boolean): Promise<any> {
        this.log.info('list method called');
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any, index: number) => {
                if (item.sign !== undefined && !['=', '!=', '<>', '>', '<', '>=', '<=', 'LIKE', 'NOT LIKE', 'OR'].includes(item.sign)) {
                    return;
                }
                const operator: string = item.op;
                if (operator === 'where' && item.value !== '') {
                    condition.where[item.name] = item.value;
                } else if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = Like('%' + item.value + '%');
                } else if (operator === 'not' && item.value !== '') {
                    condition.where[item.name] = Not(item.value);
                }
            });
        }

        if (search && search.length > 0) {
            search.forEach((item: any) => {
                const operator: string = item.op;
                if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }
        if (price && price === 1) {
            condition.order = {
                price: 'ASC',
                createdDate: 'DESC',
            };
        } else if (price && price === 2) {
            condition.order = {
                price: 'DESC',
                createdDate: 'DESC',
            };
        } else {
            condition.order = {
                createdDate: 'DESC',
            };
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.productRepository.repository.count(condition);
        }
        return this.productRepository.repository.find(condition);
    }

    public async create(product: Product): Promise<Product> {
        this.log.info('create method called');
        return await this.productRepository.repository.save(product);
    }

    public async bulkCreate(productData: Product[]): Promise<any> {
        this.log.info('bulkCreate method called');
        const newProducts = await this.productRepository.repository.save(productData);
        return newProducts;
    }

    public update(id: any, product: Partial<Product>): Promise<Product> {
        this.log.info('update method called');
        product.productId = id;
        return this.productRepository.repository.save(product);
    }

    public async delete(id: number): Promise<any> {
        this.log.info('delete method called');
        const newProduct = await this.productRepository.repository.delete(id);
        return newProduct;
    }

    public async productList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], categoryId: any = [], priceFrom: string, priceTo: string, price: number, count: number | boolean): Promise<any> {
        this.log.info('productList method called');
        return await this.productRepository.productList(limit, offset, select, searchConditions, whereConditions, categoryId, priceFrom, priceTo, price, count);
    }

    public async recentProductSelling(limit: number): Promise<any> {
        this.log.info('recentProductSelling method called');
        return await this.productRepository.recentProductSelling(limit);
    }

    public async productMaxPrice(maximum: any): Promise<any> {
        this.log.info('productMaxPrice method called');
        return await this.productRepository.productMaxPrice(maximum);
    }

    public async slugData(data: string): Promise<any> {
        this.log.info('slugData method called');
        return await this.productRepository.productSlug(data);
    }

    public async slug(data: string): Promise<any> {
        this.log.info('slug method called');
        return await this.productRepository.productSlugData(data);
    }

    public async findSkuName(productId: number, skuName: string, flag: number): Promise<any> {
        this.log.info('findSkuName method called');
        return await this.productRepository.findSkuName(productId, skuName, flag);
    }

    public async validateSkuNameForVendor(productId: number, vendorId: number, skuName: string): Promise<any> {
        this.log.info('validateSkuNameForVendor method called');
        return await this.productRepository.validateSkuNameForVendor(productId, vendorId, skuName);
    }

    public async findProducts(productId: any): Promise<any> {
        this.log.info('findProducts method called');
        return await this.productRepository.findProducts(productId);
    }

    public async listByQueryBuilder(
        limit: number,
        offset: number,
        select: any = [],
        whereConditions: any = [],
        searchConditions: any = [],
        relations: any = [],
        groupBy: any = [],
        sort: any = [],
        count: boolean = false,
        rawQuery: boolean = false)
        : Promise<Product[] | any> {

        this.log.info('listByQueryBuilder method called');

        const query: any = await getDataSource().getRepository(Product).createQueryBuilder();
        if (select && select.length > 0) {
            query.select(select);
        }
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.op === 'left') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'inner') {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'leftCond') {
                    query.leftJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond, joinTb.condParams ?? {});
                } else if (joinTb.op === 'innerCond') {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond, joinTb.condParams ?? {});
                } else if (joinTb.op === 'inner-select') {
                    query.innerJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'left-select') {
                    query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                } else if (joinTb.op === 'left-select-cond') {
                    query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName, joinTb.cond, joinTb.condParams ?? {});
                } else {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName);
                }
            });
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any, index: number) => {
                if (item.sign !== undefined && !['=', '!=', '<>', '>', '<', '>=', '<=', 'LIKE', 'NOT LIKE', 'OR'].includes(item.sign)) {
                    return;
                }
                if (item.op === 'where' && item.sign === undefined) {
                    query.where(`${item.name} = :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'and' && item.sign === undefined) {
                    query.andWhere(`${item.name} = :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'and' && item.sign !== undefined) {
                    query.andWhere(`${item.name} ${item.sign} :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'raw' && item.sign !== undefined) {
                    query.andWhere(`${item.name} ${item.sign} :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'raw' && item.sign === undefined) {
                    query.andWhere(item.name + ' ');
                } else if (item.op === 'rawnumber' && item.sign !== undefined) {
                    query.andWhere(`${item.name} ${item.sign} :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'rawnumberor' && item.sign !== undefined) {
                    query.orWhere(`${item.name} ${item.sign} :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'or' && item.sign === undefined) {
                    query.orWhere(`${item.name} = :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'IN' && item.sign === undefined) {
                    query.andWhere(`${item.name} IN (:...filterValues_${index})`, { [`filterValues_${index}`]: Array.isArray(item.value) ? item.value : [item.value] });
                } else if (item.op === 'like' && item.sign === undefined) {
                    query.andWhere(`${item.name} LIKE :filterValue_${index}`, { [`filterValue_${index}`]: item.value });
                } else if (item.op === 'IS NULL' && item.sign === undefined) {
                    query.andWhere(`${item.name} IS NULL`);
                }
            });
        }
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                if ((table.op === undefined && table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                    const namesArray = table.name;
                    namesArray.forEach((name: string, index: number) => {
                        query.andWhere(new Brackets(qb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value: string | number, subIndex: number) => {
                                if (subIndex === 0) {
                                    qb.andWhere(`LOWER(${name}) LIKE :likeSearch_${subIndex}`, { [`likeSearch_${subIndex}`]: `%${value}%` });
                                    return;
                                }
                                qb.orWhere(`LOWER(${name}) LIKE :likeSearch_${subIndex}`, { [`likeSearch_${subIndex}`]: `%${value}%` });
                            });
                        }));
                    });
                } else if (table.op === undefined && table.name && table.name instanceof Array && table.name.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const namesArray = table.name;
                        namesArray.forEach((name: string, index: number) => {
                            if (index === 0) {
                                qb.andWhere(`LOWER(${name}) LIKE :tableSearch`, { tableSearch: `%${table.value}%` });
                                return;
                            }
                            qb.orWhere(`LOWER(${name}) LIKE :tableSearch`, { tableSearch: `%${table.value}%` });
                        });
                    }));
                } else if (table.op === undefined && table.value && table.value instanceof Array && table.value.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const valuesArray = table.value;
                        valuesArray.forEach((value: string | number, index: number) => {
                            if (index === 0) {
                                qb.andWhere(`LOWER(${table.name}) LIKE :valSearch_${index}`, { [`valSearch_${index}`]: `%${value}%` });
                                return;
                            }
                            qb.orWhere(`LOWER(${table.name}) LIKE :valSearch_${index}`, { [`valSearch_${index}`]: `%${value}%` });
                        });
                    }));
                } else if ((table.op === 'attribute' && table.op !== undefined && table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0) && pluginModule.includes('ProductAttribute')) {
                    const namesArray = table.name;
                    namesArray.forEach((name: string, index: number) => {
                        query.andWhere(new Brackets(qb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value: any, subIndex: number) => {
                                const attrVal = this.addSlashes(value.name.toLowerCase().trim() + '-' + value.value.toLowerCase().trim());
                                if (subIndex === 0) {
                                    qb.andWhere(`LOWER(${name}) LIKE :attrSearch_${subIndex}`, { [`attrSearch_${subIndex}`]: `%${attrVal}%` });
                                    return;
                                }
                                qb.orWhere(`LOWER(${name}) LIKE :attrSearch_${subIndex}`, { [`attrSearch_${subIndex}`]: `%${attrVal}%` });
                            });
                        }));
                    });
                }
            });
        }

        if (groupBy && groupBy.length > 0) {
            let i = 0;
            groupBy.forEach((item: any) => {
                if (i === 0) {
                    query.groupBy(item.name);
                } else {
                    query.addGroupBy(item.name);
                }
                i++;
            });
        }
        if (sort && sort.length > 0) {
            sort.forEach((item: any, index: number) => {
                if (index === 0) {
                    const direction = typeof item.order === 'string' ? item.order.toUpperCase() : '';

                    if (direction === 'ASC' || direction === 'DESC') {

                        query.orderBy(item.name, direction);

                    }
                } else {
                    const direction = typeof item.order === 'string' ? item.order.toUpperCase() : '';

                    if (direction === 'ASC' || direction === 'DESC') {

                        query.addOrderBy(item.name, direction);

                    }
                }
            });
        }
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }
        if (!count) {
            if (rawQuery) {
                return query.getRawMany();
            }
            return query.getMany();
        } else {
            return query.getCount();
        }
    }

    public addSlashes(str: string): string {
        this.log.info('addSlashes method called');
        return (str + '').replace(/'/g, "''");
    }

    public async checkSlug(slug: string, id: number, count: number = 0): Promise<number> {
        this.log.info('checkSlug method called');
        if (count > 0) {
            slug = slug + count;
        }
        return await this.productRepository.checkSlugData(slug, id);
    }

    public async escapeChar(data: string): Promise<any> {
        this.log.info('escapeChar method called');
        const val = data
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/,/g, '&sbquo;')
            .replace(/=/g, '&#61;')
            .replace(/-/g, '&#45;')
            .replace(/…/g, '&hellip;')
            .replace(/@/g, '&commat;')
            .replace(/©/g, '&copy;')
            .replace(/#/g, '&#35;')
            .replace(/“/g, '&ldquo;')
            .replace(/’/g, '&rsquo;')
            .replace(/‘/g, '&lsquo;')
            .replace(/™/g, '&trade;')
            .replace(/®/g, '&reg;')
            .replace(/–/g, '&ndash;')
            .replace(/é/g, '&eacute;')
            .replace(/€/g, '&euro;')
            .replace(/£/g, '&pound;');
        return val;
    }

    public async checkSlugData(slug: string, id: number, count: number): Promise<any> {
        this.log.info(`checkSlugData method called of slug=${slug} and id=${id}`);
        if (count > 0) {
            slug = slug + count;
        }
        const query: any = await getDataSource().getRepository(Product).createQueryBuilder('product');
        query.where('product.product_slug = :slug', { slug });
        if (id > 0) {
            query.andWhere('product.productId != :id', { id });
        }
        return query.getCount();
    }
}
