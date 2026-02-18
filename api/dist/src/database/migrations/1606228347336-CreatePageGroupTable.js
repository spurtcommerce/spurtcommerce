"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePageGroupTable1606228347336 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreatePageGroupTable1606228347336 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_page_related_tbl_page_group_foreignKey',
            columnNames: ['page_group_id'],
            referencedColumnNames: ['group_id'],
            referencedTableName: 'page_group',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'page_group',
                columns: [
                    {
                        name: 'group_id',
                        type: 'int',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'group_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'is_active',
                        type: 'int',
                        length: '11',
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
            const ifExsist = yield queryRunner.hasTable('page_group');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const tables = yield queryRunner.getTable('page');
            const ifDataExsist1 = tables.foreignKeys.find(fk => fk.columnNames.indexOf('page_group_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(tables, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('page_group', true);
        });
    }
}
exports.CreatePageGroupTable1606228347336 = CreatePageGroupTable1606228347336;
//# sourceMappingURL=1606228347336-CreatePageGroupTable.js.map