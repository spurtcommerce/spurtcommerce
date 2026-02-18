"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockLogRepository = void 0;
const tslib_1 = require("tslib");
const StockLog_1 = require("../models/StockLog");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let StockLogRepository = class StockLogRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(StockLog_1.StockLog);
    }
};
exports.StockLogRepository = StockLogRepository;
exports.StockLogRepository = StockLogRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], StockLogRepository);
//# sourceMappingURL=StockLogRepository.js.map