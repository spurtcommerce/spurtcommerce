"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Tax_1 = require("../models/Tax");
let TaxRepository = class TaxRepository extends typeorm_1.Repository {
};
TaxRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Tax_1.Tax)
], TaxRepository);
exports.TaxRepository = TaxRepository;
//# sourceMappingURL=TaxRepository.js.map