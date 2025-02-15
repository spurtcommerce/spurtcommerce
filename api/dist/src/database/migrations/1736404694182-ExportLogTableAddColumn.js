"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportLogTableAddColumn1736404694182 = void 0;
const tslib_1 = require("tslib");
class ExportLogTableAddColumn1736404694182 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // drop collumn created_by
            yield queryRunner.query(`ALTER TABLE export_log DROP COLUMN created_by;`);
            // truncate table
            yield queryRunner.query('TRUNCATE TABLE export_log;');
            // add collumn created_date, reference_type and reference_id
            yield queryRunner.query(`
            ALTER TABLE export_log
            ADD COLUMN  reference_id INT,
            ADD COLUMN reference_type INT;`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.ExportLogTableAddColumn1736404694182 = ExportLogTableAddColumn1736404694182;
//# sourceMappingURL=1736404694182-ExportLogTableAddColumn.js.map