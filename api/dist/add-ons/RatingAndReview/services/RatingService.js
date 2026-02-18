"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRatingService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../src/decorators/Logger");
const ProductRating_1 = require("../models/ProductRating");
const RatingRepository_1 = require("../repositories/RatingRepository");
const typeorm_1 = require("typeorm");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
let ProductRatingService = class ProductRatingService {
    constructor(ratingRepository, log) {
        this.ratingRepository = ratingRepository;
        this.log = log;
    }
    // find one condition
    findOne(rating) {
        return this.ratingRepository.repository.findOne(rating);
    }
    find(rating) {
        return this.ratingRepository.repository.find(rating);
    }
    // find all rating
    findAll(rating) {
        this.log.info('Find all rating');
        return this.ratingRepository.repository.find(rating);
    }
    // rating list
    list(limit, offset, select = [], relation = [], whereConditions = [], count) {
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
                if (operator === 'where' && item.value !== undefined) {
                    condition.where[item.name] = item.value;
                }
                else if (operator === 'like' && item.value !== undefined) {
                    condition.where[item.name] = (0, typeorm_1.Like)('%' + item.value + '%');
                }
            });
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.ratingRepository.repository.count(condition);
        }
        else {
            return this.ratingRepository.repository.find(condition);
        }
    }
    // create rating
    create(productRating) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newRating = yield this.ratingRepository.repository.save(productRating);
            return newRating;
        });
    }
    // update rating
    update(id, productRating) {
        this.log.info('Update a rating');
        productRating.ratingId = id;
        return this.ratingRepository.repository.save(productRating);
    }
    // delete rating
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a rating');
            const newRating = yield this.ratingRepository.repository.delete(id);
            return newRating;
        });
    }
    // getting consolidated rating
    consolidateRating(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.ratingRepository.ratingConsolidate(id);
        });
    }
    // getting consolidated rating
    consolidateRatingForVendor(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.ratingRepository.ratingConsolidateForVendor(id);
        });
    }
    // rating statistics
    ratingStatistics(skuId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.ratingRepository.ratingStatistics(skuId);
        });
    }
    // get rating
    getReviewCount(skuId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.ratingRepository.getReviewCount(skuId);
        });
    }
    // rating review list
    ratingReviewList(limit_1, offset_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (limit, offset, select = [], searchConditions = [], whereConditions = [], count) {
            return yield this.ratingRepository.productRatingList(limit, offset, select, searchConditions, whereConditions, count);
        });
    }
    listByQueryBuilder(limit_1, offset_1) {
        return tslib_1.__awaiter(this, arguments, void 0, function* (limit, offset, select = [], whereConditions = [], searchConditions = [], relations = [], groupBy = [], sort = [], count = false, rawQuery = false) {
            const query = yield (0, typeormLoader_1.getDataSource)().getRepository(ProductRating_1.ProductRating).createQueryBuilder();
            // Select
            if (select && select.length > 0) {
                query.select(select);
            }
            // Join
            if (relations && relations.length > 0) {
                relations.forEach((joinTb) => {
                    if (joinTb.op === 'left') {
                        query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                    }
                    else if (joinTb.op === 'left-join') {
                        query.leftJoin(joinTb.tableName, joinTb.aliasName);
                    }
                    else {
                        query.innerJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                    }
                });
            }
            // Where
            if (whereConditions && whereConditions.length > 0) {
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
                    else if (item.op === 'or' && item.sign === undefined) {
                        query.orWhere(item.name + ' = ' + item.value);
                    }
                    else if (item.op === 'IN' && item.sign === undefined) {
                        query.andWhere(item.name + ' IN (' + item.value + ')');
                    }
                    else if (item.op === 'NOT' && item.sign === undefined) {
                        query.andWhere('NOT (' + 'ISNULL (' + item.name + ')' + ')');
                    }
                });
            }
            // Keyword Search
            if (searchConditions && searchConditions.length > 0) {
                searchConditions.forEach((table) => {
                    if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
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
                    else if (table.name && table.name instanceof Array && table.name.length > 0) {
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
                    else if (table.value && table.value instanceof Array && table.value.length > 0) {
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
};
exports.ProductRatingService = ProductRatingService;
exports.ProductRatingService = ProductRatingService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [RatingRepository_1.RatingRepository, Object])
], ProductRatingService);
//# sourceMappingURL=RatingService.js.map