"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyTypeRepository = void 0;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
const CompanyType_1 = require("../models/CompanyType");
let CompanyTypeRepository = class CompanyTypeRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(CompanyType_1.CompanyType);
    }
};
exports.CompanyTypeRepository = CompanyTypeRepository;
exports.CompanyTypeRepository = CompanyTypeRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], CompanyTypeRepository);
//# sourceMappingURL=CompanyTypeRepository.js.map