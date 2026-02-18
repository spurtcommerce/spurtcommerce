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
exports.ServiceCategoryPathRepository = void 0;
const tslib_1 = require("tslib");
const ServiceCategoryPath_1 = require("../models/ServiceCategoryPath");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let ServiceCategoryPathRepository = class ServiceCategoryPathRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ServiceCategoryPath_1.ServiceCategoryPath);
    }
};
exports.ServiceCategoryPathRepository = ServiceCategoryPathRepository;
exports.ServiceCategoryPathRepository = ServiceCategoryPathRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ServiceCategoryPathRepository);
//# sourceMappingURL=ServiceCategoryPathRepository.js.map