"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sku = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment");
const VendorProducts_1 = require("./VendorProducts");
const ProductModel_1 = require("./ProductModel");
let Sku = class Sku extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], Sku.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'sku_name' }),
    tslib_1.__metadata("design:type", String)
], Sku.prototype, "skuName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'price' }),
    tslib_1.__metadata("design:type", String)
], Sku.prototype, "price", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'quantity' }),
    tslib_1.__metadata("design:type", Number)
], Sku.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Sku.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'out_of_stock_threshold' }),
    tslib_1.__metadata("design:type", Number)
], Sku.prototype, "outOfStockThreshold", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'notify_min_quantity_below' }),
    tslib_1.__metadata("design:type", Number)
], Sku.prototype, "notifyMinQuantity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'min_quantity_allowed_cart' }),
    tslib_1.__metadata("design:type", Number)
], Sku.prototype, "minQuantityAllowedCart", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'max_quantity_allowed_cart' }),
    tslib_1.__metadata("design:type", Number)
], Sku.prototype, "maxQuantityAllowedCart", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'enable_back_orders' }),
    tslib_1.__metadata("design:type", Number)
], Sku.prototype, "enableBackOrders", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'back_order_stock_limit' }),
    tslib_1.__metadata("design:type", Number)
], Sku.prototype, "backOrderStockLimit", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], Sku.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => VendorProducts_1.VendorProducts, vendorproducts => vendorproducts.sku),
    tslib_1.__metadata("design:type", VendorProducts_1.VendorProducts)
], Sku.prototype, "vendorProducts", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(type => ProductModel_1.Product, product => product.skuDetail),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], Sku.prototype, "product", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Sku.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Sku.prototype, "updateDetails", null);
Sku = tslib_1.__decorate([
    (0, typeorm_1.Entity)('sku')
], Sku);
exports.Sku = Sku;
//# sourceMappingURL=SkuModel.js.map