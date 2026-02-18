"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveAddressRepository = void 0;
const tslib_1 = require("tslib");
const LiveAddress_1 = require("../models/LiveAddress");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let LiveAddressRepository = class LiveAddressRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(LiveAddress_1.LiveAddress);
    }
};
exports.LiveAddressRepository = LiveAddressRepository;
exports.LiveAddressRepository = LiveAddressRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], LiveAddressRepository);
//# sourceMappingURL=LiveAddressRepository.js.map