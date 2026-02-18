"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyType = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
let CompanyType = class CompanyType extends BaseModel_1.BaseModel {
};
exports.CompanyType = CompanyType;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], CompanyType.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], CompanyType.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'slug', unique: true }),
    tslib_1.__metadata("design:type", String)
], CompanyType.prototype, "slug", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: 1 }),
    tslib_1.__metadata("design:type", Number)
], CompanyType.prototype, "isActive", void 0);
exports.CompanyType = CompanyType = tslib_1.__decorate([
    (0, typeorm_1.Entity)('company_type')
], CompanyType);
//# sourceMappingURL=CompanyType.js.map