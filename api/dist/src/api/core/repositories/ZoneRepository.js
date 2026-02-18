"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneRepository = void 0;
const tslib_1 = require("tslib");
const Zone_1 = require("../models/Zone");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let ZoneRepository = class ZoneRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Zone_1.Zone);
    }
};
exports.ZoneRepository = ZoneRepository;
exports.ZoneRepository = ZoneRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ZoneRepository);
//# sourceMappingURL=ZoneRepository.js.map