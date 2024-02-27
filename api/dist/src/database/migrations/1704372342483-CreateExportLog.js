"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExportLog1704372342483 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateExportLog1704372342483 {
    constructor() {
        this.tableName = 'export_log';
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: this.tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'module',
                        type: 'VARCHAR',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'record_available',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'created_by',
                        type: 'INT',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifTable = yield queryRunner.hasTable(this.tableName);
            if (!ifTable) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable(this.tableName, true);
        });
    }
}
exports.CreateExportLog1704372342483 = CreateExportLog1704372342483;
//# sourceMappingURL=1704372342483-CreateExportLog.js.map