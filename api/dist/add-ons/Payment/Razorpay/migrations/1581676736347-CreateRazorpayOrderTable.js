"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRazorpayOrderTable1581676736347 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateRazorpayOrderTable1581676736347 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_razorpayOrder_tbl_order_foreignKey',
            columnNames: ['order_id'],
            referencedColumnNames: ['order_id'],
            referencedTableName: 'order',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'razorpay_order',
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
                        name: 'order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'razorpay_reference_id',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'total',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'status',
                        type: 'integer',
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
                        name: 'created_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('razorpay_order');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('razorpay_order');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('razorpay_order', true);
        });
    }
}
exports.CreateRazorpayOrderTable1581676736347 = CreateRazorpayOrderTable1581676736347;
//# sourceMappingURL=1581676736347-CreateRazorpayOrderTable.js.map