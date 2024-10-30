"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerToGroup = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let CustomerToGroup = class CustomerToGroup {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], CustomerToGroup.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'customer_group_id' }),
    tslib_1.__metadata("design:type", Number)
], CustomerToGroup.prototype, "customerGroupId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], CustomerToGroup.prototype, "customerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], CustomerToGroup.prototype, "isActive", void 0);
CustomerToGroup = tslib_1.__decorate([
    (0, typeorm_1.Entity)('customer_to_group')
], CustomerToGroup);
exports.CustomerToGroup = CustomerToGroup;
//# sourceMappingURL=CustomerToGroup.js.map