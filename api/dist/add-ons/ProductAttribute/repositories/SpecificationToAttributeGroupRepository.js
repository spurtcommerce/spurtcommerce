"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationToAttributeGroupRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const SpecificationToAttributeGroup_1 = require("../models/SpecificationToAttributeGroup");
let SpecificationToAttributeGroupRepository = class SpecificationToAttributeGroupRepository extends typeorm_1.Repository {
};
SpecificationToAttributeGroupRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(SpecificationToAttributeGroup_1.SpecificationToAttributeGroup)
], SpecificationToAttributeGroupRepository);
exports.SpecificationToAttributeGroupRepository = SpecificationToAttributeGroupRepository;
//# sourceMappingURL=SpecificationToAttributeGroupRepository.js.map