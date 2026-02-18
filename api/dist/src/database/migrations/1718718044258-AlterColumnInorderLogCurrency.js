"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnInorderLogCurrency1718718044258 = void 0;
const tslib_1 = require("tslib");
class AlterColumnInorderLogCurrency1718718044258 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExistOrder = yield queryRunner.hasColumn('order_log', 'currency_id');
            if (columnExistOrder) {
                yield queryRunner.query('Alter table `order_log` modify currency_id int null');
            }
            const columnExistOrder2 = yield queryRunner.hasColumn('order_log', 'shipping_zone_id');
            if (columnExistOrder2) {
                yield queryRunner.query('Alter table `order_log` modify shipping_zone_id int null');
            }
            const columnExistOrder3 = yield queryRunner.hasColumn('order_log', 'payment_zone_id');
            if (columnExistOrder3) {
                yield queryRunner.query('Alter table `order_log` modify payment_zone_id int null');
            }
            const columnExistOrder4 = yield queryRunner.hasColumn('order_log', 'payment_country_id');
            if (columnExistOrder4) {
                yield queryRunner.query('Alter table `order_log` modify payment_country_id int null');
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterColumnInorderLogCurrency1718718044258 = AlterColumnInorderLogCurrency1718718044258;
//# sourceMappingURL=1718718044258-AlterColumnInorderLogCurrency.js.map