"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementItemRepository = void 0;
const tslib_1 = require("tslib");
const SettlementItem_1 = require("../models/SettlementItem");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let SettlementItemRepository = class SettlementItemRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(SettlementItem_1.SettlementItem);
    }
};
exports.SettlementItemRepository = SettlementItemRepository;
exports.SettlementItemRepository = SettlementItemRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SettlementItemRepository);
//# sourceMappingURL=SettlementItemRepository.js.map