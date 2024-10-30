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
exports.ServiceToCategoryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ServiceToCategory_1 = require("../models/ServiceToCategory");
let ServiceToCategoryRepository = class ServiceToCategoryRepository extends typeorm_1.Repository {
};
ServiceToCategoryRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ServiceToCategory_1.ServiceToCategory)
], ServiceToCategoryRepository);
exports.ServiceToCategoryRepository = ServiceToCategoryRepository;
//# sourceMappingURL=ServiceToCategoryRepository.js.map