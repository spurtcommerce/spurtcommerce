"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Settlement_1 = require("../models/Settlement");
let SettlementRepository = class SettlementRepository extends typeorm_1.Repository {
};
SettlementRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Settlement_1.Settlement)
], SettlementRepository);
exports.SettlementRepository = SettlementRepository;
//# sourceMappingURL=SettlementRepository.js.map