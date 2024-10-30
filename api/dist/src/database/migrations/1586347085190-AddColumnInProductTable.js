"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProductTable1586347085190 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInProductTable1586347085190 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExistt = yield queryRunner.hasColumn('product', 'height');
            if (!ifExistt) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'height',
                    type: 'DECIMAL',
                    length: '15,2',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('product', 'weight');
            if (!ifExist1) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'weight',
                    type: 'DECIMAL',
                    length: '15,2',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist2 = yield queryRunner.hasColumn('product', 'length');
            if (!ifExist2) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'length',
                    type: 'DECIMAL',
                    length: '15,2',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist3 = yield queryRunner.hasColumn('product', 'width');
            if (!ifExist3) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'width',
                    type: 'DECIMAL',
                    length: '15,2',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('product', 'height');
            yield queryRunner.dropColumn('product', 'weight');
            yield queryRunner.dropColumn('product', 'length');
            yield queryRunner.dropColumn('product', 'width');
        });
    }
}
exports.AddColumnInProductTable1586347085190 = AddColumnInProductTable1586347085190;
//# sourceMappingURL=1586347085190-AddColumnInProductTable.js.map