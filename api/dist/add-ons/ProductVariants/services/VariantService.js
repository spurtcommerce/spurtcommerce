"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const VariantRepository_1 = require("../repositories/VariantRepository");
const typeorm_1 = require("typeorm");
let VariantService = class VariantService {
    constructor(variantRepository) {
        this.variantRepository = variantRepository;
        // --
    }
    // create a data
    create(Data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.variantRepository.repository.save(Data);
        });
    }
    // findone a data
    findOne(id) {
        return this.variantRepository.repository.findOne(id);
    }
    // find condition
    find(option) {
        return this.variantRepository.repository.find(option);
    }
    // Variant List
    list(limit, offset, select = [], relation = [], whereConditions = [], count) {
        const condition = {};
        condition.where = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                const op = item.op;
                if (op === 'like') {
                    condition.where[item.name] = (0, typeorm_1.Like)('%' + item.value + '%');
                }
                else {
                    condition.where[item.name] = item.value;
                }
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
            return this.variantRepository.repository.count(condition);
        }
        else {
            return this.variantRepository.repository.find(condition);
        }
    }
    // delete OptionValue
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.variantRepository.repository.delete(id);
        });
    }
};
exports.VariantService = VariantService;
exports.VariantService = VariantService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [VariantRepository_1.VariantRepository])
], VariantService);
//# sourceMappingURL=VariantService.js.map