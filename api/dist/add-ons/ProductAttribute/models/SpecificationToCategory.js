"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationToCategory = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let SpecificationToCategory = class SpecificationToCategory {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], SpecificationToCategory.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'specification_id' }),
    tslib_1.__metadata("design:type", Number)
], SpecificationToCategory.prototype, "specificationId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'category_id' }),
    tslib_1.__metadata("design:type", Number)
], SpecificationToCategory.prototype, "categoryId", void 0);
SpecificationToCategory = tslib_1.__decorate([
    (0, typeorm_1.Entity)('specification_to_category')
], SpecificationToCategory);
exports.SpecificationToCategory = SpecificationToCategory;
//# sourceMappingURL=SpecificationToCategory.js.map