"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProduct1603107735535 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInProduct1603107735535 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product', 'is_simplified');
            if (!ifExist) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'is_simplified',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('product', 'is_simplified');
        });
    }
}
exports.AddColumnInProduct1603107735535 = AddColumnInProduct1603107735535;
//# sourceMappingURL=1603107735535-AddColumnInProduct.js.map