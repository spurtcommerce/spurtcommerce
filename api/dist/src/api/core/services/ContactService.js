"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../../../decorators/Logger");
const ContactRepository_1 = require("../repositories/ContactRepository");
let ContactService = class ContactService {
    constructor(contactRepository, log) {
        this.contactRepository = contactRepository;
        this.log = log;
    }
    // create contact info
    create(customer) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a Contact customer Infomation ');
            return this.contactRepository.repository.save(customer);
        });
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ContactRepository_1.ContactRepository, Object])
], ContactService);
//# sourceMappingURL=ContactService.js.map