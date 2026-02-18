"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoryTranslation1712143562228 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class BlogCategoryTranslation1712143562228 {
    constructor() {
        this.tableLanguageForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_blog_category_translation_language_language_id_idx',
            columnNames: ['language_id'],
            referencedColumnNames: ['language_id'],
            referencedTableName: 'language',
            onDelete: 'CASCADE',
        });
        this.tableBlogCategoryForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_blog_category_translation_blog_category_blog_category_id_idx',
            columnNames: ['blog_category_id'],
            referencedColumnNames: ['blog_category_id'],
            referencedTableName: 'blog_category',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'blog_category_translation',
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
                        length: '512',
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
                        name: 'blog_category_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'INT',
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
                        name: 'modified_by',
                        type: 'integer',
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
                ],
            });
            const ifTable = yield queryRunner.hasTable('blog_category_translation');
            if (!ifTable) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('blog_category_translation');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('language_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(getTable, this.tableLanguageForeignKey);
            }
            const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('blog_category_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(getTable, this.tableBlogCategoryForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.BlogCategoryTranslation1712143562228 = BlogCategoryTranslation1712143562228;
//# sourceMappingURL=1712143562228-BlogCategoryTranslation.js.map