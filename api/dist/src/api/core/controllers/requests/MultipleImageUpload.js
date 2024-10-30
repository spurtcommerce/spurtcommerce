"use strict";
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleImageUpload = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class MultipleImageUpload {
    constructor() {
        this.image = [];
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Object)
], MultipleImageUpload.prototype, "image", void 0);
exports.MultipleImageUpload = MultipleImageUpload;
//# sourceMappingURL=MultipleImageUpload.js.map