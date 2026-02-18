"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterProductColumn1565856125812 = void 0;
const tslib_1 = require("tslib");
class AlterProductColumn1565856125812 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `currency` CHANGE `value` `value` float(15,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_discount` CHANGE `price` `price` decimal(15,2) DEFAULT NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `currency` CHANGE `value` `value` float(15,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `product_discount` CHANGE `price` `price` decimal(15,2) DEFAULT NULL');
        });
    }
}
exports.AlterProductColumn1565856125812 = AlterProductColumn1565856125812;
//# sourceMappingURL=1565856125812-AlterProductColumn.js.map