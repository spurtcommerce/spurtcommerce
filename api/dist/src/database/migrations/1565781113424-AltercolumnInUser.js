"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AltercolumnInUser1565781113424 = void 0;
const tslib_1 = require("tslib");
class AltercolumnInUser1565781113424 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `users` CHANGE `delete_flag` `delete_flag` INT(11) DEFAULT 0');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `users` CHANGE `delete_flag` `delete_flag` INT(11) DEFAULT 0');
        });
    }
}
exports.AltercolumnInUser1565781113424 = AltercolumnInUser1565781113424;
//# sourceMappingURL=1565781113424-AltercolumnInUser.js.map