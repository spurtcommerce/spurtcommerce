"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepository = void 0;
const tslib_1 = require("tslib");
const Contact_1 = require("../models/Contact");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let ContactRepository = class ContactRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Contact_1.Contact);
    }
};
exports.ContactRepository = ContactRepository;
exports.ContactRepository = ContactRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ContactRepository);
//# sourceMappingURL=ContactRepository.js.map