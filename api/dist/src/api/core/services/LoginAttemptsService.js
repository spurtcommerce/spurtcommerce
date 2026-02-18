"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAttemptsService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const LoginAttemptsRepository_1 = require("../repositories/LoginAttemptsRepository");
let LoginAttemptsService = class LoginAttemptsService {
    constructor(loginAttemptsRepository) {
        this.loginAttemptsRepository = loginAttemptsRepository;
    }
    find(attempts) {
        return this.loginAttemptsRepository.repository.find(attempts);
    }
    findOne(accessToken) {
        return this.loginAttemptsRepository.repository.findOne(accessToken);
    }
    // delete token
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.loginAttemptsRepository.repository.delete(id);
            return;
        });
    }
    // create token
    create(loginAttempts) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.loginAttemptsRepository.repository.save(loginAttempts);
        });
    }
};
exports.LoginAttemptsService = LoginAttemptsService;
exports.LoginAttemptsService = LoginAttemptsService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [LoginAttemptsRepository_1.LoginAttemptsRepository])
], LoginAttemptsService);
//# sourceMappingURL=LoginAttemptsService.js.map