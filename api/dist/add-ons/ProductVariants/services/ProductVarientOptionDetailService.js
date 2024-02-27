"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarientOptionDetailService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../src/decorators/Logger");
const ProductVarientOptionDetailRepository_1 = require("../repositories/ProductVarientOptionDetailRepository");
const typeorm_1 = require("typeorm");
let ProductVarientOptionDetailService = class ProductVarientOptionDetailService {
    constructor(productVarientOptionDetailRepository, log) {
        this.productVarientOptionDetailRepository = productVarientOptionDetailRepository;
        this.log = log;
    }
    // find one condition
    findOne(data) {
        return this.productVarientOptionDetailRepository.findOne(data);
    }
    // find all
    findAll(data) {
        this.log.info('Find all');
        return this.productVarientOptionDetailRepository.find(data);
    }
    // list
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
            return this.productVarientOptionDetailRepository.count(condition);
        }
        else {
            return this.productVarientOptionDetailRepository.find(condition);
        }
    }
    // create
    create(productVarient) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newVarientOptionDetail = yield this.productVarientOptionDetailRepository.save(productVarient);
            return newVarientOptionDetail;
        });
    }
    bulkSave(productVarient) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newVarientOptionDetail = yield this.productVarientOptionDetailRepository.save(productVarient);
            return newVarientOptionDetail;
        });
    }
    // update
    update(id, productVarient) {
        this.log.info('Update a product varient option');
        productVarient.id = id;
        return this.productVarientOptionDetailRepository.save(productVarient);
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a product varient option');
            const newProductVarientOptionDetail = yield this.productVarientOptionDetailRepository.delete(id);
            return newProductVarientOptionDetail;
        });
    }
    bulkDelete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a product varient option');
            const newProductVarientOptionDetail = yield this.productVarientOptionDetailRepository.delete(id);
            return newProductVarientOptionDetail;
        });
    }
};
ProductVarientOptionDetailService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ProductVarientOptionDetailRepository_1.ProductVarientOptionDetailRepository, Object])
], ProductVarientOptionDetailService);
exports.ProductVarientOptionDetailService = ProductVarientOptionDetailService;
//# sourceMappingURL=ProductVarientOptionDetailService.js.map