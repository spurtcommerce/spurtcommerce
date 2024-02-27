"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerGroupTable1546523201059 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCustomerGroupTable1546523201059 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'customer_group',
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
                        name: 'name',
                        type: 'varchar',
                        length: '512',
                        isPrimary: false,
                        isNullable: false,
                    }, {
                        name: 'description',
                        type: 'varchar',
                        length: '512',
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
                        type: 'int',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_by',
                        type: 'int',
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
            const ifExsist = yield queryRunner.hasTable('customer_group');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('customer_group');
        });
    }
}
exports.CreateCustomerGroupTable1546523201059 = CreateCustomerGroupTable1546523201059;
//# sourceMappingURL=1546523201059-CreateCustomerGroupTable.js.map