"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderTotalTable1546581429998 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateOrderTotalTable1546581429998 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'order_total',
                columns: [
                    {
                        name: 'order_total_id',
                        type: 'integer',
                        length: '11',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isNullable: false,
                    }, {
                        name: 'order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'code',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'title',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'text',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'value',
                        type: 'DECIMAL(15,4)',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'sort_order',
                        type: 'integer',
                        length: '3',
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
            const ifExsist = yield queryRunner.hasTable('order_total');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('order_total', true);
        });
    }
}
exports.CreateOrderTotalTable1546581429998 = CreateOrderTotalTable1546581429998;
//# sourceMappingURL=1546581429998-CreateOrderTotalTable.js.map