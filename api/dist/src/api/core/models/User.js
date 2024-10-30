"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const bcrypt = tslib_1.__importStar(require("bcrypt"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ExportLog_1 = require("./ExportLog");
const typeorm_1 = require("typeorm");
const UserGroup_1 = require("./UserGroup");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const AccessTokenModel_1 = require("./AccessTokenModel");
const AuditLog_1 = require("./AuditLog");
let User = class User extends BaseModel_1.BaseModel {
    static hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }
    static comparePassword(user, password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }
    hashPassword() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'user_id' }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'user_group_id' }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "userGroupId", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'username' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'password' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'first_name' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'last_name' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, class_validator_1.IsEmail)(),
    (0, typeorm_1.Column)({ name: 'email' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'avatar' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "avatar", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'avatar_path' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "avatarPath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'code' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'ip' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "ip", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'phone_number' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'address' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "address", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'delete_flag' }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "deleteFlag", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'forget_password_link_expires' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "linkExpires", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'forget_password_key' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "forgetPasswordKey", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'permission' }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "permission", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => UserGroup_1.UserGroup, usergroup => usergroup.users),
    (0, typeorm_1.JoinColumn)({ name: 'user_group_id' }),
    tslib_1.__metadata("design:type", UserGroup_1.UserGroup)
], User.prototype, "usergroup", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => AccessTokenModel_1.AccessToken, accessToken => accessToken.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "accessToken", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => AuditLog_1.AuditLog, auditLog => auditLog.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "auditLog", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => ExportLog_1.ExportLog, exportLog => exportLog.user),
    tslib_1.__metadata("design:type", ExportLog_1.ExportLog)
], User.prototype, "exportLog", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], User.prototype, "updateDetails", null);
User = tslib_1.__decorate([
    (0, typeorm_1.Entity)('users')
], User);
exports.User = User;
//# sourceMappingURL=User.js.map