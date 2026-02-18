"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportLogRepository = void 0;
const tslib_1 = require("tslib");
const ExportLog_1 = require("../models/ExportLog");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let ExportLogRepository = class ExportLogRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ExportLog_1.ExportLog);
    }
};
exports.ExportLogRepository = ExportLogRepository;
exports.ExportLogRepository = ExportLogRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ExportLogRepository);
//# sourceMappingURL=ExportLogRepository.js.map