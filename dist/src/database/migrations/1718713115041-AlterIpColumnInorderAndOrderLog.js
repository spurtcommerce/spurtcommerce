"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterIpColumnInorderAndOrderLog1718713115041 = void 0;
const tslib_1 = require("tslib");
class AlterIpColumnInorderAndOrderLog1718713115041 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExistOrder = yield queryRunner.hasColumn('order', 'ip');
            const columnExistOrderLog = yield queryRunner.hasColumn('order_log', 'ip');
            if (columnExistOrder) {
                yield queryRunner.query('Alter table `order` modify ip varchar(255)');
            }
            if (columnExistOrderLog) {
                yield queryRunner.query('Alter table `order_log` modify ip varchar(255)');
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            //
        });
    }
}
exports.AlterIpColumnInorderAndOrderLog1718713115041 = AlterIpColumnInorderAndOrderLog1718713115041;
//# sourceMappingURL=1718713115041-AlterIpColumnInorderAndOrderLog.js.map