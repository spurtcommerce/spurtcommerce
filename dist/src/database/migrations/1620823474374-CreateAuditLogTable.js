"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuditLogTable1620823474374 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateAuditLogTable1620823474374 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_audit_log_user',
            columnNames: ['user_id'],
            referencedColumnNames: ['user_id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'audit_log',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'user_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'user_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'request_url',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'method',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'object',
                        type: 'TEXT',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'log_type',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'description',
                        type: 'TEXT',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'params',
                        type: 'TEXT',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'browser_info',
                        type: 'TEXT',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'modified_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'created_by',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_by',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('audit_log');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const tables = yield queryRunner.getTable('audit_log');
            const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(tables, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('audit_log', true);
        });
    }
}
exports.CreateAuditLogTable1620823474374 = CreateAuditLogTable1620823474374;
//# sourceMappingURL=1620823474374-CreateAuditLogTable.js.map