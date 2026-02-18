"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVendorCustomerGroupPriceTable1715689892997 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateVendorCustomerGroupPriceTable1715689892997 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_vendor_cus_group_price_vendor_price_group_price_group_idx',
            columnNames: ['price_group_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'vendor_price_group',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_vendor_cus_group_price_cus_group_cus_group_idx',
            columnNames: ['customer_group_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customer_group',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'vendor_customer_group_price',
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
                        name: 'price_group_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'customer_group_id',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_delete',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'created_by',
                        type: 'INT',
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
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifTable = yield queryRunner.hasTable('vendor_customer_group_price');
            if (!ifTable) {
                yield queryRunner.createTable(table);
            }
            const getTable = yield queryRunner.getTable('vendor_customer_group_price');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('price_group_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey);
            }
            const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('customer_group_id') !== -1);
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
exports.CreateVendorCustomerGroupPriceTable1715689892997 = CreateVendorCustomerGroupPriceTable1715689892997;
//# sourceMappingURL=1715689892997-CreateVendorCustomerGroupPriceTable.js.map