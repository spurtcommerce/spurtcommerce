"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
class BaseModel {
}
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'created_by' }),
    tslib_1.__metadata("design:type", Number)
], BaseModel.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'created_date' }),
    tslib_1.__metadata("design:type", String)
], BaseModel.prototype, "createdDate", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'modified_by' }),
    tslib_1.__metadata("design:type", Number)
], BaseModel.prototype, "modifiedBy", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ name: 'modified_date' }),
    tslib_1.__metadata("design:type", String)
], BaseModel.prototype, "modifiedDate", void 0);
exports.BaseModel = BaseModel;
//# sourceMappingURL=BaseModel.js.map