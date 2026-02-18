"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationToAttributeGroupService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const SpecificationToAttributeGroupRepository_1 = require("../repositories/SpecificationToAttributeGroupRepository");
let SpecificationToAttributeGroupService = class SpecificationToAttributeGroupService {
    constructor(specificationToAttributeGroupRepository) {
        this.specificationToAttributeGroupRepository = specificationToAttributeGroupRepository;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.specificationToAttributeGroupRepository.repository.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.specificationToAttributeGroupRepository.repository.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.specificationToAttributeGroupRepository.repository.findOne(condition);
    }
    // findOne
    delete(condition) {
        return this.specificationToAttributeGroupRepository.repository.delete(condition);
    }
    // findOne
    find(condition) {
        return this.specificationToAttributeGroupRepository.repository.find(condition);
    }
};
exports.SpecificationToAttributeGroupService = SpecificationToAttributeGroupService;
exports.SpecificationToAttributeGroupService = SpecificationToAttributeGroupService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [SpecificationToAttributeGroupRepository_1.SpecificationToAttributeGroupRepository])
], SpecificationToAttributeGroupService);
//# sourceMappingURL=SpecificationToAttributeGroupService.js.map