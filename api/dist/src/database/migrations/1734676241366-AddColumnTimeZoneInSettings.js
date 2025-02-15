"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnTimeZoneInSettings1734676241366 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnTimeZoneInSettings1734676241366 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('settings', 'time_zone');
            if (!ifExist) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'time_zone',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                    collation: 'utf8mb4_unicode_ci',
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddColumnTimeZoneInSettings1734676241366 = AddColumnTimeZoneInSettings1734676241366;
//# sourceMappingURL=1734676241366-AddColumnTimeZoneInSettings.js.map