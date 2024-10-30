"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobs = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
let Jobs = class Jobs extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'job_id' }),
    tslib_1.__metadata("design:type", Number)
], Jobs.prototype, "jobId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'job_title' }),
    tslib_1.__metadata("design:type", String)
], Jobs.prototype, "jobTitle", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'job_description' }),
    tslib_1.__metadata("design:type", String)
], Jobs.prototype, "jobDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'salary_type' }),
    tslib_1.__metadata("design:type", String)
], Jobs.prototype, "salaryType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'job_location' }),
    tslib_1.__metadata("design:type", String)
], Jobs.prototype, "jobLocation", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'contact_person_name' }),
    tslib_1.__metadata("design:type", String)
], Jobs.prototype, "contactPersonName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'contact_person_email' }),
    tslib_1.__metadata("design:type", String)
], Jobs.prototype, "contactPersonEmail", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'contact_person_mobile' }),
    tslib_1.__metadata("design:type", Number)
], Jobs.prototype, "contactPersonMobile", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Jobs.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Jobs.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Jobs.prototype, "updateDetails", null);
Jobs = tslib_1.__decorate([
    (0, typeorm_1.Entity)('jobs')
], Jobs);
exports.Jobs = Jobs;
//# sourceMappingURL=Jobs.js.map