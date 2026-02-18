"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceToCategoryRepository = void 0;
const tslib_1 = require("tslib");
const ServiceToCategory_1 = require("../models/ServiceToCategory");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let ServiceToCategoryRepository = class ServiceToCategoryRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ServiceToCategory_1.ServiceToCategory);
    }
};
exports.ServiceToCategoryRepository = ServiceToCategoryRepository;
exports.ServiceToCategoryRepository = ServiceToCategoryRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ServiceToCategoryRepository);
//# sourceMappingURL=ServiceToCategoryRepository.js.map