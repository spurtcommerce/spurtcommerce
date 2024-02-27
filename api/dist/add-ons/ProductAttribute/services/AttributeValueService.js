"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeValueService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const AttributeValueRepository_1 = require("../repositories/AttributeValueRepository");
let AttributeValueService = class AttributeValueService {
    constructor(attributeValueRepository) {
        this.attributeValueRepository = attributeValueRepository;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.attributeValueRepository.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.attributeValueRepository.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.attributeValueRepository.findOne(condition);
    }
    // findOne
    delete(condition) {
        return this.attributeValueRepository.delete(condition);
    }
};
AttributeValueService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__metadata("design:paramtypes", [AttributeValueRepository_1.AttributeValueRepository])
], AttributeValueService);
exports.AttributeValueService = AttributeValueService;
//# sourceMappingURL=AttributeValueService.js.map