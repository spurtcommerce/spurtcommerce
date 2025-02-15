"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckDisplayNameRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CheckDisplayNameRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CheckDisplayNameRequest.prototype, "displayNameURL", void 0);
exports.CheckDisplayNameRequest = CheckDisplayNameRequest;
//# sourceMappingURL=CheckDisplayNameRequest.js.map