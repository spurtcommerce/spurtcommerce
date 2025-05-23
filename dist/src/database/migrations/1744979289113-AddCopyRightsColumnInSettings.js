"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCopyRightsColumnInSettings1744979289113 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddCopyRightsColumnInSettings1744979289113 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isCopyRightsColumnExist = yield queryRunner.hasColumn('settings', 'copyrights');
            if (!isCopyRightsColumnExist) {
                yield queryRunner.addColumn('settings', new typeorm_1.TableColumn({
                    name: 'copyrights',
                    type: 'text',
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
exports.AddCopyRightsColumnInSettings1744979289113 = AddCopyRightsColumnInSettings1744979289113;
//# sourceMappingURL=1744979289113-AddCopyRightsColumnInSettings.js.map