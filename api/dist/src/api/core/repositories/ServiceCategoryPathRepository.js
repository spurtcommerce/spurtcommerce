"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoryPathRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ServiceCategoryPath_1 = require("../models/ServiceCategoryPath");
let ServiceCategoryPathRepository = class ServiceCategoryPathRepository extends typeorm_1.Repository {
};
ServiceCategoryPathRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ServiceCategoryPath_1.ServiceCategoryPath)
], ServiceCategoryPathRepository);
exports.ServiceCategoryPathRepository = ServiceCategoryPathRepository;
//# sourceMappingURL=ServiceCategoryPathRepository.js.map