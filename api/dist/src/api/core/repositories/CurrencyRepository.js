"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Currency_1 = require("../models/Currency");
let CurrencyRepository = class CurrencyRepository extends typeorm_1.Repository {
};
CurrencyRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Currency_1.Currency)
], CurrencyRepository);
exports.CurrencyRepository = CurrencyRepository;
//# sourceMappingURL=CurrencyRepository.js.map