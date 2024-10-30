"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPath = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const CategoryModel_1 = require("./CategoryModel");
let CategoryPath = class CategoryPath extends BaseModel_1.BaseModel {
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'category_path_id' }),
    tslib_1.__metadata("design:type", Number)
], CategoryPath.prototype, "categoryPathId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", Number)
], CategoryPath.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'path_id' }),
    tslib_1.__metadata("design:type", Number)
], CategoryPath.prototype, "pathId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'level' }),
    tslib_1.__metadata("design:type", Number)
], CategoryPath.prototype, "level", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => CategoryModel_1.Category, category => category.category),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", CategoryModel_1.Category)
], CategoryPath.prototype, "category", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => CategoryModel_1.Category, category => category.path),
    (0, typeorm_1.JoinColumn)({ name: 'path_id' }),
    tslib_1.__metadata("design:type", CategoryModel_1.Category)
], CategoryPath.prototype, "path", void 0);
CategoryPath = tslib_1.__decorate([
    (0, typeorm_1.Entity)('category_path')
], CategoryPath);
exports.CategoryPath = CategoryPath;
//# sourceMappingURL=CategoryPath.js.map