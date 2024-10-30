"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceUpdateFileLogRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const PriceUpdateFileLog_1 = require("../models/PriceUpdateFileLog");
let PriceUpdateFileLogRepository = class PriceUpdateFileLogRepository extends typeorm_1.Repository {
};
PriceUpdateFileLogRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(PriceUpdateFileLog_1.PriceUpdateFileLog)
], PriceUpdateFileLogRepository);
exports.PriceUpdateFileLogRepository = PriceUpdateFileLogRepository;
//# sourceMappingURL=PriceUpdateFileLogRepository.js.map