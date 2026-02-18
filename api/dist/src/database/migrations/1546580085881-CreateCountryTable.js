"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCountryTable1546580085881 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCountryTable1546580085881 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'country',
                columns: [
                    {
                        name: 'country_id',
                        type: 'int',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'name',
                        type: 'varchar',
                        length: '128',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'iso_code_2',
                        type: 'varchar',
                        length: '2',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'iso_code_3',
                        type: 'varchar',
                        length: '3',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'address_format',
                        type: 'text',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'postcode_required',
                        type: 'tinyint',
                        length: '1',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'is_active',
                        type: 'int',
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
                        name: 'modified_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'created_by',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_by',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('country');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('country', true);
        });
    }
}
exports.CreateCountryTable1546580085881 = CreateCountryTable1546580085881;
//# sourceMappingURL=1546580085881-CreateCountryTable.js.map