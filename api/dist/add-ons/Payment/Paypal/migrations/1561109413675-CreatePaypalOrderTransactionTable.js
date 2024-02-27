"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaypalOrderTransactionTable1561109413675 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreatePaypalOrderTransactionTable1561109413675 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'paypal_order_transaction',
                columns: [
                    {
                        name: 'paypal_order_transaction_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'paypal_order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'payment_data',
                        type: 'text',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'payment_type',
                        type: 'char',
                        length: '255',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'payment_status',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
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
            const ifExsist = yield queryRunner.hasTable('paypal_order_transaction');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('paypal_order_transaction', true);
        });
    }
}
exports.CreatePaypalOrderTransactionTable1561109413675 = CreatePaypalOrderTransactionTable1561109413675;
//# sourceMappingURL=1561109413675-CreatePaypalOrderTransactionTable.js.map