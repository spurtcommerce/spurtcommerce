"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRelated = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
const Blog_1 = require("./Blog");
const class_validator_1 = require("class-validator");
let BlogRelated = class BlogRelated extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'related_id' }),
    tslib_1.__metadata("design:type", Number)
], BlogRelated.prototype, "relatedId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'blog_id' }),
    tslib_1.__metadata("design:type", Number)
], BlogRelated.prototype, "blogId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'related_blog_id' }),
    tslib_1.__metadata("design:type", Number)
], BlogRelated.prototype, "relatedBlogId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], BlogRelated.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Blog_1.Blog, blog => blog.blogRelated),
    (0, typeorm_1.JoinColumn)({ name: 'blog_id' }),
    tslib_1.__metadata("design:type", Blog_1.Blog)
], BlogRelated.prototype, "blog", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BlogRelated.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BlogRelated.prototype, "updateDetails", null);
BlogRelated = tslib_1.__decorate([
    (0, typeorm_1.Entity)('blog_related')
], BlogRelated);
exports.BlogRelated = BlogRelated;
//# sourceMappingURL=BlogRelated.js.map