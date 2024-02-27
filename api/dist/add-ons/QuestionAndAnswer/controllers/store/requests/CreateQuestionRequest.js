"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuestion = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateQuestion {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'question is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateQuestion.prototype, "question", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'ProductId is required',
    }),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], CreateQuestion.prototype, "productId", void 0);
exports.CreateQuestion = CreateQuestion;
//# sourceMappingURL=CreateQuestionRequest.js.map