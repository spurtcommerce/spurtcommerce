"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSpecialRepository = void 0;
const tslib_1 = require("tslib");
const ProductSpecial_1 = require("../models/ProductSpecial");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let ProductSpecialRepository = class ProductSpecialRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductSpecial_1.ProductSpecial);
    }
    findSpecialPrice(productId, todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('productSpecial');
            query.select(['productSpecial.price as price', 'productSpecial.dateStart as dateStart', 'productSpecial.dateEnd as dateEnd']);
            query.where('productSpecial.productId = ' + productId);
            query.andWhere('(productSpecial.dateStart <= :todaydate AND productSpecial.dateEnd >= :todaydate)', { todaydate });
            query.orderBy('productSpecial.priority', 'ASC');
            query.addOrderBy('productSpecial.price', 'ASC');
            query.limit('1');
            return query.getRawOne();
        });
    }
    findSpecialPriceWithSku(productId, skuId, todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('productSpecial');
            query.select(['productSpecial.price as price', 'productSpecial.dateStart as dateStart', 'productSpecial.dateEnd as dateEnd', 'productSpecial.skuId as skuId']);
            query.where('productSpecial.productId = ' + productId);
            query.andWhere('productSpecial.skuId = ' + skuId);
            query.andWhere('(productSpecial.dateStart <= :todaydate AND productSpecial.dateEnd >= :todaydate)', { todaydate });
            query.orderBy('productSpecial.priority', 'ASC');
            query.addOrderBy('productSpecial.price', 'ASC');
            query.limit('1');
            return query.getRawOne();
        });
    }
};
exports.ProductSpecialRepository = ProductSpecialRepository;
exports.ProductSpecialRepository = ProductSpecialRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductSpecialRepository);
//# sourceMappingURL=ProductSpecialRepository.js.map