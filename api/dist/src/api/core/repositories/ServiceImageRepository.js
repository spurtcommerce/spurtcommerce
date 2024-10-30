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
exports.ServiceImageRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ServiceImage_1 = require("../models/ServiceImage");
let ServiceImageRepository = class ServiceImageRepository extends typeorm_1.Repository {
};
ServiceImageRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ServiceImage_1.ServiceImage)
], ServiceImageRepository);
exports.ServiceImageRepository = ServiceImageRepository;
//# sourceMappingURL=ServiceImageRepository.js.map