"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportLogRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ExportLog_1 = require("../models/ExportLog");
let ExportLogRepository = class ExportLogRepository extends typeorm_1.Repository {
};
ExportLogRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ExportLog_1.ExportLog)
], ExportLogRepository);
exports.ExportLogRepository = ExportLogRepository;
//# sourceMappingURL=ExportLogRepository.js.map