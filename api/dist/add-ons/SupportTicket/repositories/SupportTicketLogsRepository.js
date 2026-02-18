"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportTicketLogsRepository = void 0;
const tslib_1 = require("tslib");
const SupportTicketLogs_1 = require("../models/SupportTicketLogs");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let SupportTicketLogsRepository = class SupportTicketLogsRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(SupportTicketLogs_1.SupportTicketLogs);
    }
};
exports.SupportTicketLogsRepository = SupportTicketLogsRepository;
exports.SupportTicketLogsRepository = SupportTicketLogsRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SupportTicketLogsRepository);
//# sourceMappingURL=SupportTicketLogsRepository.js.map