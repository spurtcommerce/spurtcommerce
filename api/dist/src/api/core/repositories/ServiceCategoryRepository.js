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
exports.ServiceCategoryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ServiceCategory_1 = require("../models/ServiceCategory");
let ServiceCategoryRepository = class ServiceCategoryRepository extends typeorm_1.Repository {
};
ServiceCategoryRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ServiceCategory_1.ServiceCategory)
], ServiceCategoryRepository);
exports.ServiceCategoryRepository = ServiceCategoryRepository;
//# sourceMappingURL=ServiceCategoryRepository.js.map