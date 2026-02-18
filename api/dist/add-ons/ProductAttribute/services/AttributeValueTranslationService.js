"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeValueTranslationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const index_1 = require("typeorm/index");
const AttributeValueTranslationRepository_1 = require("../repositories/AttributeValueTranslationRepository");
let AttributeValueTranslationService = class AttributeValueTranslationService {
    constructor(attributeValueTranslationRepository) {
        this.attributeValueTranslationRepository = attributeValueTranslationRepository;
    }
    // create Product Attribute
    create(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.attributeValueTranslationRepository.repository.save(data);
        });
    }
    // create Product Attribute
    save(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.attributeValueTranslationRepository.repository.save(data);
        });
    }
    // findCondition
    findOne(data) {
        return this.attributeValueTranslationRepository.repository.findOne(data);
    }
    // update product attribute
    update(id, attribute) {
        attribute.id = id;
        return this.attributeValueTranslationRepository.repository.save(attribute);
    }
    // update product attribute
    updateAliases(id, attribute) {
        attribute.attributeValueId = id;
        return this.attributeValueTranslationRepository.repository.save(attribute);
    }
    // product attribute List
    list(limit, offset, select = [], search = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
            });
        }
        if (search && search.length > 0) {
            search.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = (0, index_1.Like)('%' + table.value + '%');
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
            return this.attributeValueTranslationRepository.repository.count(condition);
        }
        else {
            return this.attributeValueTranslationRepository.repository.find(condition);
        }
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.attributeValueTranslationRepository.repository.delete(id);
        });
    }
    // find a data
    find(attribute) {
        return this.attributeValueTranslationRepository.repository.find(attribute);
    }
};
exports.AttributeValueTranslationService = AttributeValueTranslationService;
exports.AttributeValueTranslationService = AttributeValueTranslationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [AttributeValueTranslationRepository_1.AttributeValueTranslationRepository])
], AttributeValueTranslationService);
//# sourceMappingURL=AttributeValueTranslationService.js.map