"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const index_1 = require("typeorm/index");
const EmailTemplateRepository_1 = require("../repositories/EmailTemplateRepository");
let EmailTemplateService = class EmailTemplateService {
    constructor(emailTemplateRepository, log) {
        this.emailTemplateRepository = emailTemplateRepository;
        this.log = log;
    }
    // Create emailTemplate
    create(emailTemplate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new emailTemplate ');
            return this.emailTemplateRepository.save(emailTemplate);
        });
    }
    // Find Condition
    findOne(emailTemplate) {
        return this.emailTemplateRepository.findOne(emailTemplate);
    }
    // Update EmailTemplate
    update(id, emailTemplate) {
        emailTemplate.id = id;
        return this.emailTemplateRepository.save(emailTemplate);
    }
    // EmailTemplate List
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
            return this.emailTemplateRepository.count(condition);
        }
        else {
            return this.emailTemplateRepository.find(condition);
        }
    }
    // Delete EmailTemplate
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.emailTemplateRepository.delete(id);
        });
    }
};
EmailTemplateService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [EmailTemplateRepository_1.EmailTemplateRepository, Object])
], EmailTemplateService);
exports.EmailTemplateService = EmailTemplateService;
//# sourceMappingURL=EmailTemplateService.js.map