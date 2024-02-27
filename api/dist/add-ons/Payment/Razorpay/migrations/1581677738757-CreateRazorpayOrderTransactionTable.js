"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRazorpayOrderTransactionTable1581677738757 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateRazorpayOrderTransactionTable1581677738757 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_razorpayOrderTransaction_tbl_razorpayOrder_foreignKey',
            columnNames: ['razorpay_order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'razorpay_order',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'razorpay_order_transaction',
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
                        name: 'razorpay_order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_type',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_data',
                        type: 'text',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'payment_status',
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
            const ifExsist = yield queryRunner.hasTable('razorpay_order_transaction');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('razorpay_order_transaction');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('razorpay_order_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('razorpay_order_transaction', true);
        });
    }
}
exports.CreateRazorpayOrderTransactionTable1581677738757 = CreateRazorpayOrderTransactionTable1581677738757;
//# sourceMappingURL=1581677738757-CreateRazorpayOrderTransactionTable.js.map