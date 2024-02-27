"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAnswer = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateAnswer {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Answer is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAnswer.prototype, "answer", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'QuestionId is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateAnswer.prototype, "questionId", void 0);
exports.CreateAnswer = CreateAnswer;
//# sourceMappingURL=CreateAnswerRequest.js.map