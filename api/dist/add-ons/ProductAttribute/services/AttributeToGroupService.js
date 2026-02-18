"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeToGroupService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const AttributeToGroupRepository_1 = require("../repositories/AttributeToGroupRepository");
let AttributeToGroupService = class AttributeToGroupService {
    constructor(attributeToGroupService) {
        this.attributeToGroupService = attributeToGroupService;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.attributeToGroupService.repository.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.attributeToGroupService.repository.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.attributeToGroupService.repository.findOne(condition);
    }
    // findOne
    delete(condition) {
        return this.attributeToGroupService.repository.delete(condition);
    }
    // findOne
    find(condition) {
        return this.attributeToGroupService.repository.find(condition);
    }
    findAttributeDistinct(attributeGroupId) {
        return this.attributeToGroupService.repository.createQueryBuilder().select('DISTINCT(AttributeToGroup.attributeId)')
            .where(`AttributeToGroup.attributeGroupId = ${attributeGroupId}`).getRawMany();
    }
};
exports.AttributeToGroupService = AttributeToGroupService;
exports.AttributeToGroupService = AttributeToGroupService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [AttributeToGroupRepository_1.AttributeToGroupRepository])
], AttributeToGroupService);
//# sourceMappingURL=AttributeToGroupService.js.map