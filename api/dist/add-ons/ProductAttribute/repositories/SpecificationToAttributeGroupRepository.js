"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationToAttributeGroupRepository = void 0;
const tslib_1 = require("tslib");
const SpecificationToAttributeGroup_1 = require("../models/SpecificationToAttributeGroup");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let SpecificationToAttributeGroupRepository = class SpecificationToAttributeGroupRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(SpecificationToAttributeGroup_1.SpecificationToAttributeGroup);
    }
};
exports.SpecificationToAttributeGroupRepository = SpecificationToAttributeGroupRepository;
exports.SpecificationToAttributeGroupRepository = SpecificationToAttributeGroupRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SpecificationToAttributeGroupRepository);
//# sourceMappingURL=SpecificationToAttributeGroupRepository.js.map