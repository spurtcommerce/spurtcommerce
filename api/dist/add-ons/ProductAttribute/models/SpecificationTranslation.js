"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationTranslation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../src/api/core/models/BaseModel");
const Specification_1 = require("./Specification");
const moment_1 = tslib_1.__importDefault(require("moment"));
const class_validator_1 = require("class-validator");
let SpecificationTranslation = class SpecificationTranslation extends BaseModel_1.BaseModel {
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
exports.SpecificationTranslation = SpecificationTranslation;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], SpecificationTranslation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'specification_id' }),
    tslib_1.__metadata("design:type", Number)
], SpecificationTranslation.prototype, "specificationId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'language_id' }),
    tslib_1.__metadata("design:type", Number)
], SpecificationTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], SpecificationTranslation.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Specification_1.Specification, specification => specification.specificationTranslation),
    (0, typeorm_1.JoinColumn)({ name: 'specification_id' }),
    tslib_1.__metadata("design:type", Array)
], SpecificationTranslation.prototype, "specification", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationTranslation.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SpecificationTranslation.prototype, "updateDetails", null);
exports.SpecificationTranslation = SpecificationTranslation = tslib_1.__decorate([
    (0, typeorm_1.Entity)('specification_translation')
], SpecificationTranslation);
//# sourceMappingURL=SpecificationTranslation.js.map