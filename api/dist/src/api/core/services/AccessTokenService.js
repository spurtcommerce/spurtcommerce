"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const AccessTokenRepository_1 = require("../repositories/AccessTokenRepository");
let AccessTokenService = class AccessTokenService {
    constructor(accessTokenRepository, log) {
        this.accessTokenRepository = accessTokenRepository;
        this.log = log;
    }
    findOne(accessToken) {
        return this.accessTokenRepository.findOne(accessToken);
    }
    // delete token
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a token');
            yield this.accessTokenRepository.delete(id);
            return;
        });
    }
    // create token
    create(accessToken) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.accessTokenRepository.save(accessToken);
        });
    }
};
AccessTokenService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [AccessTokenRepository_1.AccessTokenRepository, Object])
], AccessTokenService);
exports.AccessTokenService = AccessTokenService;
//# sourceMappingURL=AccessTokenService.js.map