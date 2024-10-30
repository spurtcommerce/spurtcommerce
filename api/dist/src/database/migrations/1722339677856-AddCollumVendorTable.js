"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCollumVendorTable1722339677856 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddCollumVendorTable1722339677856 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findColumn = yield queryRunner.hasColumn('vendor', 'personalized_settings');
            if (!findColumn) {
                yield queryRunner.addColumn('vendor', new typeorm_1.TableColumn({
                    name: 'personalized_settings',
                    type: 'json',
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
exports.AddCollumVendorTable1722339677856 = AddCollumVendorTable1722339677856;
//# sourceMappingURL=1722339677856-AddCollumVendorTable.js.map