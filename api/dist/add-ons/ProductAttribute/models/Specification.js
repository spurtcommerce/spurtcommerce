"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Specification = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const typeorm_1 = require("typeorm");
const AttributeGroup_1 = require("./AttributeGroup");
let Specification = class Specification extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], Specification.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], Specification.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'slug' }),
    tslib_1.__metadata("design:type", String)
], Specification.prototype, "slug", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Specification.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_delete' }),
    tslib_1.__metadata("design:type", Number)
], Specification.prototype, "isDelete", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => AttributeGroup_1.AttributeGroup, attributeGroup => attributeGroup.specifications),
    (0, typeorm_1.JoinTable)({
        name: 'specification_to_attribute_group',
        joinColumn: { name: 'specification_id' },
        inverseJoinColumn: { name: 'attribute_group_id' },
    }),
    tslib_1.__metadata("design:type", Array)
], Specification.prototype, "attributeGroups", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Specification.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Specification.prototype, "updateDetails", null);
Specification = tslib_1.__decorate([
    (0, typeorm_1.Entity)('specification')
], Specification);
exports.Specification = Specification;
//# sourceMappingURL=Specification.js.map