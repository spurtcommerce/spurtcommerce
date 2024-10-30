"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
const Zone_1 = require("./Zone");
let Address = class Address extends BaseModel_1.BaseModel {
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
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'address_id' }),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "addressId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'country_id' }),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "countryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'zone_id' }),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "zoneId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'first_name' }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'last_name' }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company' }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "company", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'address_1' }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "address1", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'address_2' }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "address2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'postcode' }),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "postcode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'city' }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "city", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'state' }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "state", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'email_id' }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "emailId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'phone_no' }),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "phoneNo", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'address_type' }),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "addressType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'landmark' }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "landmark", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_default' }),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "isDefault", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => Zone_1.Zone, zone => zone.address),
    (0, typeorm_1.JoinColumn)({ name: 'zone_id' }),
    tslib_1.__metadata("design:type", Array)
], Address.prototype, "zone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Address.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Address.prototype, "updateDetails", null);
Address = tslib_1.__decorate([
    (0, typeorm_1.Entity)('address')
], Address);
exports.Address = Address;
//# sourceMappingURL=Address.js.map