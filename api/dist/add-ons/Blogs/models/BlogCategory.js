"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategory = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const class_validator_1 = require("class-validator");
const BlogCategoryPath_1 = require("./BlogCategoryPath");
let BlogCategory = class BlogCategory extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'blog_category_id' }),
    tslib_1.__metadata("design:type", Number)
], BlogCategory.prototype, "blogCategoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], BlogCategory.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'image' }),
    tslib_1.__metadata("design:type", String)
], BlogCategory.prototype, "image", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'image_path' }),
    tslib_1.__metadata("design:type", String)
], BlogCategory.prototype, "imagePath", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'parent_int' }),
    tslib_1.__metadata("design:type", Number)
], BlogCategory.prototype, "parentInt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], BlogCategory.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_title' }),
    tslib_1.__metadata("design:type", String)
], BlogCategory.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_description' }),
    tslib_1.__metadata("design:type", String)
], BlogCategory.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_keyword' }),
    tslib_1.__metadata("design:type", String)
], BlogCategory.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'category_slug' }),
    tslib_1.__metadata("design:type", String)
], BlogCategory.prototype, "categorySlug", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], BlogCategory.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'category_description' }),
    tslib_1.__metadata("design:type", String)
], BlogCategory.prototype, "categoryDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => BlogCategoryPath_1.BlogCategoryPath, blogCategoryPath => blogCategoryPath.blogCategory),
    tslib_1.__metadata("design:type", Array)
], BlogCategory.prototype, "blogCategoryPath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => BlogCategoryPath_1.BlogCategoryPath, blogCategoryPath => blogCategoryPath.path),
    tslib_1.__metadata("design:type", Array)
], BlogCategory.prototype, "path", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BlogCategory.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BlogCategory.prototype, "updateDetails", null);
BlogCategory = tslib_1.__decorate([
    (0, typeorm_1.Entity)('blog_category')
], BlogCategory);
exports.BlogCategory = BlogCategory;
//# sourceMappingURL=BlogCategory.js.map