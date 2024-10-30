"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let Activity = class Activity {
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'customer_activity_id' }),
    tslib_1.__metadata("design:type", Number)
], Activity.prototype, "customerActivityId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'activity_name' }),
    tslib_1.__metadata("design:type", String)
], Activity.prototype, "activityName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Activity.prototype, "isActive", void 0);
Activity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('activity')
], Activity);
exports.Activity = Activity;
//# sourceMappingURL=Activity.js.map