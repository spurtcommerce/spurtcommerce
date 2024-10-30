"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroup = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const User_1 = require("./User");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment");
let UserGroup = class UserGroup extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'group_id' }),
    tslib_1.__metadata("design:type", Number)
], UserGroup.prototype, "groupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], UserGroup.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'slug' }),
    tslib_1.__metadata("design:type", String)
], UserGroup.prototype, "slug", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'permission' }),
    tslib_1.__metadata("design:type", String)
], UserGroup.prototype, "permission", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], UserGroup.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => User_1.User, user => user.usergroup),
    tslib_1.__metadata("design:type", Array)
], UserGroup.prototype, "users", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserGroup.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserGroup.prototype, "updateDetails", null);
UserGroup = tslib_1.__decorate([
    (0, typeorm_1.Entity)('user_group')
], UserGroup);
exports.UserGroup = UserGroup;
//# sourceMappingURL=UserGroup.js.map