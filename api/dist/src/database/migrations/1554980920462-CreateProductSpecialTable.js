"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductSpecialTable1554980920462 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateProductSpecialTable1554980920462 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_product_special_product',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'product_special',
                columns: [
                    {
                        name: 'product_special_id',
                        type: 'integer',
                        length: '11',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isNullable: false,
                    }, {
                        name: 'product_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    },
                    {
                        name: 'customer_group_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'priority',
                        type: 'integer',
                        length: '5',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'price',
                        type: 'DECIMAL(15,4)',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'date_start',
                        type: 'DATE',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'date_end',
                        type: 'DATE',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'is_active',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
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
            const ifExsist = yield queryRunner.hasTable('product_special');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
                const getTable = yield queryRunner.getTable('product_special');
                const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
                if (!ifDataExsist) {
                    yield queryRunner.createForeignKey(getTable, this.tableForeignKey);
                }
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('product_special');
            const getTable = yield queryRunner.getTable('product_special');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(getTable, this.tableForeignKey);
            }
        });
    }
}
exports.CreateProductSpecialTable1554980920462 = CreateProductSpecialTable1554980920462;
//# sourceMappingURL=1554980920462-CreateProductSpecialTable.js.map