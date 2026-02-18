"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTirePriceRepository = void 0;
const tslib_1 = require("tslib");
const ProductTirePrice_1 = require("../models/ProductTirePrice");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let ProductTirePriceRepository = class ProductTirePriceRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductTirePrice_1.ProductTirePrice);
    }
    findTirePrice(productId, skuId, quantity) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('productTirePrice');
            query.select(['productTirePrice.price as price', 'productTirePrice.quantity as quantity', 'productTirePrice.productId as productId']);
            query.where('productTirePrice.productId = ' + productId);
            query.where('productTirePrice.skuId = ' + skuId);
            query.andWhere('productTirePrice.quantity <= ' + quantity);
            query.orderBy('productTirePrice.quantity', 'DESC');
            query.limit('1');
            return query.getRawOne();
        });
    }
};
exports.ProductTirePriceRepository = ProductTirePriceRepository;
exports.ProductTirePriceRepository = ProductTirePriceRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductTirePriceRepository);
//# sourceMappingURL=ProductTirePriceRepository.js.map