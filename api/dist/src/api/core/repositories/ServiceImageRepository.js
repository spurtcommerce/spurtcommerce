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
exports.ServiceImageRepository = void 0;
const tslib_1 = require("tslib");
const ServiceImage_1 = require("../models/ServiceImage");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let ServiceImageRepository = class ServiceImageRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ServiceImage_1.ServiceImage);
    }
};
exports.ServiceImageRepository = ServiceImageRepository;
exports.ServiceImageRepository = ServiceImageRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ServiceImageRepository);
//# sourceMappingURL=ServiceImageRepository.js.map