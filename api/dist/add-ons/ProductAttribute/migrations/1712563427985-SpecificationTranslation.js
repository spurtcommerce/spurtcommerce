"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationTranslation1712563427985 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class SpecificationTranslation1712563427985 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_specification_translation_specification_specification_id_idx',
            columnNames: ['specification_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'specification',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_specification_translation_language_language_id_idx',
            columnNames: ['language_id'],
            referencedColumnNames: ['language_id'],
            referencedTableName: 'language',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'specification_translation',
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
                        name: 'specification_id',
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
                        name: 'name',
                        type: 'varchar',
                        length: '255',
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
            const ifTable = yield queryRunner.hasTable('specification_translation');
            if (!ifTable) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('specification_translation');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('specification_id') !== -1);
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
exports.SpecificationTranslation1712563427985 = SpecificationTranslation1712563427985;
//# sourceMappingURL=1712563427985-SpecificationTranslation.js.map