"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeGroupTranslationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const AttributeGroupTranslationRepository_1 = require("../repositories/AttributeGroupTranslationRepository");
let AttributeGroupTranslationService = class AttributeGroupTranslationService {
    constructor(attributeGroupTranslationRepository) {
        this.attributeGroupTranslationRepository = attributeGroupTranslationRepository;
        // --
    }
    // create
    save(attribute) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.attributeGroupTranslationRepository.repository.save(attribute);
        });
    }
    // create
    bulkSave(attribute) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.attributeGroupTranslationRepository.repository.save(attribute);
        });
    }
    // findOne
    findOne(data) {
        return this.attributeGroupTranslationRepository.repository.findOne(data);
    }
    // update
    update(id, attributeGroupTrans) {
        return this.attributeGroupTranslationRepository.repository.update(id, attributeGroupTrans);
    }
    // address
    list(limit, offset, select = [], search = [], relation = [], whereConditions = [], count) {
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
                condition.where[item.name] = item.value;
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (count) {
            return this.attributeGroupTranslationRepository.repository.count(condition);
        }
        else {
            return this.attributeGroupTranslationRepository.repository.find(condition);
        }
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.attributeGroupTranslationRepository.repository.delete(id);
        });
    }
    // find All
    find(attribute) {
        return this.attributeGroupTranslationRepository.repository.find(attribute);
    }
};
exports.AttributeGroupTranslationService = AttributeGroupTranslationService;
exports.AttributeGroupTranslationService = AttributeGroupTranslationService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [AttributeGroupTranslationRepository_1.AttributeGroupTranslationRepository])
], AttributeGroupTranslationService);
//# sourceMappingURL=AttributeGroupTranslationService.js.map