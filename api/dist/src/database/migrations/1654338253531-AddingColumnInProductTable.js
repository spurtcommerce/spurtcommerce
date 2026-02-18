"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddingColumnInProductTable1654338253531 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddingColumnInProductTable1654338253531 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product', 'setted_as_common_on');
            if (!ifExist) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'setted_as_common_on',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'NULL',
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('product', 'setted_as_common_on');
        });
    }
}
exports.AddingColumnInProductTable1654338253531 = AddingColumnInProductTable1654338253531;
//# sourceMappingURL=1654338253531-AddingColumnInProductTable.js.map