"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInCategory1642745785011 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInCategory1642745785011 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('category', 'category_description');
            if (!ifExist) {
                yield queryRunner.addColumn('category', new typeorm_1.TableColumn({
                    name: 'category_description',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('category', 'category_descrpition');
        });
    }
}
exports.AddColumnInCategory1642745785011 = AddColumnInCategory1642745785011;
//# sourceMappingURL=1642745785011-AddColumnInCategory.js.map