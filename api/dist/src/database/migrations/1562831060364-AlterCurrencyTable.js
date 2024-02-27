"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterCurrencyTable1562831060364 = void 0;
const tslib_1 = require("tslib");
class AlterCurrencyTable1562831060364 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `currency` CHANGE `symbol_left` `symbol_left` VARCHAR(32) COLLATE utf8mb4_unicode_ci NULL');
            yield queryRunner.query('ALTER TABLE `currency` CHANGE `symbol_Right` `symbol_Right` VARCHAR(32) COLLATE utf8mb4_unicode_ci NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `currency` CHANGE `symbol_left` `symbol_left` VARCHAR(32) COLLATE utf8mb4_unicode_ci NULL');
            yield queryRunner.query('ALTER TABLE `currency` CHANGE `symbol_Right` `symbol_Right` VARCHAR(32) COLLATE utf8mb4_unicode_ci NULL');
        });
    }
}
exports.AlterCurrencyTable1562831060364 = AlterCurrencyTable1562831060364;
//# sourceMappingURL=1562831060364-AlterCurrencyTable.js.map