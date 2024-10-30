"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageGroupTranslation1712321518092 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class PageGroupTranslation1712321518092 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_page_group_translation_page_group_page_group_id_idx',
            columnNames: ['page_group_id'],
            referencedColumnNames: ['group_id'],
            referencedTableName: 'page_group',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_page_group_translation_language_language_id_idx',
            columnNames: ['language_id'],
            referencedColumnNames: ['language_id'],
            referencedTableName: 'language',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'page_group_translation',
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
                        name: 'group_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'page_group_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'language_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'int  ',
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
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'modified_by',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifTable = yield queryRunner.hasTable('page_group_translation');
            if (!ifTable) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('page_group_translation');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('page_group_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey);
            }
            const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('language_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey1);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.PageGroupTranslation1712321518092 = PageGroupTranslation1712321518092;
//# sourceMappingURL=1712321518092-PageGroupTranslation.js.map