"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementRepository = void 0;
const tslib_1 = require("tslib");
const Settlement_1 = require("../models/Settlement");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let SettlementRepository = class SettlementRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Settlement_1.Settlement);
    }
};
exports.SettlementRepository = SettlementRepository;
exports.SettlementRepository = SettlementRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SettlementRepository);
//# sourceMappingURL=SettlementRepository.js.map