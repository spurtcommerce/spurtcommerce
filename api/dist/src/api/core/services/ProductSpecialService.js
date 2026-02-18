"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecialService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
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
            return this.productSpecialRepository.repository.save(Data);
        });
    }
    // findone a data
    findOne(id) {
        this.log.info('Find a data');
        return this.productSpecialRepository.repository.findOne(id);
    }
    // find a data
    findAll(productSpecial) {
        this.log.info('Find a data');
        return this.productSpecialRepository.repository.find(productSpecial);
    }
    // find a data
    find(condition) {
        this.log.info('Find a data');
        return this.productSpecialRepository.repository.find(condition ? condition : {});
    }
    // delete product option
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a product option value');
            const deleteProductOptionValue = yield this.productSpecialRepository.repository.delete(id);
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
exports.ProductSpecialService = ProductSpecialService;
exports.ProductSpecialService = ProductSpecialService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ProductSpecialRepository_1.ProductSpecialRepository, Object])
], ProductSpecialService);
//# sourceMappingURL=ProductSpecialService.js.map