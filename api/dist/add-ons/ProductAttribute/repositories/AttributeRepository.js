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
const typeorm_1 = require("typeorm");
const Attribute_1 = require("../models/Attribute");
let AttributeRepository = class AttributeRepository extends typeorm_1.Repository {
};
AttributeRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Attribute_1.Attribute)
], AttributeRepository);
exports.AttributeRepository = AttributeRepository;
//# sourceMappingURL=AttributeRepository.js.map