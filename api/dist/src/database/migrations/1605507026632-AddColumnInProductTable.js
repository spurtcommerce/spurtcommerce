"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProductTable1605507026632 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInProductTable1605507026632 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product', 'attribute_keyword');
            if (!ifExist) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'attribute_keyword',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExist1 = yield queryRunner.hasColumn('product', 'hsn');
            if (!ifExist1) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'hsn',
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
            yield queryRunner.dropColumn('product', 'attribute_keyword');
            yield queryRunner.dropColumn('product', 'hsn');
        });
    }
}
exports.AddColumnInProductTable1605507026632 = AddColumnInProductTable1605507026632;
//# sourceMappingURL=1605507026632-AddColumnInProductTable.js.map