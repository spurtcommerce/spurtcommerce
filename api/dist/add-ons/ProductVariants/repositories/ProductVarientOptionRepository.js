"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarientOptionRepository = void 0;
const tslib_1 = require("tslib");
const ProductVarientOption_1 = require("../models/ProductVarientOption");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductVarientOptionRepository = class ProductVarientOptionRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductVarientOption_1.ProductVarientOption);
    }
    variantCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(ProductVarientOption_1.ProductVarientOption, 'productVarientOption');
            query.select(['productVarientOption.id as variantCount']);
            query.innerJoin('productVarientOption.product', 'product');
            query.where('productVarientOption.productId = ' + id);
            query.andWhere('product.isSimplified = 0');
            return query.getCount();
        });
    }
    findSkuForProductVarient(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(ProductVarientOption_1.ProductVarientOption, 'productVarientOption');
            query.select(['skuDetail.id as id', 'skuDetail.skuName as skuName', 'skuDetail.price as price', 'skuDetail.enableBackOrders as enableBackOrders', 'skuDetail.backOrderStockLimit as backOrderStockLimit', 'skuDetail.outOfStockThreshold as outOfStockThreshold', 'skuDetail.notifyMinQuantity as notifyMinQuantity', 'skuDetail.minQuantityAllowedCart as minQuantityAllowedCart', 'skuDetail.maxQuantityAllowedCart as maxQuantityAllowedCart',
                '(SELECT pvi.image as image FROM product_varient_option_image pvi WHERE pvi.id = productVarientOption.id AND pvi.default_image = 1 LIMIT 1) as image',
                '(SELECT pvi.container_name as containerName FROM product_varient_option_image pvi WHERE pvi.id = productVarientOption.id AND pvi.default_image = 1 LIMIT 1) as containerName',
            ]);
            query.leftJoin('productVarientOption.product', 'product');
            query.leftJoin('productVarientOption.skuDetail', 'skuDetail');
            query.where('productVarientOption.productId = :id', { id: productId });
            return query.getRawMany();
        });
    }
};
exports.ProductVarientOptionRepository = ProductVarientOptionRepository;
exports.ProductVarientOptionRepository = ProductVarientOptionRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductVarientOptionRepository);
//# sourceMappingURL=ProductVarientOptionRepository.js.map