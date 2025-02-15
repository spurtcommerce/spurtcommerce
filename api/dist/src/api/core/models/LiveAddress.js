"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveAddress = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
let LiveAddress = class LiveAddress extends BaseModel_1.BaseModel {
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
], LiveAddress.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], LiveAddress.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'country_id' }),
    tslib_1.__metadata("design:type", Number)
], LiveAddress.prototype, "countryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'zone_id' }),
    tslib_1.__metadata("design:type", Number)
], LiveAddress.prototype, "zoneId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'first_name' }),
    tslib_1.__metadata("design:type", String)
], LiveAddress.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'last_name' }),
    tslib_1.__metadata("design:type", String)
], LiveAddress.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'company' }),
    tslib_1.__metadata("design:type", String)
], LiveAddress.prototype, "company", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'address_1' }),
    tslib_1.__metadata("design:type", String)
], LiveAddress.prototype, "address1", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'address_2' }),
    tslib_1.__metadata("design:type", String)
], LiveAddress.prototype, "address2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'postcode' }),
    tslib_1.__metadata("design:type", Number)
], LiveAddress.prototype, "postcode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'city' }),
    tslib_1.__metadata("design:type", String)
], LiveAddress.prototype, "city", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'state' }),
    tslib_1.__metadata("design:type", String)
], LiveAddress.prototype, "state", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'ip' }),
    tslib_1.__metadata("design:type", String)
], LiveAddress.prototype, "ip", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], LiveAddress.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], LiveAddress.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], LiveAddress.prototype, "updateDetails", null);
LiveAddress = tslib_1.__decorate([
    (0, typeorm_1.Entity)('live_address')
], LiveAddress);
exports.LiveAddress = LiveAddress;
//# sourceMappingURL=LiveAddress.js.map