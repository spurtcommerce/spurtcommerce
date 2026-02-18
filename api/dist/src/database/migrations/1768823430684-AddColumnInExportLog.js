"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInExportLog1768823430684 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInExportLog1768823430684 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.addColumns('export_log', [
                new typeorm_1.TableColumn({
                    name: 'product_type',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                }),
                new typeorm_1.TableColumn({
                    name: 'export_id',
                    type: 'int',
                    isNullable: true,
                }),
            ]);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddColumnInExportLog1768823430684 = AddColumnInExportLog1768823430684;
//# sourceMappingURL=1768823430684-AddColumnInExportLog.js.map