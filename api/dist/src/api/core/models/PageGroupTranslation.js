"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageGroupTranslation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const PageGroup_1 = require("./PageGroup");
const moment_1 = tslib_1.__importDefault(require("moment"));
const class_validator_1 = require("class-validator");
let PageGroupTranslation = class PageGroupTranslation extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], PageGroupTranslation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'group_name' }),
    tslib_1.__metadata("design:type", String)
], PageGroupTranslation.prototype, "groupName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'page_group_id' }),
    tslib_1.__metadata("design:type", Number)
], PageGroupTranslation.prototype, "pageGroupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'language_id' }),
    tslib_1.__metadata("design:type", Number)
], PageGroupTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => PageGroup_1.PageGroup, pageGroup => pageGroup.pageGroupTranslation),
    (0, typeorm_1.JoinColumn)({ name: 'page_group_id' }),
    tslib_1.__metadata("design:type", Array)
], PageGroupTranslation.prototype, "pageGroup", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PageGroupTranslation.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PageGroupTranslation.prototype, "updateDetails", null);
PageGroupTranslation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('page_group_translation')
], PageGroupTranslation);
exports.PageGroupTranslation = PageGroupTranslation;
//# sourceMappingURL=PageGroupTranslation.js.map