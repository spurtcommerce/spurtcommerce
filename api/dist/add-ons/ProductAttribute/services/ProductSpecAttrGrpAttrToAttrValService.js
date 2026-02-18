"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecAttrGrpAttrToAttrValService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const ProductSpecAttrGrpAttrToAttrValRepository_1 = require("../repositories/ProductSpecAttrGrpAttrToAttrValRepository");
let ProductSpecAttrGrpAttrToAttrValService = class ProductSpecAttrGrpAttrToAttrValService {
    constructor(productSpecAttrGrpAttrToAttrValRepository) {
        this.productSpecAttrGrpAttrToAttrValRepository = productSpecAttrGrpAttrToAttrValRepository;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productSpecAttrGrpAttrToAttrValRepository.repository.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productSpecAttrGrpAttrToAttrValRepository.repository.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.productSpecAttrGrpAttrToAttrValRepository.repository.findOne(condition);
    }
    // find
    find(condition) {
        return this.productSpecAttrGrpAttrToAttrValRepository.repository.find(condition);
    }
    delete(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productSpecAttrGrpAttrToAttrValRepository.repository.delete(specification);
        });
    }
};
exports.ProductSpecAttrGrpAttrToAttrValService = ProductSpecAttrGrpAttrToAttrValService;
exports.ProductSpecAttrGrpAttrToAttrValService = ProductSpecAttrGrpAttrToAttrValService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [ProductSpecAttrGrpAttrToAttrValRepository_1.ProductSpecAttrGrpAttrToAttrValRepository])
], ProductSpecAttrGrpAttrToAttrValService);
//# sourceMappingURL=ProductSpecAttrGrpAttrToAttrValService.js.map