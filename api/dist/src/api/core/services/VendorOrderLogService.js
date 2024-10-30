"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrderLogService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const VendorOrderLogRepository_1 = require("../repositories/VendorOrderLogRepository");
const typeorm_1 = require("typeorm");
let VendorOrderLogService = class VendorOrderLogService {
    constructor(vendorOrderLogRepository, log) {
        this.vendorOrderLogRepository = vendorOrderLogRepository;
        this.log = log;
    }
    // find one vendorOrderLog
    findOne(findCondition) {
        this.log.info('Find role');
        return this.vendorOrderLogRepository.findOne(findCondition);
    }
    // vendorOrderLog list
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
        condition.order = { createdDate: 'DESC' };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorOrderLogRepository.count(condition);
        }
        return this.vendorOrderLogRepository.find(condition);
    }
    // create vendor order log
    create(vendorOrderLog) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newVendorOrderLog = yield this.vendorOrderLogRepository.save(vendorOrderLog);
            return newVendorOrderLog;
        });
    }
    // update vendor order log
    update(id, vendorOrderLog) {
        this.log.info('Update a vendor order log');
        vendorOrderLog.vendorOrderLogId = id;
        return this.vendorOrderLogRepository.save(vendorOrderLog);
    }
    // delete vendor order log
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a vendor order log');
            const deleteVendorOrderLog = yield this.vendorOrderLogRepository.delete(id);
            return deleteVendorOrderLog;
        });
    }
    find(data) {
        this.log.info('Find all VendorProducts');
        return this.vendorOrderLogRepository.find(data);
    }
};
VendorOrderLogService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorOrderLogRepository_1.VendorOrderLogRepository, Object])
], VendorOrderLogService);
exports.VendorOrderLogService = VendorOrderLogService;
//# sourceMappingURL=VendorOrderLogService.js.map