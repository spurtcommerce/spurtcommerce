"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyTypeService = void 0;
const tslib_1 = require("tslib");
const Logger_1 = require("../../../../src/decorators/Logger");
const typedi_1 = require("typedi");
const CompanyTypeRepository_1 = require("../repositories/CompanyTypeRepository");
let CompanyTypeService = class CompanyTypeService {
    constructor(companyTypeRepository, log) {
        this.companyTypeRepository = companyTypeRepository;
        this.log = log;
    }
    findOne(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.companyTypeRepository.repository.findOne(data);
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Company type successfully getted');
            return this.companyTypeRepository.repository.find();
        });
    }
};
exports.CompanyTypeService = CompanyTypeService;
exports.CompanyTypeService = CompanyTypeService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [CompanyTypeRepository_1.CompanyTypeRepository, Object])
], CompanyTypeService);
//# sourceMappingURL=CompanyTypeService.js.map