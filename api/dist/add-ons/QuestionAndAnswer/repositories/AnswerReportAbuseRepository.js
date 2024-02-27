"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerReportAbuseRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const AnswerReportAbuse_1 = require("../models/AnswerReportAbuse");
let AnswerReportAbuseRepository = class AnswerReportAbuseRepository extends typeorm_1.Repository {
};
AnswerReportAbuseRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(AnswerReportAbuse_1.AnswerReportAbuse)
], AnswerReportAbuseRepository);
exports.AnswerReportAbuseRepository = AnswerReportAbuseRepository;
//# sourceMappingURL=AnswerReportAbuseRepository.js.map