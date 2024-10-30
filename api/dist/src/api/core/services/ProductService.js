"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const ProductModel_1 = require("../models/ProductModel");
const ProductRepository_1 = require("../repositories/ProductRepository");
const typeorm_1 = require("typeorm");
const pluginLoader_1 = require("../../../../src/loaders/pluginLoader");
const uncino_1 = tslib_1.__importDefault(require("uncino"));
const hooks = (0, uncino_1.default)();
let ProductService = class ProductService {
    constructor(productRepository, log) {
        this.productRepository = productRepository;
        this.log = log;
    }
    // find product
    find(product) {
        return this.productRepository.find(product);
    }
    // find product
    findAll() {
        return this.productRepository.find();
    }
    // find one product
    findOne(findCondition) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.findOne(findCondition);
        });
    }
    // product list
    list(limit, offset, select = [], relation = [], whereConditions = [], search = [], price, count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                const operator = item.op;
                if (operator === 'where' && item.value !== '') {
                    condition.where[item.name] = item.value;
                }
                else if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = (0, typeorm_1.Like)('%' + item.value + '%');
                }
            });
        }
        if (search && search.length > 0) {
            search.forEach((item) => {
                const operator = item.op;
                if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = (0, typeorm_1.Like)('%' + item.value + '%');
                }
            });
        }
        if (price && price === 1) {
            condition.order = {
                price: 'ASC',
                createdDate: 'DESC',
            };
        }
        else if (price && price === 2) {
            condition.order = {
                price: 'DESC',
                createdDate: 'DESC',
            };
        }
        else {
            condition.order = {
                createdDate: 'DESC',
            };
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.productRepository.count(condition);
        }
        return this.productRepository.find(condition);
    }
    // create product
    create(product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productRepository.save(product);
            return newProduct;
        });
    }
    // Bulk Create
    bulkCreate(productData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newProducts = yield this.productRepository.save(productData);
            return newProducts;
        });
    }
    // update product
    update(id, product) {
        this.log.info('Update a product');
        product.productId = id;
        return this.productRepository.save(product);
    }
    // delete product
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a product');
            const newProduct = yield this.productRepository.delete(id);
            return newProduct;
        });
    }
    // query builder product list
    productList(limit, offset, select = [], searchConditions = [], whereConditions = [], categoryId = [], priceFrom, priceTo, price, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.productList(limit, offset, select, searchConditions, whereConditions, categoryId, priceFrom, priceTo, price, count);
        });
    }
    // Recent selling product
    recentProductSelling(limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.recentProductSelling(limit);
        });
    }
    // Maximum Product price
    productMaxPrice(maximum) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.productMaxPrice(maximum);
        });
    }
    slugData(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.productSlug(data);
        });
    }
    slug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.productSlugData(data);
        });
    }
    findSkuName(productId, skuName, flag) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.findSkuName(productId, skuName, flag);
        });
    }
    validateSkuNameForVendor(productId, vendorId, skuName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.validateSkuNameForVendor(productId, vendorId, skuName);
        });
    }
    findProducts(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.findProducts(productId);
        });
    }
    listByQueryBuilder(limit, offset, select = [], whereConditions = [], searchConditions = [], relations = [], groupBy = [], sort = [], count = false, rawQuery = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            hooks.removeHook('variant-filter', 'variantFilter-namespace');
            const query = yield (0, typeorm_1.getConnection)().getRepository(ProductModel_1.Product).createQueryBuilder();
            // Select
            if (select && select.length > 0) {
                query.select(select);
            }
            // Join
            if (relations && relations.length > 0) {
                relations.forEach((joinTb) => {
                    if (joinTb.op === 'left') {
                        query.leftJoin(joinTb.tableName, joinTb.aliasName);
                    }
                    else if (joinTb.op === 'leftCond') {
                        query.leftJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                    }
                    else if (joinTb.op === 'inner-select') {
                        query.innerJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                    }
                    else if (joinTb.op === 'left-select') {
                        query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                    }
                    else if (joinTb.op === 'left-select-cond') {
                        query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName, joinTb.cond);
                    }
                    else {
                        query.innerJoin(joinTb.tableName, joinTb.aliasName);
                    }
                });
            }
            // Where
            if (whereConditions && whereConditions.length > 0) {
                const variant = whereConditions.find((condition) => condition.sign === 'variant' && pluginLoader_1.pluginModule.includes('ProductVariants'));
                let variantSql;
                if (variant) {
                    yield hooks.addHook('variant-filter', 'variantFilter-namespace', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const VariantFilter = yield require('../../../../add-ons/ProductVariants/VariantFilterProcess');
                        return yield VariantFilter.variantProcess(variant.value);
                    }));
                    variantSql = yield hooks.runHook('variant-filter');
                }
                whereConditions.forEach((item) => {
                    if (item.op === 'where' && item.sign === undefined) {
                        query.where(item.name + ' = ' + item.value);
                    }
                    else if (item.op === 'and' && item.sign === undefined) {
                        query.andWhere(item.name + ' = ' + item.value);
                    }
                    else if (item.op === 'and' && item.sign !== undefined) {
                        query.andWhere(' \'' + item.name + '\'' + ' ' + item.sign + ' \'' + item.value + '\'');
                    }
                    else if (item.op === 'raw' && item.sign !== undefined) {
                        query.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                    }
                    else if (item.op === 'rawnumber' && item.sign !== undefined) {
                        query.andWhere(item.name + ' ' + item.sign + ' ' + item.value + '');
                    }
                    else if (item.op === 'rawnumberor' && item.sign !== undefined) {
                        query.orWhere(item.name + ' ' + item.sign + ' ' + item.value + '');
                    }
                    else if (item.op === 'or' && item.sign === undefined) {
                        query.orWhere(item.name + ' = ' + item.value);
                    }
                    else if (item.op === 'IN' && item.sign === undefined) {
                        query.andWhere(item.name + ' IN (' + item.value + ')');
                    }
                    else if (item.op === 'like' && item.sign === undefined) {
                        query.andWhere(item.name + ' like ' + ' \'' + item.value + '\'');
                    }
                    else if (item.op === 'IS NULL' && item.sign === undefined) {
                        query.andWhere(item.name + ' IS NULL ' + item.value);
                    }
                    else if (variant) {
                        query.andWhere(item.name + ' IN (' + variantSql + ') ');
                    }
                });
            }
            // Keyword Search
            if (searchConditions && searchConditions.length > 0) {
                console.log('searchConditions:', searchConditions);
                searchConditions.forEach((table) => {
                    if ((table.op === undefined && table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                        const namesArray = table.name;
                        namesArray.forEach((name, index) => {
                            query.andWhere(new typeorm_1.Brackets(qb => {
                                const valuesArray = table.value;
                                valuesArray.forEach((value, subIndex) => {
                                    if (subIndex === 0) {
                                        qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                        return;
                                    }
                                    qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                });
                            }));
                        });
                    }
                    else if (table.op === undefined && table.name && table.name instanceof Array && table.name.length > 0) {
                        query.andWhere(new typeorm_1.Brackets(qb => {
                            const namesArray = table.name;
                            namesArray.forEach((name, index) => {
                                if (index === 0) {
                                    qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                                    return;
                                }
                                qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + table.value + '%\'');
                            });
                        }));
                    }
                    else if (table.op === undefined && table.value && table.value instanceof Array && table.value.length > 0) {
                        query.andWhere(new typeorm_1.Brackets(qb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value, index) => {
                                if (index === 0) {
                                    qb.andWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                                    return;
                                }
                                qb.orWhere('LOWER(' + table.name + ')' + ' LIKE ' + '\'%' + value + '%\'');
                            });
                        }));
                    }
                    else if ((table.op === 'attribute' && table.op !== undefined && table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0) && pluginLoader_1.pluginModule.includes('ProductAttribute')) {
                        const namesArray = table.name;
                        namesArray.forEach((name, index) => {
                            query.andWhere(new typeorm_1.Brackets(qb => {
                                const valuesArray = table.value;
                                valuesArray.forEach((value, subIndex) => {
                                    if (subIndex === 0) {
                                        qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + this.addSlashes(value.name.toLowerCase().trim() + '-' + value.value.toLowerCase().trim()) + '%\'');
                                        return;
                                    }
                                    qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + '\'%' + this.addSlashes(value.name.toLowerCase().trim() + '-' + value.value.toLowerCase().trim()) + '%\'');
                                });
                            }));
                        });
                    }
                });
            }
            // GroupBy
            if (groupBy && groupBy.length > 0) {
                let i = 0;
                groupBy.forEach((item) => {
                    if (i === 0) {
                        query.groupBy(item.name);
                    }
                    else {
                        query.addGroupBy(item.name);
                    }
                    i++;
                });
            }
            // orderBy
            if (sort && sort.length > 0) {
                sort.forEach((item) => {
                    query.orderBy('' + item.name + '', '' + item.order + '');
                });
            }
            // Limit & Offset
            if (limit && limit > 0) {
                query.limit(limit);
                query.offset(offset);
            }
            if (!count) {
                if (rawQuery) {
                    return query.getRawMany();
                }
                return query.getMany();
            }
            else {
                return query.getCount();
            }
        });
    }
    addSlashes(str) {
        return (str + '').replace(/'/g, "''");
    }
    checkSlug(slug, id, count = 0) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (count > 0) {
                slug = slug + count;
            }
            return yield this.productRepository.checkSlugData(slug, id);
        });
    }
};
ProductService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ProductRepository_1.ProductRepository, Object])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map