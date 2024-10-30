"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrderArchiveLogService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const VendorOrderArchiveLogRepository_1 = require("../repositories/VendorOrderArchiveLogRepository");
const typeorm_1 = require("typeorm");
let VendorOrderArchiveLogService = class VendorOrderArchiveLogService {
    constructor(vendorOrderArchiveLogRepository, log) {
        this.vendorOrderArchiveLogRepository = vendorOrderArchiveLogRepository;
        this.log = log;
    }
    // find one vendorOrderArchiveLog
    findOne(findCondition) {
        this.log.info('Find role');
        return this.vendorOrderArchiveLogRepository.findOne(findCondition);
    }
    // vendorOrderArchiveLog list
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
            return this.vendorOrderArchiveLogRepository.count(condition);
        }
        return this.vendorOrderArchiveLogRepository.find(condition);
    }
    // create vendor order archive log
    create(vendorOrderArchiveLog) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newVendorOrderArchiveLog = yield this.vendorOrderArchiveLogRepository.save(vendorOrderArchiveLog);
            return newVendorOrderArchiveLog;
        });
    }
    // update vendor order archive log
    update(id, vendorOrderArchiveLog) {
        this.log.info('Update a vendor order archive log');
        vendorOrderArchiveLog.vendorOrderArchiveLogId = id;
        return this.vendorOrderArchiveLogRepository.save(vendorOrderArchiveLog);
    }
    // delete vendor order archive log
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a vendor order archive log');
            const deleteVendorOrderArchiveLog = yield this.vendorOrderArchiveLogRepository.delete(id);
            return deleteVendorOrderArchiveLog;
        });
    }
    find(data) {
        this.log.info('Find all VendorProducts');
        return this.vendorOrderArchiveLogRepository.find(data);
    }
};
VendorOrderArchiveLogService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorOrderArchiveLogRepository_1.VendorOrderArchiveLogRepository, Object])
], VendorOrderArchiveLogService);
exports.VendorOrderArchiveLogService = VendorOrderArchiveLogService;
//# sourceMappingURL=VendorOrderArchiveLogService.js.map