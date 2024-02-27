"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoryPath = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const BlogCategory_1 = require("./BlogCategory");
let BlogCategoryPath = class BlogCategoryPath extends BaseModel_1.BaseModel {
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'blog_category_path_id' }),
    tslib_1.__metadata("design:type", Number)
], BlogCategoryPath.prototype, "blogCategoryPathId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'blog_category_id' }),
    tslib_1.__metadata("design:type", Number)
], BlogCategoryPath.prototype, "blogCategoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'path_id' }),
    tslib_1.__metadata("design:type", Number)
], BlogCategoryPath.prototype, "pathId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'level' }),
    tslib_1.__metadata("design:type", Number)
], BlogCategoryPath.prototype, "level", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => BlogCategory_1.BlogCategory, blogCategory => blogCategory.blogCategoryPath),
    (0, typeorm_1.JoinColumn)({ name: 'blog_category_id' }),
    tslib_1.__metadata("design:type", BlogCategory_1.BlogCategory)
], BlogCategoryPath.prototype, "blogCategory", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => BlogCategory_1.BlogCategory, category => category.path),
    (0, typeorm_1.JoinColumn)({ name: 'path_id' }),
    tslib_1.__metadata("design:type", BlogCategory_1.BlogCategory)
], BlogCategoryPath.prototype, "path", void 0);
BlogCategoryPath = tslib_1.__decorate([
    (0, typeorm_1.Entity)('blog_category_path')
], BlogCategoryPath);
exports.BlogCategoryPath = BlogCategoryPath;
//# sourceMappingURL=BlogCategoryPath.js.map