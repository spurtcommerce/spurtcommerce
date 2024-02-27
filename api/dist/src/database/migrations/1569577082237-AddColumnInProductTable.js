"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProductTable1569577082237 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInProductTable1569577082237 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product', 'keywords');
            if (!ifExist) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'keywords',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('product', 'keywords');
        });
    }
}
exports.AddColumnInProductTable1569577082237 = AddColumnInProductTable1569577082237;
//# sourceMappingURL=1569577082237-AddColumnInProductTable.js.map