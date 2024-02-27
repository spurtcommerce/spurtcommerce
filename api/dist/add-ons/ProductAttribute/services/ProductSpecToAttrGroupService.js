"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecToAttrGroupService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const ProductSpecToAttrGroupRepository_1 = require("../repositories/ProductSpecToAttrGroupRepository");
let ProductSpecToAttrGroupService = class ProductSpecToAttrGroupService {
    constructor(prdSpecToAttrgroupRepository) {
        this.prdSpecToAttrgroupRepository = prdSpecToAttrgroupRepository;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prdSpecToAttrgroupRepository.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prdSpecToAttrgroupRepository.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.prdSpecToAttrgroupRepository.findOne(condition);
    }
    // find
    find(condition) {
        return this.prdSpecToAttrgroupRepository.find(condition);
    }
    delete(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prdSpecToAttrgroupRepository.delete(specification);
        });
    }
};
ProductSpecToAttrGroupService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__metadata("design:paramtypes", [ProductSpecToAttrGroupRepository_1.ProductSpecToAttrGroupRepository])
], ProductSpecToAttrGroupService);
exports.ProductSpecToAttrGroupService = ProductSpecToAttrGroupService;
//# sourceMappingURL=ProductSpecToAttrGroupService.js.map