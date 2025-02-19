"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterLoginLogTable1565852482174 = void 0;
const tslib_1 = require("tslib");
class AlterLoginLogTable1565852482174 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `login_log` CHANGE `first_name` `first_name` VARCHAR(255) DEFAULT NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `login_log` CHANGE `first_name` `first_name` VARCHAR(255) DEFAULT NULL');
        });
    }
}
exports.AlterLoginLogTable1565852482174 = AlterLoginLogTable1565852482174;
//# sourceMappingURL=1565852482174-AlterLoginLogTable.js.map