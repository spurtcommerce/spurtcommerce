"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerReportAbuseService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../src/decorators/Logger");
const AnswerReportAbuseRepository_1 = require("../repositories/AnswerReportAbuseRepository");
let AnswerReportAbuseService = class AnswerReportAbuseService {
    constructor(answerReportAbuseRepository, log) {
        this.answerReportAbuseRepository = answerReportAbuseRepository;
        this.log = log;
    }
    // create
    create(answerAbuse) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new address ');
            return this.answerReportAbuseRepository.save(answerAbuse);
        });
    }
    // findOne
    findOne(answerAbuse) {
        return this.answerReportAbuseRepository.findOne(answerAbuse);
    }
    // update
    update(id, answerAbuse) {
        answerAbuse.id = id;
        return this.answerReportAbuseRepository.save(answerAbuse);
    }
    // address
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
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.answerReportAbuseRepository.count(condition);
        }
        else {
            return this.answerReportAbuseRepository.find(condition);
        }
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.answerReportAbuseRepository.delete(id);
        });
    }
    // find All
    find(address) {
        return this.answerReportAbuseRepository.find(address);
    }
};
AnswerReportAbuseService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [AnswerReportAbuseRepository_1.AnswerReportAbuseRepository, Object])
], AnswerReportAbuseService);
exports.AnswerReportAbuseService = AnswerReportAbuseService;
//# sourceMappingURL=AnswerReportAbuseService.js.map