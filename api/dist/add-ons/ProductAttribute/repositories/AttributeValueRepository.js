"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeValueRepository = void 0;
const tslib_1 = require("tslib");
const AttributeValue_1 = require("../models/AttributeValue");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let AttributeValueRepository = class AttributeValueRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(AttributeValue_1.AttributeValue);
    }
};
exports.AttributeValueRepository = AttributeValueRepository;
exports.AttributeValueRepository = AttributeValueRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], AttributeValueRepository);
//# sourceMappingURL=AttributeValueRepository.js.map