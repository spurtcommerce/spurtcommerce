"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterServiceColumn1568280714656 = void 0;
const tslib_1 = require("tslib");
class AlterServiceColumn1568280714656 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `service` CHANGE `price` `price` decimal(10,2) DEFAULT NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `service` CHANGE `price` `price` decimal(10,2) DEFAULT NULL');
        });
    }
}
exports.AlterServiceColumn1568280714656 = AlterServiceColumn1568280714656;
//# sourceMappingURL=1568280714656-AlterServiceColumn.js.map