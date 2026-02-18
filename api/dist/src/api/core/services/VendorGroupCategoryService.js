"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorGroupCategoryService = void 0;
const tslib_1 = require("tslib");
const Logger_1 = require("../../../decorators/Logger");
const typedi_1 = require("typedi");
const VendorGroupCategoryRepository_1 = require("../repositories/VendorGroupCategoryRepository");
const typeorm_1 = require("typeorm");
let VendorGroupCategoryService = class VendorGroupCategoryService {
    constructor(log, vendorGrpCategoryRepository) {
        this.log = log;
        this.vendorGrpCategoryRepository = vendorGrpCategoryRepository;
    }
    // create
    create(vendorGroupCategory) {
        this.log.info('create new vendor group category');
        return this.vendorGrpCategoryRepository.repository.save(vendorGroupCategory);
    }
    // find
    findOne(findCondition) {
        this.log.info('Find group');
        return this.vendorGrpCategoryRepository.repository.findOne(findCondition);
    }
    // find All
    findAll(findCondition) {
        return this.vendorGrpCategoryRepository.repository.find(findCondition);
    }
    // Group list
    list(limit, offset, select = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = (0, typeorm_1.Like)('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorGrpCategoryRepository.repository.count(condition);
        }
        return this.vendorGrpCategoryRepository.repository.find(condition);
    }
    // update
    update(id, vendorGroupCategory) {
        this.log.info('Update a group category');
        vendorGroupCategory.id = id;
        return this.vendorGrpCategoryRepository.repository.save(vendorGroupCategory);
    }
    // delete
    delete(vendorGroupCategory) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a group category');
            const deleteVendor = yield this.vendorGrpCategoryRepository.repository.delete(vendorGroupCategory);
            return deleteVendor;
        });
    }
    groupCategoryCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorGrpCategoryRepository.groupCategoryCount(id);
        });
    }
};
exports.VendorGroupCategoryService = VendorGroupCategoryService;
exports.VendorGroupCategoryService = VendorGroupCategoryService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [Object, VendorGroupCategoryRepository_1.VendorGroupCategoryRepository])
], VendorGroupCategoryService);
//# sourceMappingURL=VendorGroupCategoryService.js.map