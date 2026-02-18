"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryRepository = void 0;
const tslib_1 = require("tslib");
const Country_1 = require("../models/Country");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let CountryRepository = class CountryRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Country_1.Country);
    }
};
exports.CountryRepository = CountryRepository;
exports.CountryRepository = CountryRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], CountryRepository);
//# sourceMappingURL=CountryRepository.js.map