"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateForeignKeyToZero1733893642906 = void 0;
const tslib_1 = require("tslib");
class UpdateForeignKeyToZero1733893642906 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Update all rows in the foreign key column to 0
            yield queryRunner.query(`UPDATE \`category\` SET \`industry_id\` = 0;`);
            // Alter the foreign key column to set default value to 0
            yield queryRunner.query(`ALTER TABLE \`category\` ALTER COLUMN \`industry_id\` SET DEFAULT 0;`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.UpdateForeignKeyToZero1733893642906 = UpdateForeignKeyToZero1733893642906;
//# sourceMappingURL=1733893642906-UpdateForeignKeyToZero.js.map