"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTirePriceService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const ProductTirePriceRepository_1 = require("../repositories/ProductTirePriceRepository");
let ProductTirePriceService = class ProductTirePriceService {
    constructor(productTirePriceRepository, log) {
        this.productTirePriceRepository = productTirePriceRepository;
        this.log = log;
    }
    // create a data
    create(Data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('create a data');
            return this.productTirePriceRepository.save(Data);
        });
    }
    // findone a data
    findOne(id) {
        this.log.info('Find a data');
        return this.productTirePriceRepository.findOne(id);
    }
    // find a data
    findAll(productPrice) {
        this.log.info('Find a data');
        return this.productTirePriceRepository.find(productPrice);
    }
    // List
    list(limit, offset, whereConditions = [], count) {
        const condition = {};
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.productTirePriceRepository.count(condition);
        }
        else {
            return this.productTirePriceRepository.find(condition);
        }
    }
    // delete product tire price
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a product option value');
            const deleteProductTireValue = yield this.productTirePriceRepository.delete(id);
            return deleteProductTireValue;
        });
    }
    // find Tire Price
    findTirePrice(productId, skuId, quantity) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productTirePriceRepository.findTirePrice(productId, skuId, quantity);
        });
    }
};
ProductTirePriceService = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typeorm_typedi_extensions_1.OrmRepository)()),
    tslib_1.__param(1, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [ProductTirePriceRepository_1.ProductTirePriceRepository, Object])
], ProductTirePriceService);
exports.ProductTirePriceService = ProductTirePriceService;
//# sourceMappingURL=ProductTirePriceService.js.map