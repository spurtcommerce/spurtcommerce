"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGroupRepository = void 0;
const tslib_1 = require("tslib");
const UserGroup_1 = require("../models/UserGroup");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let UserGroupRepository = class UserGroupRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(UserGroup_1.UserGroup);
    }
};
exports.UserGroupRepository = UserGroupRepository;
exports.UserGroupRepository = UserGroupRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], UserGroupRepository);
//# sourceMappingURL=UserGroupRepository.js.map