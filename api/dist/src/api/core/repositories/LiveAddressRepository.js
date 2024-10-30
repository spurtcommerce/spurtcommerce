"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveAddressRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const LiveAddress_1 = require("../models/LiveAddress");
let LiveAddressRepository = class LiveAddressRepository extends typeorm_1.Repository {
};
LiveAddressRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(LiveAddress_1.LiveAddress)
], LiveAddressRepository);
exports.LiveAddressRepository = LiveAddressRepository;
//# sourceMappingURL=LiveAddressRepository.js.map