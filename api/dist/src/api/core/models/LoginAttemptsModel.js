"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAttemptsModel = void 0;
const tslib_1 = require("tslib");
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let LoginAttemptsModel = class LoginAttemptsModel extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], LoginAttemptsModel.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], LoginAttemptsModel.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'ip_address' }),
    tslib_1.__metadata("design:type", String)
], LoginAttemptsModel.prototype, "ipAddress", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], LoginAttemptsModel.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], LoginAttemptsModel.prototype, "updateDetails", null);
LoginAttemptsModel = tslib_1.__decorate([
    (0, typeorm_1.Entity)('login_attempts')
], LoginAttemptsModel);
exports.LoginAttemptsModel = LoginAttemptsModel;
//# sourceMappingURL=LoginAttemptsModel.js.map