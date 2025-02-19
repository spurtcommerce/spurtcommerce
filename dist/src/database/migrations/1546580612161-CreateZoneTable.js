"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateZoneTable1546580612161 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateZoneTable1546580612161 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'zone',
                columns: [
                    {
                        name: 'zone_id',
                        type: 'int',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'country_id',
                        type: 'int',
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
                        name: 'name',
                        type: 'varchar',
                        length: '128',
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
            const ifExsist = yield queryRunner.hasTable('zone');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('zone', true);
        });
    }
}
exports.CreateZoneTable1546580612161 = CreateZoneTable1546580612161;
//# sourceMappingURL=1546580612161-CreateZoneTable.js.map