"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQRcodeService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../src/decorators/Logger");
const ProductQRcodeRepository_1 = require("../../ProductQrCode/reposistories/ProductQRcodeRepository");
let ProductQRcodeService = class ProductQRcodeService {
    constructor(productQRcodeRepository, log) {
        this.productQRcodeRepository = productQRcodeRepository;
        this.log = log;
    }
    create(productQRcode) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('got the product details');
            return this.productQRcodeRepository.save(productQRcode);
        });
    }
    findOne(productQRcode) {
        return this.productQRcodeRepository.findOne(productQRcode);
    }
    find(productQRcode) {
        return this.productQRcodeRepository.find(productQRcode);
    }
    delete(id) {
        return this.productQRcodeRepository.delete(id);
    }
    list(limit, offset, select = [], search = [], whereConditions = [], count) {
        const condition = {};
        condition.where = {};
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.productQRcodeRepository.count(condition);
        }
        else {
            return this.productQRcodeRepository.find(condition);
        }
    }
};
ProductQRcodeService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ProductQRcodeRepository_1.ProductQRcodeRepository, Object])
], ProductQRcodeService);
exports.ProductQRcodeService = ProductQRcodeService;
//# sourceMappingURL=ProductQRcodeService.js.map