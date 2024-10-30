"use strict";
/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationOtpRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const RegistrationOtpModel_1 = require("../models/RegistrationOtpModel");
let RegistrationOtpRepository = class RegistrationOtpRepository extends typeorm_1.Repository {
};
RegistrationOtpRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(RegistrationOtpModel_1.RegistrationOtp)
], RegistrationOtpRepository);
exports.RegistrationOtpRepository = RegistrationOtpRepository;
//# sourceMappingURL=RegistrationUserRepository.js.map