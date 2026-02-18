"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeToGroupRepository = void 0;
const tslib_1 = require("tslib");
const AttributeToGroup_1 = require("../models/AttributeToGroup");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let AttributeToGroupRepository = class AttributeToGroupRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(AttributeToGroup_1.AttributeToGroup);
    }
};
exports.AttributeToGroupRepository = AttributeToGroupRepository;
exports.AttributeToGroupRepository = AttributeToGroupRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], AttributeToGroupRepository);
//# sourceMappingURL=AttributeToGroupRepository.js.map