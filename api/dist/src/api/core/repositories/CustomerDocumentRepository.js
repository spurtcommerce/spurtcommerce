"use strict";
/*
 * spurtcommerce API
 * version 4.8.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDocumentRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const CustomerDocument_1 = require("../models/CustomerDocument");
let CustomerDocumentRepository = class CustomerDocumentRepository extends typeorm_1.Repository {
};
CustomerDocumentRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(CustomerDocument_1.CustomerDocument)
], CustomerDocumentRepository);
exports.CustomerDocumentRepository = CustomerDocumentRepository;
//# sourceMappingURL=CustomerDocumentRepository.js.map