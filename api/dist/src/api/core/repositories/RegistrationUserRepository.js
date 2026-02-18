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
const RegistrationOtpModel_1 = require("../models/RegistrationOtpModel");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let RegistrationOtpRepository = class RegistrationOtpRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(RegistrationOtpModel_1.RegistrationOtp);
    }
};
exports.RegistrationOtpRepository = RegistrationOtpRepository;
exports.RegistrationOtpRepository = RegistrationOtpRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], RegistrationOtpRepository);
//# sourceMappingURL=RegistrationUserRepository.js.map