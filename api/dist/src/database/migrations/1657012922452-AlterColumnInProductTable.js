"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnInProductTable1657012922452 = void 0;
const tslib_1 = require("tslib");
class AlterColumnInProductTable1657012922452 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `product` CHANGE `has_stock` `has_stock` int DEFAULT 1');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `product` CHANGE `has_stock` `has_stock` int DEFAULT 1');
        });
    }
}
exports.AlterColumnInProductTable1657012922452 = AlterColumnInProductTable1657012922452;
//# sourceMappingURL=1657012922452-AlterColumnInProductTable.js.map