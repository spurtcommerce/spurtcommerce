"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Industry_1 = require("../models/Industry");
let IndustryRepository = class IndustryRepository extends typeorm_1.Repository {
};
IndustryRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Industry_1.Industry)
], IndustryRepository);
exports.IndustryRepository = IndustryRepository;
//# sourceMappingURL=IndustryRepository.js.map