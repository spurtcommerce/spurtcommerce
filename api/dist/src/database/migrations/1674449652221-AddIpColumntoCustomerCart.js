"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIpColumntoCustomerCart1674449652221 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddIpColumntoCustomerCart1674449652221 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasColumn('customer_cart', 'ip');
            if (!ifExist) {
                yield queryRunner.addColumn('customer_cart', new typeorm_1.TableColumn({
                    name: 'ip',
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
            // --
        });
    }
}
exports.AddIpColumntoCustomerCart1674449652221 = AddIpColumntoCustomerCart1674449652221;
//# sourceMappingURL=1674449652221-AddIpColumntoCustomerCart.js.map