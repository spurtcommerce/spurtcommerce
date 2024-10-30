"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Zone_1 = require("./Zone");
const Customer_1 = require("./Customer");
const class_validator_1 = require("class-validator");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
let Country = class Country extends BaseModel_1.BaseModel {
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
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'country_id' }),
    tslib_1.__metadata("design:type", Number)
], Country.prototype, "countryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'iso_code_2' }),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "isoCode2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'iso_code_3' }),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "isoCode3", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'address_format' }),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "addressFormat", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'postcode_required' }),
    tslib_1.__metadata("design:type", Number)
], Country.prototype, "postcodeRequired", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Country.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => Zone_1.Zone, zone => zone.country),
    tslib_1.__metadata("design:type", Array)
], Country.prototype, "zone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => Customer_1.Customer, customer => customer.country),
    tslib_1.__metadata("design:type", Array)
], Country.prototype, "customer", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Country.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Country.prototype, "updateDetails", null);
Country = tslib_1.__decorate([
    (0, typeorm_1.Entity)('country')
], Country);
exports.Country = Country;
//# sourceMappingURL=Country.js.map