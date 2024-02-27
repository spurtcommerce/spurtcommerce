"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationToCategoryService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const SpecificationToCategoryRepository_1 = require("../repositories/SpecificationToCategoryRepository");
let SpecificationToCategoryService = class SpecificationToCategoryService {
    constructor(specificationToCategoryService) {
        this.specificationToCategoryService = specificationToCategoryService;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.specificationToCategoryService.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.specificationToCategoryService.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.specificationToCategoryService.findOne(condition);
    }
    // findOne
    find(condition) {
        return this.specificationToCategoryService.find(condition);
    }
    // findOne
    delete(condition) {
        return this.specificationToCategoryService.delete(condition);
    }
};
SpecificationToCategoryService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__metadata("design:paramtypes", [SpecificationToCategoryRepository_1.SpecificationToCategoryRepository])
], SpecificationToCategoryService);
exports.SpecificationToCategoryService = SpecificationToCategoryService;
//# sourceMappingURL=SpecificationToCategoryService.js.map