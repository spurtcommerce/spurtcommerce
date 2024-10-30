"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockLogRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const StockLog_1 = require("../models/StockLog");
let StockLogRepository = class StockLogRepository extends typeorm_1.Repository {
};
StockLogRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(StockLog_1.StockLog)
], StockLogRepository);
exports.StockLogRepository = StockLogRepository;
//# sourceMappingURL=StockLogRepository.js.map