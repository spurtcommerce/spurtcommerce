"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryCommissionTable1571749863667 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCategoryCommissionTable1571749863667 {
    constructor() {
        this.CategoryCommissionToCategoryForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_category_commission_tbl_category_foreignKey',
            columnNames: ['category_id'],
            referencedColumnNames: ['category_id'],
            referencedTableName: 'category',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'category_commission',
                columns: [
                    {
                        name: 'category_commission_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'category_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'category_commission_value',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('category_commission');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('category_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.CategoryCommissionToCategoryForeignKeys);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('category_commission', true);
        });
    }
}
exports.CreateCategoryCommissionTable1571749863667 = CreateCategoryCommissionTable1571749863667;
//# sourceMappingURL=1571749863667-CreateCategoryCommissionTable.js.map