"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorDocumentLogService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const VendorDocumentLogRepository_1 = require("../repositories/VendorDocumentLogRepository");
const typeorm_1 = require("typeorm");
let VendorDocumentLogService = class VendorDocumentLogService {
    constructor(vendorDocumentLogRepository, log) {
        this.vendorDocumentLogRepository = vendorDocumentLogRepository;
        this.log = log;
    }
    // find vendorDocLog
    findOne(findCondition) {
        this.log.info('Find all vendorDocLogs');
        return this.vendorDocumentLogRepository.findOne(findCondition);
    }
    // vendorDocLog list
    list(limit = 0, offset = 0, select = [], relation = [], whereConditions = [], keyword, count) {
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
        if (keyword) {
            condition.where = {
                firstName: (0, typeorm_1.Like)('%' + keyword + '%'),
            };
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorDocumentLogRepository.count(condition);
        }
        else {
            return this.vendorDocumentLogRepository.find(condition);
        }
    }
    // create vendorDocLog
    create(vendorDocLog) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new vendorDocLog => ', vendorDocLog.toString());
            const newVendorDocumentLog = yield this.vendorDocumentLogRepository.save(vendorDocLog);
            return newVendorDocumentLog;
        });
    }
    // update vendorDocLog
    update(id, vendorDocLog) {
        this.log.info('Update a vendorDocLog');
        vendorDocLog.id = id;
        return this.vendorDocumentLogRepository.save(vendorDocLog);
    }
    // delete vendorDocLog
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a vendorDocLog');
            const newVendorDocumentLog = yield this.vendorDocumentLogRepository.delete(id);
            return newVendorDocumentLog;
        });
    }
    // find vendorDocLog
    findAll(findCondition) {
        this.log.info('Find all vendorDocLogs');
        return this.vendorDocumentLogRepository.find(findCondition);
    }
};
VendorDocumentLogService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorDocumentLogRepository_1.VendorDocumentLogRepository, Object])
], VendorDocumentLogService);
exports.VendorDocumentLogService = VendorDocumentLogService;
//# sourceMappingURL=VendorDocumentLogService.js.map