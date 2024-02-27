"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeToGroupRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const AttributeToGroup_1 = require("../models/AttributeToGroup");
let AttributeToGroupRepository = class AttributeToGroupRepository extends typeorm_1.Repository {
};
AttributeToGroupRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(AttributeToGroup_1.AttributeToGroup)
], AttributeToGroupRepository);
exports.AttributeToGroupRepository = AttributeToGroupRepository;
//# sourceMappingURL=AttributeToGroupRepository.js.map