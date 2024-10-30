"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Country_1 = require("../models/Country");
let CountryRepository = class CountryRepository extends typeorm_1.Repository {
};
CountryRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Country_1.Country)
], CountryRepository);
exports.CountryRepository = CountryRepository;
//# sourceMappingURL=CountryRepository.js.map