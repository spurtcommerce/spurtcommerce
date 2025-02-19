"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColunmVvendorMediaTable1718089044993 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColunmVvendorMediaTable1718089044993 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('vendor_media', 'url');
            if (!columnExist) {
                yield queryRunner.addColumn('vendor_media', new typeorm_1.TableColumn({
                    name: 'url',
                    type: 'varchar',
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
exports.AddColunmVvendorMediaTable1718089044993 = AddColunmVvendorMediaTable1718089044993;
//# sourceMappingURL=1718089044993-AddColunmVvendorMediaTable.js.map