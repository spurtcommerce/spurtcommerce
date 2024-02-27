"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInSettings1666440763235 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInSettings1666440763235 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('settings', 'addons');
            if (!ifExist) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'addons',
                    type: 'TEXT',
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
exports.AddColumnInSettings1666440763235 = AddColumnInSettings1666440763235;
//# sourceMappingURL=1666440763235-AddColumnInSettings.js.map