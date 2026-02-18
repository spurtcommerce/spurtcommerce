"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceUpdateFileLogRepository = void 0;
const tslib_1 = require("tslib");
const PriceUpdateFileLog_1 = require("../models/PriceUpdateFileLog");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let PriceUpdateFileLogRepository = class PriceUpdateFileLogRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(PriceUpdateFileLog_1.PriceUpdateFileLog);
    }
};
exports.PriceUpdateFileLogRepository = PriceUpdateFileLogRepository;
exports.PriceUpdateFileLogRepository = PriceUpdateFileLogRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PriceUpdateFileLogRepository);
//# sourceMappingURL=PriceUpdateFileLogRepository.js.map