"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryCommission = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
let CategoryCommission = class CategoryCommission {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)({ name: 'category_commission_id' }),
    tslib_1.__metadata("design:type", Number)
], CategoryCommission.prototype, "categoryCommissionId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", Number)
], CategoryCommission.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'category_commission_value' }),
    tslib_1.__metadata("design:type", Number)
], CategoryCommission.prototype, "categoryCommissionValue", void 0);
CategoryCommission = tslib_1.__decorate([
    (0, typeorm_1.Entity)('category_commission')
], CategoryCommission);
exports.CategoryCommission = CategoryCommission;
//# sourceMappingURL=CategoryCommission.js.map