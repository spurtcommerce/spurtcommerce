"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerTransactionTable1546527306595 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCustomerTransactionTable1546527306595 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'customer_transaction',
                columns: [
                    {
                        name: 'customer_transaction_id',
                        type: 'integer',
                        length: '11',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isNullable: false,
                    }, {
                        name: 'customer_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'description',
                        type: 'TEXT',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'amount',
                        type: 'DECIMAL(15,4)',
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
            const ifExsist = yield queryRunner.hasTable('customer_transaction');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('customer_transaction', true);
        });
    }
}
exports.CreateCustomerTransactionTable1546527306595 = CreateCustomerTransactionTable1546527306595;
//# sourceMappingURL=1546527306595-CreateCustomerTransactionTable.js.map