"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageGroup = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const Page_1 = require("./Page");
const PageGroupTranslation_1 = require("./PageGroupTranslation");
const class_transformer_1 = require("class-transformer");
const moment_1 = tslib_1.__importDefault(require("moment"));
const class_validator_1 = require("class-validator");
let PageGroup = class PageGroup extends BaseModel_1.BaseModel {
    createDetails() {
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
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'group_id' }),
    tslib_1.__metadata("design:type", Number)
], PageGroup.prototype, "groupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'group_name' }),
    tslib_1.__metadata("design:type", String)
], PageGroup.prototype, "groupName", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], PageGroup.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => Page_1.Page, page => page.pageGroup),
    tslib_1.__metadata("design:type", Array)
], PageGroup.prototype, "page", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => PageGroupTranslation_1.PageGroupTranslation, pageGroupTranslation => pageGroupTranslation.pageGroup),
    tslib_1.__metadata("design:type", Array)
], PageGroup.prototype, "pageGroupTranslation", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PageGroup.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PageGroup.prototype, "updateDetails", null);
PageGroup = tslib_1.__decorate([
    (0, typeorm_1.Entity)('page_group')
], PageGroup);
exports.PageGroup = PageGroup;
//# sourceMappingURL=PageGroup.js.map