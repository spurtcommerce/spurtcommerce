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
exports.ServiceCategoryRepository = void 0;
const tslib_1 = require("tslib");
const ServiceCategory_1 = require("../models/ServiceCategory");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let ServiceCategoryRepository = class ServiceCategoryRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ServiceCategory_1.ServiceCategory);
    }
};
exports.ServiceCategoryRepository = ServiceCategoryRepository;
exports.ServiceCategoryRepository = ServiceCategoryRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ServiceCategoryRepository);
//# sourceMappingURL=ServiceCategoryRepository.js.map