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
exports.ServiceEnquiryRepository = void 0;
const tslib_1 = require("tslib");
const ServiceEnquiry_1 = require("../models/ServiceEnquiry");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let ServiceEnquiryRepository = class ServiceEnquiryRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ServiceEnquiry_1.ServiceEnquiry);
    }
};
exports.ServiceEnquiryRepository = ServiceEnquiryRepository;
exports.ServiceEnquiryRepository = ServiceEnquiryRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ServiceEnquiryRepository);
//# sourceMappingURL=ServiceEnquiryRepository.js.map