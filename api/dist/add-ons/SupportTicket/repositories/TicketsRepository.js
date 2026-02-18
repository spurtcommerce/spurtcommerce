"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketsRepository = void 0;
const tslib_1 = require("tslib");
const Tickets_1 = require("../models/Tickets");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let TicketsRepository = class TicketsRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Tickets_1.Tickets);
    }
};
exports.TicketsRepository = TicketsRepository;
exports.TicketsRepository = TicketsRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], TicketsRepository);
//# sourceMappingURL=TicketsRepository.js.map