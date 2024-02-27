"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationAttrGrpToAttributeService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const SpecAttrGrpToAttributeRepository_1 = require("../repositories/SpecAttrGrpToAttributeRepository");
let SpecificationAttrGrpToAttributeService = class SpecificationAttrGrpToAttributeService {
    constructor(specificationAttrGrpToAttributeRepository) {
        this.specificationAttrGrpToAttributeRepository = specificationAttrGrpToAttributeRepository;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.specificationAttrGrpToAttributeRepository.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.specificationAttrGrpToAttributeRepository.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.specificationAttrGrpToAttributeRepository.findOne(condition);
    }
    // findOne
    delete(condition) {
        return this.specificationAttrGrpToAttributeRepository.delete(condition);
    }
    // findOne
    find(condition) {
        return this.specificationAttrGrpToAttributeRepository.find(condition);
    }
};
SpecificationAttrGrpToAttributeService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__metadata("design:paramtypes", [SpecAttrGrpToAttributeRepository_1.SpecificationAttrGrpToAttributeRepository])
], SpecificationAttrGrpToAttributeService);
exports.SpecificationAttrGrpToAttributeService = SpecificationAttrGrpToAttributeService;
//# sourceMappingURL=SpecificationAttrGrpToAttributeService.js.map