"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoryTranslation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
const BlogCategory_1 = require("./BlogCategory");
let BlogCategoryTranslation = class BlogCategoryTranslation extends BaseModel_1.BaseModel {
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
exports.BlogCategoryTranslation = BlogCategoryTranslation;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], BlogCategoryTranslation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], BlogCategoryTranslation.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], BlogCategoryTranslation.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'language_id' }),
    tslib_1.__metadata("design:type", Number)
], BlogCategoryTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'blog_category_id' }),
    tslib_1.__metadata("design:type", Number)
], BlogCategoryTranslation.prototype, "blogCategoryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'blog_category_id' }),
    (0, typeorm_1.ManyToOne)(type => BlogCategory_1.BlogCategory, blogcategory => blogcategory.blogCategoryTranslation),
    tslib_1.__metadata("design:type", Array)
], BlogCategoryTranslation.prototype, "blogcategory", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BlogCategoryTranslation.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BlogCategoryTranslation.prototype, "updateDetails", null);
exports.BlogCategoryTranslation = BlogCategoryTranslation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('blog_category_translation')
], BlogCategoryTranslation);
//# sourceMappingURL=BlogCategoryTranslation.js.map