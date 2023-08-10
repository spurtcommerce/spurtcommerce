"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscapeValidation = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
let EscapeValidation = class EscapeValidation {
    validate(text, args) {
        const result = /[*+?^${}()<>''|[\]\\]/g.test(text);
        return result === true ? false : true;
    }
    defaultMessage(args) {
        // here you can provide default error message if validation failed
        return 'Text ($value) is too short or too long!';
    }
};
EscapeValidation = tslib_1.__decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'name', async: false })
], EscapeValidation);
exports.EscapeValidation = EscapeValidation;
//# sourceMappingURL=EscapeValidation.js.map