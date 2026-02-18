"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVariantTranslationTable1712382292716 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateVariantTranslationTable1712382292716 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_variant_translation_variant_variant_id',
            columnNames: ['variant_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'variant',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey2 = new typeorm_1.TableForeignKey({
            name: 'fk_variant_translation_language_language_id',
            columnNames: ['language_id'],
            referencedColumnNames: ['language_id'],
            referencedTableName: 'language',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey3 = new typeorm_1.TableForeignKey({
            name: 'fk_variant_value_translation_variant_value_variant_value_id',
            columnNames: ['variant_value_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'variant_value',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey4 = new typeorm_1.TableForeignKey({
            name: 'fk_variant_value_translation_language_language_id',
            columnNames: ['language_id'],
            referencedColumnNames: ['language_id'],
            referencedTableName: 'language',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'variant_translation',
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
                        name: 'name',
                        type: 'VARCHAR',
                        length: '255',
                        isPrimary: false,
                    },
                    {
                        name: 'language_id',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'variant_id',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'TINYINT',
                        isPrimary: false,
                        default: 1,
                    },
                    {
                        name: 'is_delete',
                        type: 'TINYINT',
                        isPrimary: false,
                        default: 0,
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
                    {
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'modified_by',
                        type: 'INT',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifTable = yield queryRunner.hasTable('variant_translation');
            if (!ifTable) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('variant_translation');
            const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('variant_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey1);
            }
            const ifDataExsist2 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('language_id') !== -1);
            if (!ifDataExsist2) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey2);
            }
            const table2 = new typeorm_1.Table({
                name: 'variant_value_translation',
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
                        name: 'value',
                        type: 'VARCHAR',
                        length: '255',
                        isPrimary: false,
                    },
                    {
                        name: 'language_id',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'variant_value_id',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'TINYINT',
                        isPrimary: false,
                        default: 1,
                    },
                    {
                        name: 'is_delete',
                        type: 'TINYINT',
                        isPrimary: false,
                        default: 0,
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
                    {
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'modified_by',
                        type: 'INT',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifTable2 = yield queryRunner.hasTable('variant_value_translation');
            if (!ifTable2) {
                yield queryRunner.createTable(table2);
            }
            const getTable2 = yield queryRunner.getTable('variant_value_translation');
            const ifDataExsist3 = getTable2.foreignKeys.find(fk => fk.columnNames.indexOf('variant_value_id') !== -1);
            if (!ifDataExsist3) {
                yield queryRunner.createForeignKey(getTable2, this.tableForeignKey3);
            }
            const ifDataExsist4 = getTable2.foreignKeys.find(fk => fk.columnNames.indexOf('language_id') !== -1);
            if (!ifDataExsist4) {
                yield queryRunner.createForeignKey(getTable2, this.tableForeignKey4);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateVariantTranslationTable1712382292716 = CreateVariantTranslationTable1712382292716;
//# sourceMappingURL=1712382292716-CreateVariantTranslationTable.js.map