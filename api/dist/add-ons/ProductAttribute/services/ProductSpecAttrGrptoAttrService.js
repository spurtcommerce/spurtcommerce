"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecAttrGrptoAttrService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const ProductSpecAttrGrpToAttrRepository_1 = require("../repositories/ProductSpecAttrGrpToAttrRepository");
let ProductSpecAttrGrptoAttrService = class ProductSpecAttrGrptoAttrService {
    constructor(prdSpecAttrGrpAttrRepository) {
        this.prdSpecAttrGrpAttrRepository = prdSpecAttrGrpAttrRepository;
        // --
    }
    // create
    create(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prdSpecAttrGrpAttrRepository.save(specification);
        });
    }
    bulkCreate(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prdSpecAttrGrpAttrRepository.save(specification);
        });
    }
    // findOne
    findOne(condition) {
        return this.prdSpecAttrGrpAttrRepository.findOne(condition);
    }
    // find
    find(condition) {
        return this.prdSpecAttrGrpAttrRepository.find(condition);
    }
    delete(specification) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.prdSpecAttrGrpAttrRepository.delete(specification);
        });
    }
};
ProductSpecAttrGrptoAttrService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__metadata("design:paramtypes", [ProductSpecAttrGrpToAttrRepository_1.ProductSpecAttrGrpToAttrRepository])
], ProductSpecAttrGrptoAttrService);
exports.ProductSpecAttrGrptoAttrService = ProductSpecAttrGrptoAttrService;
//# sourceMappingURL=ProductSpecAttrGrptoAttrService.js.map