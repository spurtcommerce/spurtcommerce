"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTranslation1711609364591 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CategoryTranslation1711609364591 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_category_translation_category_category_id_idx',
            columnNames: ['category_id'],
            referencedColumnNames: ['category_id'],
            referencedTableName: 'category',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_category_translation_language_language_id_idx',
            columnNames: ['language_id'],
            referencedColumnNames: ['language_id'],
            referencedTableName: 'language',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'category_translation',
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
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'description',
                        type: 'text',
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
                        name: 'category_id',
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
                        name: 'modified_date',
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
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifTable = yield queryRunner.hasTable('category_translation');
            if (!ifTable) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('category_translation');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
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
exports.CategoryTranslation1711609364591 = CategoryTranslation1711609364591;
//# sourceMappingURL=1711609364591-CategoryTranslation.js.map