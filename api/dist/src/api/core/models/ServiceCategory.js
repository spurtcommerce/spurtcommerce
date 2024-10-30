"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategory = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const ServiceToCategory_1 = require("./ServiceToCategory");
const ServiceCategoryPath_1 = require("./ServiceCategoryPath");
const class_validator_1 = require("class-validator");
let ServiceCategory = class ServiceCategory extends BaseModel_1.BaseModel {
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
    (0, index_1.PrimaryGeneratedColumn)({ name: 'service_category_id' }),
    tslib_1.__metadata("design:type", Number)
], ServiceCategory.prototype, "serviceCategoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], ServiceCategory.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'image' }),
    tslib_1.__metadata("design:type", String)
], ServiceCategory.prototype, "image", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'image_path' }),
    tslib_1.__metadata("design:type", String)
], ServiceCategory.prototype, "imagePath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'parent_int' }),
    tslib_1.__metadata("design:type", Number)
], ServiceCategory.prototype, "parentInt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], ServiceCategory.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_title' }),
    tslib_1.__metadata("design:type", String)
], ServiceCategory.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_description' }),
    tslib_1.__metadata("design:type", String)
], ServiceCategory.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'meta_tag_keyword' }),
    tslib_1.__metadata("design:type", String)
], ServiceCategory.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], ServiceCategory.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => ServiceToCategory_1.ServiceToCategory, serviceToCategory => serviceToCategory.serviceCategory),
    tslib_1.__metadata("design:type", Array)
], ServiceCategory.prototype, "serviceToCategory", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => ServiceCategoryPath_1.ServiceCategoryPath, serviceCategoryPath => serviceCategoryPath.category),
    tslib_1.__metadata("design:type", Array)
], ServiceCategory.prototype, "category", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => ServiceCategoryPath_1.ServiceCategoryPath, serviceCategoryPath => serviceCategoryPath.path),
    tslib_1.__metadata("design:type", Array)
], ServiceCategory.prototype, "path", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceCategory.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ServiceCategory.prototype, "updateDetails", null);
ServiceCategory = tslib_1.__decorate([
    (0, typeorm_1.Entity)('service_category')
], ServiceCategory);
exports.ServiceCategory = ServiceCategory;
//# sourceMappingURL=ServiceCategory.js.map