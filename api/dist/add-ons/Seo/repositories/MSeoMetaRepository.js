"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSeoMetaRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const MSeoMetaModel_1 = require("../models/MSeoMetaModel");
let MSeoMetaRepository = class MSeoMetaRepository extends typeorm_1.Repository {
};
MSeoMetaRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(MSeoMetaModel_1.MSeoMeta)
], MSeoMetaRepository);
exports.MSeoMetaRepository = MSeoMetaRepository;
//# sourceMappingURL=MSeoMetaRepository.js.map