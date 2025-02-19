"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnInorderCurrency1718717463861 = void 0;
const tslib_1 = require("tslib");
class AlterColumnInorderCurrency1718717463861 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExistOrder = yield queryRunner.hasColumn('order', 'currency_id');
            if (columnExistOrder) {
                yield queryRunner.query('Alter table `order` modify currency_id int null');
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterColumnInorderCurrency1718717463861 = AlterColumnInorderCurrency1718717463861;
//# sourceMappingURL=1718717463861-AlterColumnInorderCurrency.js.map