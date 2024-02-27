"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteFilter = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../../../../src/api/core/models/BaseModel");
const moment = require("moment/moment");
const SiteFilterCategory_1 = require("./SiteFilterCategory");
const SiteFilterSection_1 = require("./SiteFilterSection");
const class_validator_1 = require("class-validator");
let SiteFilter = class SiteFilter extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], SiteFilter.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'filter_name' }),
    tslib_1.__metadata("design:type", String)
], SiteFilter.prototype, "filterName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], SiteFilter.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => SiteFilterCategory_1.SiteFilterCategory, filterCategory => filterCategory.filterDetail),
    tslib_1.__metadata("design:type", Array)
], SiteFilter.prototype, "filterCategory", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => SiteFilterSection_1.SiteFilterSection, filterSection => filterSection.filterDetail),
    tslib_1.__metadata("design:type", Array)
], SiteFilter.prototype, "filterSection", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SiteFilter.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SiteFilter.prototype, "updateDetails", null);
SiteFilter = tslib_1.__decorate([
    (0, typeorm_1.Entity)('site_filter')
], SiteFilter);
exports.SiteFilter = SiteFilter;
//# sourceMappingURL=SiteFilter.js.map