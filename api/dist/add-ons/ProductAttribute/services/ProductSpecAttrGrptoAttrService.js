"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecAttrGrptoAttrService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const ProductSpecAttrGrpToAttrRepository_1 = require("../repositories/ProductSpecAttrGrpToAttrRepository");
let ProductSpecAttrGrptoAttrService = class ProductSpecAttrGrptoAttrService {
    constructor(prdSpecAttrGrpAttrRepository) {
        this.prdSpecAttrGrpAttrRepository = prdSpecAttrGrpAttrRepository;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prdSpecAttrGrpAttrRepository.repository.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prdSpecAttrGrpAttrRepository.repository.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.prdSpecAttrGrpAttrRepository.repository.findOne(condition);
    }
    // find
    find(condition) {
        return this.prdSpecAttrGrpAttrRepository.repository.find(condition);
    }
    delete(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prdSpecAttrGrpAttrRepository.repository.delete(specification);
        });
    }
};
exports.ProductSpecAttrGrptoAttrService = ProductSpecAttrGrptoAttrService;
exports.ProductSpecAttrGrptoAttrService = ProductSpecAttrGrptoAttrService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [ProductSpecAttrGrpToAttrRepository_1.ProductSpecAttrGrpToAttrRepository])
], ProductSpecAttrGrptoAttrService);
//# sourceMappingURL=ProductSpecAttrGrptoAttrService.js.map