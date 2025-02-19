"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProduct1594112639974 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInProduct1594112639974 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('vendor_product', 'quotation_available');
            if (!ifExist) {
                yield queryRunner.addColumn('vendor_product', new typeorm_1.TableColumn({
                    name: 'quotation_available',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 0,
                }));
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('vendor_product', 'quotation_available');
        });
    }
}
exports.AddColumnInProduct1594112639974 = AddColumnInProduct1594112639974;
//# sourceMappingURL=1594112639974-AddColumnInProduct.js.map