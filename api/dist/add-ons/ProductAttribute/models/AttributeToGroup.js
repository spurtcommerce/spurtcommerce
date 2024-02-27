"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeToGroup = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let AttributeToGroup = class AttributeToGroup {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeToGroup.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeToGroup.prototype, "attributeId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'attribute_group_id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeToGroup.prototype, "attributeGroupId", void 0);
AttributeToGroup = tslib_1.__decorate([
    (0, typeorm_1.Entity)('attribute_to_group')
], AttributeToGroup);
exports.AttributeToGroup = AttributeToGroup;
//# sourceMappingURL=AttributeToGroup.js.map