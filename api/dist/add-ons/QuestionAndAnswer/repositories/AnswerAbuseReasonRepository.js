"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerAbuseReasonRepository = void 0;
const tslib_1 = require("tslib");
const AnswerAbuseReason_1 = require("../models/AnswerAbuseReason");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let AnswerAbuseReasonRepository = class AnswerAbuseReasonRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(AnswerAbuseReason_1.AnswerAbuseReason);
    }
};
exports.AnswerAbuseReasonRepository = AnswerAbuseReasonRepository;
exports.AnswerAbuseReasonRepository = AnswerAbuseReasonRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], AnswerAbuseReasonRepository);
//# sourceMappingURL=AnswerAbuseReasonRepository.js.map