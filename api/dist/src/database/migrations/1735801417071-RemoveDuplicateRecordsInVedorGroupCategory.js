"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveDuplicateRecordsInVedorGroupCategory1735801417071 = void 0;
const tslib_1 = require("tslib");
class RemoveDuplicateRecordsInVedorGroupCategory1735801417071 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`WITH DuplicateRecords AS (
            SELECT MIN(id) AS keep_id
                FROM vendor_group_category
                GROUP BY vendor_group_id, category_id, is_active
                )
            DELETE FROM vendor_group_category
            WHERE id NOT IN (SELECT keep_id FROM DuplicateRecords)`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.RemoveDuplicateRecordsInVedorGroupCategory1735801417071 = RemoveDuplicateRecordsInVedorGroupCategory1735801417071;
//# sourceMappingURL=1735801417071-RemoveDuplicateRecordsInVedorGroupCategory.js.map