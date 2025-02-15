"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateActivityTable1571736086250 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateActivityTable1571736086250 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'activity',
                columns: [
                    {
                        name: 'activity_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'activity_name',
                        type: 'varchar',
                        length: '64',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'is_active',
                        type: 'integer',
                        length: '64',
                        isPrimary: false,
                        isNullable: true,
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('activity');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('activity', true);
        });
    }
}
exports.CreateActivityTable1571736086250 = CreateActivityTable1571736086250;
//# sourceMappingURL=1571736086250-CreateActivityTable.js.map