"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationProductService = void 0;
const tslib_1 = require("tslib");
const QuotationProductRepository_1 = require("../repositories/QuotationProductRepository");
const typedi_1 = require("typedi");
let QuotationProductService = class QuotationProductService {
    constructor(quotationProductRepository) {
        this.quotationProductRepository = quotationProductRepository;
    }
    // Create QuotationProduct
    create(quotationProduct) {
        return this.quotationProductRepository.repository.save(quotationProduct);
    }
    // find QuotationProduct
    find(quotationProduct) {
        return this.quotationProductRepository.repository.find(quotationProduct);
    }
    // findOne QuotationProduct
    findOne(quotationProduct) {
        return this.quotationProductRepository.repository.findOne(quotationProduct);
    }
    // update saleOrder Address
    update(id, data) {
        return this.quotationProductRepository.repository.update(id, data);
    }
    // delete QuotationProduct
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.quotationProductRepository.repository.delete(id);
        });
    }
};
exports.QuotationProductService = QuotationProductService;
exports.QuotationProductService = QuotationProductService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [QuotationProductRepository_1.QuotationProductRepository])
], QuotationProductService);
//# sourceMappingURL=QuotationProductService.js.map