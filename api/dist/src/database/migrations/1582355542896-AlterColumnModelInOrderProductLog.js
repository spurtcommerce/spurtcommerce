"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnModelInOrderProductLog1582355542896 = void 0;
const tslib_1 = require("tslib");
class AlterColumnModelInOrderProductLog1582355542896 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `order_product_log` CHANGE `model` `model` varchar(255) DEFAULT NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `order_product_log` CHANGE `model` `model` varchar(255) DEFAULT NULL');
        });
    }
}
exports.AlterColumnModelInOrderProductLog1582355542896 = AlterColumnModelInOrderProductLog1582355542896;
//# sourceMappingURL=1582355542896-AlterColumnModelInOrderProductLog.js.map