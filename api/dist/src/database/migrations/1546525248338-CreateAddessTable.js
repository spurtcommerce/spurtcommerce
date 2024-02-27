"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAddessTable1546525248338 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateAddessTable1546525248338 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'address',
                columns: [
                    {
                        name: 'address_id',
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
                        isNullable: false,
                    }, {
                        name: 'first_name',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'last_name',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'company',
                        type: 'varchar',
                        length: '32',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'password',
                        type: 'varchar',
                        length: '512',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'address_1',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'address_2',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'postcode',
                        type: 'varchar',
                        length: '10',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'zone_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'city',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'state',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'address_type',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'country_id',
                        type: 'integer',
                        length: '11',
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
            const ifExsist = yield queryRunner.hasTable('address');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('address', true);
        });
    }
}
exports.CreateAddessTable1546525248338 = CreateAddessTable1546525248338;
//# sourceMappingURL=1546525248338-CreateAddessTable.js.map