"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenRepository = void 0;
const tslib_1 = require("tslib");
const AccessTokenModel_1 = require("../models/AccessTokenModel");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let AccessTokenRepository = class AccessTokenRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(AccessTokenModel_1.AccessToken);
    }
};
exports.AccessTokenRepository = AccessTokenRepository;
exports.AccessTokenRepository = AccessTokenRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], AccessTokenRepository);
//# sourceMappingURL=AccessTokenRepository.js.map