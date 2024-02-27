"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnPluginTimestampInPlugin1546513939917 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnPluginTimestampInPlugin1546513939917 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('plugins', 'plugin_timestamp');
            if (!ifExist) {
                yield queryRunner.addColumn('plugins', new typeorm_1.TableColumn({
                    name: 'plugin_timestamp',
                    type: 'bigint',
                    isPrimary: false,
                    isNullable: true,
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
exports.AddColumnPluginTimestampInPlugin1546513939917 = AddColumnPluginTimestampInPlugin1546513939917;
//# sourceMappingURL=1546513939917-AddColumnPluginTimestampInPlugin.js.map