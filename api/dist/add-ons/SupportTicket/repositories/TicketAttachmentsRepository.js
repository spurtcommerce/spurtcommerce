"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketAttachmentsRepository = void 0;
const tslib_1 = require("tslib");
const TicketAttachments_1 = require("../models/TicketAttachments");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let TicketAttachmentsRepository = class TicketAttachmentsRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(TicketAttachments_1.TicketAttachments);
    }
};
exports.TicketAttachmentsRepository = TicketAttachmentsRepository;
exports.TicketAttachmentsRepository = TicketAttachmentsRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], TicketAttachmentsRepository);
//# sourceMappingURL=TicketAttachmentsRepository.js.map