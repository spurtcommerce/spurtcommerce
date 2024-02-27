"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnsInSkuTable1657012239912 = void 0;
const tslib_1 = require("tslib");
class AlterColumnsInSkuTable1657012239912 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `sku` CHANGE `min_quantity_allowed_cart` `min_quantity_allowed_cart` int DEFAULT 1');
            yield queryRunner.query('ALTER TABLE `sku` CHANGE `max_quantity_allowed_cart` `max_quantity_allowed_cart` int DEFAULT 5');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `sku` CHANGE `min_quantity_allowed_cart` `min_quantity_allowed_cart` int DEFAULT 1');
            yield queryRunner.query('ALTER TABLE `sku` CHANGE `max_quantity_allowed_cart` `max_quantity_allowed_cart` int DEFAULT 5');
        });
    }
}
exports.AlterColumnsInSkuTable1657012239912 = AlterColumnsInSkuTable1657012239912;
//# sourceMappingURL=1657012239912-AlterColumnsInSkuTable.js.map