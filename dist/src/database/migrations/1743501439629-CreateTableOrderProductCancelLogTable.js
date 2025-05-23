"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableOrderProductCancelLogTable1743501439629 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTableOrderProductCancelLogTable1743501439629 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_order_product_cancel_log_order_product_order_product_id',
            columnNames: ['order_product_id'],
            referencedColumnNames: ['order_product_id'],
            referencedTableName: 'order_product',
            onDelete: 'RESTRICT',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableExist = yield queryRunner.hasTable('order_product_cancel_log');
            if (!tableExist) {
                const table = new typeorm_1.Table({
                    name: 'order_product_cancel_log',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'order_product_id',
                            type: 'int',
                            isNullable: false,
                        },
                        {
                            name: 'status',
                            type: 'enum',
                            enum: ['approve', 'reject', 'pending'],
                            isNullable: false,
                        },
                        {
                            name: 'comments',
                            type: 'varchar',
                            isNullable: true,
                        },
                        {
                            name: 'created_date',
                            type: 'timestamp',
                            isNullable: true,
                        },
                        {
                            name: 'modified_date',
                            type: 'timestamp',
                            isNullable: true,
                        },
                        {
                            name: 'created_by',
                            type: 'int',
                            isNullable: true,
                        },
                        {
                            name: 'modified_by',
                            type: 'int',
                            isNullable: true,
                        },
                    ],
                });
                yield queryRunner.createTable(table);
                const getTable = yield queryRunner.getTable('order_product_cancel_log');
                const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
                if (!ifDataExsist) {
                    yield queryRunner.createForeignKey(table, this.tableForeignKey);
                }
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateTableOrderProductCancelLogTable1743501439629 = CreateTableOrderProductCancelLogTable1743501439629;
//# sourceMappingURL=1743501439629-CreateTableOrderProductCancelLogTable.js.map