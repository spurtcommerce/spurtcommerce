"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationToAttributeGroupService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const SpecificationToAttributeGroupRepository_1 = require("../repositories/SpecificationToAttributeGroupRepository");
let SpecificationToAttributeGroupService = class SpecificationToAttributeGroupService {
    constructor(specificationToAttributeGroupRepository) {
        this.specificationToAttributeGroupRepository = specificationToAttributeGroupRepository;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.specificationToAttributeGroupRepository.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.specificationToAttributeGroupRepository.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.specificationToAttributeGroupRepository.findOne(condition);
    }
    // findOne
    delete(condition) {
        return this.specificationToAttributeGroupRepository.delete(condition);
    }
    // findOne
    find(condition) {
        return this.specificationToAttributeGroupRepository.find(condition);
    }
};
SpecificationToAttributeGroupService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__metadata("design:paramtypes", [SpecificationToAttributeGroupRepository_1.SpecificationToAttributeGroupRepository])
], SpecificationToAttributeGroupService);
exports.SpecificationToAttributeGroupService = SpecificationToAttributeGroupService;
//# sourceMappingURL=SpecificationToAttributeGroupService.js.map