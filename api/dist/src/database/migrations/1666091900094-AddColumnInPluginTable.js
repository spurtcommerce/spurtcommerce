"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInPluginTable1666091900094 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInPluginTable1666091900094 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('plugins', 'is_editable');
            if (!ifExist) {
                yield queryRunner.addColumn('plugins', new typeorm_1.TableColumn({
                    name: 'is_editable',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
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
exports.AddColumnInPluginTable1666091900094 = AddColumnInPluginTable1666091900094;
//# sourceMappingURL=1666091900094-AddColumnInPluginTable.js.map