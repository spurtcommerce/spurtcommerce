"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnKeywordInProductTable1650361956965 = void 0;
const tslib_1 = require("tslib");
class AlterColumnKeywordInProductTable1650361956965 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `product` CHANGE `keywords` `keywords` text ');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `product` CHANGE `keywords` `keywords` text');
        });
    }
}
exports.AlterColumnKeywordInProductTable1650361956965 = AlterColumnKeywordInProductTable1650361956965;
//# sourceMappingURL=1650361956965-AlterColumnKeywordInProductTable.js.map