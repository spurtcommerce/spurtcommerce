"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportLog = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
const Customer_1 = require("./Customer");
let ExportLog = class ExportLog {
    createdDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], ExportLog.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'module' }),
    tslib_1.__metadata("design:type", String)
], ExportLog.prototype, "module", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'record_available' }),
    tslib_1.__metadata("design:type", Number)
], ExportLog.prototype, "recordAvailable", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'created_date' }),
    tslib_1.__metadata("design:type", String)
], ExportLog.prototype, "createdDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    tslib_1.__metadata("design:type", Number)
], ExportLog.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => Customer_1.Customer, user => user.exportLog),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    tslib_1.__metadata("design:type", Customer_1.Customer)
], ExportLog.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ExportLog.prototype, "createdDetails", null);
ExportLog = tslib_1.__decorate([
    (0, typeorm_1.Entity)('export_log')
], ExportLog);
exports.ExportLog = ExportLog;
//# sourceMappingURL=ExportLog.js.map