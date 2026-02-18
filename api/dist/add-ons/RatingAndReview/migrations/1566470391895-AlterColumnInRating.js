"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnInRating1566470391895 = void 0;
const tslib_1 = require("tslib");
class AlterColumnInRating1566470391895 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `product` CHANGE `rating` `rating` decimal(10,2) DEFAULT NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `product` CHANGE `rating` `rating` decimal(10,2) DEFAULT NULL');
        });
    }
}
exports.AlterColumnInRating1566470391895 = AlterColumnInRating1566470391895;
//# sourceMappingURL=1566470391895-AlterColumnInRating.js.map