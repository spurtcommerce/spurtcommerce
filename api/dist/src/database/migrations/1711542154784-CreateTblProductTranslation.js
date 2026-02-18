"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTblProductTranslation1711542154784 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTblProductTranslation1711542154784 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_product_translation_product_product_id',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey2 = new typeorm_1.TableForeignKey({
            name: 'fk_product_translation_language_language_id',
            columnNames: ['language_id'],
            referencedColumnNames: ['language_id'],
            referencedTableName: 'language',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'product_translation',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'product_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'language_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'name',
                        type: 'varchar',
                        length: '512',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'description',
                        type: 'text',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'meta_info',
                        type: 'varchar',
                        length: '512',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_by',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_by',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('product_translation');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const productTable = yield queryRunner.getTable('product_translation');
            const ifDataExsist1 = productTable.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(productTable, this.tableForeignKey1);
            }
            const ifDataExsist2 = productTable.foreignKeys.find(fk => fk.columnNames.indexOf('language_id') !== -1);
            if (!ifDataExsist2) {
                yield queryRunner.createForeignKey(productTable, this.tableForeignKey2);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateTblProductTranslation1711542154784 = CreateTblProductTranslation1711542154784;
//# sourceMappingURL=1711542154784-CreateTblProductTranslation.js.map