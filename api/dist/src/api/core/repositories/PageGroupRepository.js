"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageGroupRepository = void 0;
const tslib_1 = require("tslib");
const PageGroup_1 = require("../models/PageGroup");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let PageGroupRepository = class PageGroupRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(PageGroup_1.PageGroup);
    }
};
exports.PageGroupRepository = PageGroupRepository;
exports.PageGroupRepository = PageGroupRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], PageGroupRepository);
//# sourceMappingURL=PageGroupRepository.js.map