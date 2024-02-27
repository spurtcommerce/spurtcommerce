"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
const BlogRelated_1 = require("./BlogRelated");
const class_validator_1 = require("class-validator");
let Blog = class Blog extends BaseModel_1.BaseModel {
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
], Blog.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'title' }),
    tslib_1.__metadata("design:type", String)
], Blog.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", Number)
], Blog.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], Blog.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'image' }),
    tslib_1.__metadata("design:type", String)
], Blog.prototype, "image", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'image_path' }),
    tslib_1.__metadata("design:type", String)
], Blog.prototype, "imagePath", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Blog.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'blog_slug' }),
    tslib_1.__metadata("design:type", String)
], Blog.prototype, "blogSlug", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => BlogRelated_1.BlogRelated, blogRelated => blogRelated.blog),
    tslib_1.__metadata("design:type", Array)
], Blog.prototype, "blogRelated", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Blog.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Blog.prototype, "updateDetails", null);
Blog = tslib_1.__decorate([
    (0, typeorm_1.Entity)('blog')
], Blog);
exports.Blog = Blog;
//# sourceMappingURL=Blog.js.map