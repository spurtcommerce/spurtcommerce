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
exports.ServiceCategoryPath = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const ServiceCategory_1 = require("./ServiceCategory");
let ServiceCategoryPath = class ServiceCategoryPath extends BaseModel_1.BaseModel {
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'service_category_path_id' }),
    tslib_1.__metadata("design:type", Number)
], ServiceCategoryPath.prototype, "categoryPathId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'service_category_id' }),
    tslib_1.__metadata("design:type", Number)
], ServiceCategoryPath.prototype, "serviceCategoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'path_id' }),
    tslib_1.__metadata("design:type", Number)
], ServiceCategoryPath.prototype, "pathId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'level' }),
    tslib_1.__metadata("design:type", Number)
], ServiceCategoryPath.prototype, "level", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => ServiceCategory_1.ServiceCategory, serviceCategory => serviceCategory.category),
    (0, typeorm_1.JoinColumn)({ name: 'service_category_id' }),
    tslib_1.__metadata("design:type", ServiceCategory_1.ServiceCategory)
], ServiceCategoryPath.prototype, "category", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => ServiceCategory_1.ServiceCategory, serviceCategory => serviceCategory.path),
    (0, typeorm_1.JoinColumn)({ name: 'path_id' }),
    tslib_1.__metadata("design:type", ServiceCategory_1.ServiceCategory)
], ServiceCategoryPath.prototype, "path", void 0);
ServiceCategoryPath = tslib_1.__decorate([
    (0, typeorm_1.Entity)('service_category_path')
], ServiceCategoryPath);
exports.ServiceCategoryPath = ServiceCategoryPath;
//# sourceMappingURL=ServiceCategoryPath.js.map