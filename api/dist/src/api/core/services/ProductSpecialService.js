"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecialService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const ProductSpecialRepository_1 = require("../repositories/ProductSpecialRepository");
let ProductSpecialService = class ProductSpecialService {
    constructor(productSpecialRepository, log) {
        this.productSpecialRepository = productSpecialRepository;
        this.log = log;
    }
    // create a data
    create(Data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('create a data');
            return this.productSpecialRepository.save(Data);
        });
    }
    // findone a data
    findOne(id) {
        this.log.info('Find a data');
        return this.productSpecialRepository.findOne(id);
    }
    // find a data
    findAll(productSpecial) {
        this.log.info('Find a data');
        return this.productSpecialRepository.find(productSpecial);
    }
    // find a data
    find() {
        this.log.info('Find a data');
        return this.productSpecialRepository.find();
    }
    // delete product option
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a product option value');
            const deleteProductOptionValue = yield this.productSpecialRepository.delete(id);
            return deleteProductOptionValue;
        });
    }
    // find special price
    findSpecialPrice(productId, todayDate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productSpecialRepository.findSpecialPrice(productId, todayDate);
        });
    }
    // find special price
    findSpecialPriceWithSku(productId, skuId, todayDate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productSpecialRepository.findSpecialPriceWithSku(productId, skuId, todayDate);
        });
    }
};
ProductSpecialService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ProductSpecialRepository_1.ProductSpecialRepository, Object])
], ProductSpecialService);
exports.ProductSpecialService = ProductSpecialService;
//# sourceMappingURL=ProductSpecialService.js.map