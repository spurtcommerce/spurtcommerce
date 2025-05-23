"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCollumnCategoryTable1747824069232 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddCollumnCategoryTable1747824069232 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('category', 'family_id');
            if (!columnExist) {
                yield queryRunner.addColumn('category', new typeorm_1.TableColumn({
                    name: 'family_id',
                    type: 'int',
                    default: 0,
                    isPrimary: false,
                    isNullable: false,
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
exports.AddCollumnCategoryTable1747824069232 = AddCollumnCategoryTable1747824069232;
//# sourceMappingURL=1747824069232-AddCollumnCategoryTable.js.map