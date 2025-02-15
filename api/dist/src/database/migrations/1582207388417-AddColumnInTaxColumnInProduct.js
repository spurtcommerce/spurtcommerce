"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInTaxColumnInProduct1582207388417 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInTaxColumnInProduct1582207388417 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExistt = yield queryRunner.hasColumn('product', 'tax_type');
            if (!ifExistt) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'tax_type',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
            const ifExisttt = yield queryRunner.hasColumn('product', 'tax_value');
            if (!ifExisttt) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'tax_value',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('product', 'tax_type');
            yield queryRunner.dropColumn('product', 'tax_value');
        });
    }
}
exports.AddColumnInTaxColumnInProduct1582207388417 = AddColumnInTaxColumnInProduct1582207388417;
//# sourceMappingURL=1582207388417-AddColumnInTaxColumnInProduct.js.map