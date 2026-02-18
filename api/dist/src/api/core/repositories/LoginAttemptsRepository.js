"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAttemptsRepository = void 0;
const tslib_1 = require("tslib");
const LoginAttemptsModel_1 = require("../models/LoginAttemptsModel");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let LoginAttemptsRepository = class LoginAttemptsRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(LoginAttemptsModel_1.LoginAttemptsModel);
    }
};
exports.LoginAttemptsRepository = LoginAttemptsRepository;
exports.LoginAttemptsRepository = LoginAttemptsRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], LoginAttemptsRepository);
//# sourceMappingURL=LoginAttemptsRepository.js.map