"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSettlementItemTable1604489717068 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateSettlementItemTable1604489717068 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_settlement_constraint_tbl_settlement_item',
            columnNames: ['settlement_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'settlement',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'settlement_item',
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
                        name: 'vendor_order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'vendor_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'company_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'settlement_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'order_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'order_product_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'order_product_prefix_id',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'total',
                        type: 'DECIMAL',
                        length: '10,2',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'commission',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'commission_amount',
                        type: 'DECIMAL',
                        length: '10,2',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'net_amount',
                        type: 'DECIMAL',
                        length: '10,2',
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
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('settlement_item');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
            const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('settlement_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('settlement_item', true);
        });
    }
}
exports.CreateSettlementItemTable1604489717068 = CreateSettlementItemTable1604489717068;
//# sourceMappingURL=1604489717068-CreateSettlementItemTable.js.map