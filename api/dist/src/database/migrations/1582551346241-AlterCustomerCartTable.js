"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterCustomerCartTable1582551346241 = void 0;
const tslib_1 = require("tslib");
class AlterCustomerCartTable1582551346241 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `customer_cart` CHANGE `option_name` `option_name` Text DEFAULT NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `customer_cart` CHANGE `option_name` `option_name` Text DEFAULT NULL');
        });
    }
}
exports.AlterCustomerCartTable1582551346241 = AlterCustomerCartTable1582551346241;
//# sourceMappingURL=1582551346241-AlterCustomerCartTable.js.map