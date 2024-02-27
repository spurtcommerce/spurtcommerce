"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteMap = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
let SiteMap = class SiteMap extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], SiteMap.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", Number)
], SiteMap.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'user_name' }),
    tslib_1.__metadata("design:type", String)
], SiteMap.prototype, "userName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'path_name' }),
    tslib_1.__metadata("design:type", String)
], SiteMap.prototype, "pathName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'file_name' }),
    tslib_1.__metadata("design:type", String)
], SiteMap.prototype, "fileName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SiteMap.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SiteMap.prototype, "updateDetails", null);
SiteMap = tslib_1.__decorate([
    (0, typeorm_1.Entity)('site_map')
], SiteMap);
exports.SiteMap = SiteMap;
//# sourceMappingURL=SiteMapModel.js.map