"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableCustomerToGroup1715666127193 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTableCustomerToGroup1715666127193 {
    constructor() {
        this.tableForeignKey1 = new typeorm_1.TableForeignKey({
            name: 'fk_customer_to_group_customer_group__id',
            columnNames: ['customer_group_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customer_group',
            onDelete: 'CASCADE',
        });
        this.tableForeignKey2 = new typeorm_1.TableForeignKey({
            name: 'fk_customer_to_group_customer__id',
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customer',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'customer_to_group',
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
                        name: 'customer_group_id',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'customer_id',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            yield queryRunner.createTable(table, true);
            const getTable = yield queryRunner.getTable('customer_to_group');
            const ifDataExsist1 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
            if (!ifDataExsist1) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey2);
            }
            const ifDataExsist2 = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('customer_group_id') !== -1);
            if (!ifDataExsist2) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey1);
            }
            // }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateTableCustomerToGroup1715666127193 = CreateTableCustomerToGroup1715666127193;
//# sourceMappingURL=1715666127193-CreateTableCustomerToGroup.js.map