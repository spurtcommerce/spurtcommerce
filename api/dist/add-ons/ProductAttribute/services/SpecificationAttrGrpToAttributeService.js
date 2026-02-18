"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationAttrGrpToAttributeService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const SpecAttrGrpToAttributeRepository_1 = require("../repositories/SpecAttrGrpToAttributeRepository");
let SpecificationAttrGrpToAttributeService = class SpecificationAttrGrpToAttributeService {
    constructor(specificationAttrGrpToAttributeRepository) {
        this.specificationAttrGrpToAttributeRepository = specificationAttrGrpToAttributeRepository;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.specificationAttrGrpToAttributeRepository.repository.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.specificationAttrGrpToAttributeRepository.repository.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.specificationAttrGrpToAttributeRepository.repository.findOne(condition);
    }
    // findOne
    delete(condition) {
        return this.specificationAttrGrpToAttributeRepository.repository.delete(condition);
    }
    // findOne
    find(condition) {
        return this.specificationAttrGrpToAttributeRepository.repository.find(condition);
    }
};
exports.SpecificationAttrGrpToAttributeService = SpecificationAttrGrpToAttributeService;
exports.SpecificationAttrGrpToAttributeService = SpecificationAttrGrpToAttributeService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [SpecAttrGrpToAttributeRepository_1.SpecificationAttrGrpToAttributeRepository])
], SpecificationAttrGrpToAttributeService);
//# sourceMappingURL=SpecificationAttrGrpToAttributeService.js.map