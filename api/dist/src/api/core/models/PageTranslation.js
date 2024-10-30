"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageTranslation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const Page_1 = require("./Page");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
let PageTranslation = class PageTranslation extends BaseModel_1.BaseModel {
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
], PageTranslation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'page_id' }),
    tslib_1.__metadata("design:type", Number)
], PageTranslation.prototype, "pageId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'language_id' }),
    tslib_1.__metadata("design:type", Number)
], PageTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'title' }),
    tslib_1.__metadata("design:type", String)
], PageTranslation.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'content' }),
    tslib_1.__metadata("design:type", String)
], PageTranslation.prototype, "content", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Page_1.Page, page => page.pageTranslation),
    (0, typeorm_1.JoinColumn)({ name: 'page_id' }),
    tslib_1.__metadata("design:type", Page_1.Page)
], PageTranslation.prototype, "page", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PageTranslation.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PageTranslation.prototype, "updateDetails", null);
PageTranslation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('page_translation')
], PageTranslation);
exports.PageTranslation = PageTranslation;
//# sourceMappingURL=PageTranslation.js.map