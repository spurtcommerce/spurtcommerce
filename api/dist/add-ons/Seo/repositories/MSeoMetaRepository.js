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
const MSeoMetaModel_1 = require("../models/MSeoMetaModel");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let MSeoMetaRepository = class MSeoMetaRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(MSeoMetaModel_1.MSeoMeta);
    }
};
exports.MSeoMetaRepository = MSeoMetaRepository;
exports.MSeoMetaRepository = MSeoMetaRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], MSeoMetaRepository);
//# sourceMappingURL=MSeoMetaRepository.js.map