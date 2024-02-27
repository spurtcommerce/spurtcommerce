"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnInCustomerCart1649676398134 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnInCustomerCart1649676398134 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('customer_cart', 'vendor_id');
            if (!ifExist) {
                yield queryRunner.addColumn('customer_cart', new typeorm_1.TableColumn({
                    name: 'vendor_id',
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
            // --
        });
    }
}
exports.AddColumnInCustomerCart1649676398134 = AddColumnInCustomerCart1649676398134;
//# sourceMappingURL=1649676398134-AddColumnInCustomerCart.js.map