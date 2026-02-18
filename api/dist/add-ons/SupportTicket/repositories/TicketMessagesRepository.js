"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketMessagesRepository = void 0;
const tslib_1 = require("tslib");
const TicketMessages_1 = require("../models/TicketMessages");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let TicketMessagesRepository = class TicketMessagesRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(TicketMessages_1.TicketMessages);
    }
};
exports.TicketMessagesRepository = TicketMessagesRepository;
exports.TicketMessagesRepository = TicketMessagesRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], TicketMessagesRepository);
//# sourceMappingURL=TicketMessagesRepository.js.map