"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAttemptsRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const LoginAttemptsModel_1 = require("../models/LoginAttemptsModel");
let LoginAttemptsRepository = class LoginAttemptsRepository extends typeorm_1.Repository {
};
LoginAttemptsRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(LoginAttemptsModel_1.LoginAttemptsModel)
], LoginAttemptsRepository);
exports.LoginAttemptsRepository = LoginAttemptsRepository;
//# sourceMappingURL=LoginAttemptsRepository.js.map