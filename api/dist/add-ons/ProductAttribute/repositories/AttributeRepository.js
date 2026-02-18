"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeRepository = void 0;
const tslib_1 = require("tslib");
const Attribute_1 = require("../models/Attribute");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let AttributeRepository = class AttributeRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Attribute_1.Attribute);
    }
};
exports.AttributeRepository = AttributeRepository;
exports.AttributeRepository = AttributeRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], AttributeRepository);
//# sourceMappingURL=AttributeRepository.js.map