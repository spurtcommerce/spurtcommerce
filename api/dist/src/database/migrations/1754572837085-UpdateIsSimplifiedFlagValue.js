"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIsSimplifiedFlagValue1754572837085 = void 0;
const tslib_1 = require("tslib");
class UpdateIsSimplifiedFlagValue1754572837085 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`UPDATE product
            SET is_specification = CASE
                WHEN is_simplified = 1 THEN 1
                ELSE 0
            END;`);
            yield queryRunner.query(`UPDATE product
                SET is_simplified = 1
                WHERE is_simplified = 2;`);
            yield queryRunner.query(`UPDATE product
            SET product_type = 1, is_subscription = 0;`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.UpdateIsSimplifiedFlagValue1754572837085 = UpdateIsSimplifiedFlagValue1754572837085;
//# sourceMappingURL=1754572837085-UpdateIsSimplifiedFlagValue.js.map