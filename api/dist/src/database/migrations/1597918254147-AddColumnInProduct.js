"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInProduct1597918254147 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInProduct1597918254147 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('product', 'pincode_based_delivery');
            if (!ifExist) {
                yield queryRunner.addColumn('product', new typeorm_1.TableColumn({
                    name: 'pincode_based_delivery',
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
            yield queryRunner.dropColumn('product', 'pincode_base_delivery');
        });
    }
}
exports.AddColumnInProduct1597918254147 = AddColumnInProduct1597918254147;
//# sourceMappingURL=1597918254147-AddColumnInProduct.js.map