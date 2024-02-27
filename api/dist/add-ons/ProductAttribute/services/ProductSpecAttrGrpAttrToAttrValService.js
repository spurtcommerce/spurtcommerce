"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecAttrGrpAttrToAttrValService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const ProductSpecAttrGrpAttrToAttrValRepository_1 = require("../repositories/ProductSpecAttrGrpAttrToAttrValRepository");
let ProductSpecAttrGrpAttrToAttrValService = class ProductSpecAttrGrpAttrToAttrValService {
    constructor(productSpecAttrGrpAttrToAttrValRepository) {
        this.productSpecAttrGrpAttrToAttrValRepository = productSpecAttrGrpAttrToAttrValRepository;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productSpecAttrGrpAttrToAttrValRepository.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productSpecAttrGrpAttrToAttrValRepository.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.productSpecAttrGrpAttrToAttrValRepository.findOne(condition);
    }
    // find
    find(condition) {
        return this.productSpecAttrGrpAttrToAttrValRepository.find(condition);
    }
    delete(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productSpecAttrGrpAttrToAttrValRepository.delete(specification);
        });
    }
};
ProductSpecAttrGrpAttrToAttrValService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__metadata("design:paramtypes", [ProductSpecAttrGrpAttrToAttrValRepository_1.ProductSpecAttrGrpAttrToAttrValRepository])
], ProductSpecAttrGrpAttrToAttrValService);
exports.ProductSpecAttrGrpAttrToAttrValService = ProductSpecAttrGrpAttrToAttrValService;
//# sourceMappingURL=ProductSpecAttrGrpAttrToAttrValService.js.map