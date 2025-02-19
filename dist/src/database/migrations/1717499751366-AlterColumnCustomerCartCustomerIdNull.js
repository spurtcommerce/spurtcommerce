"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnCustomerCartCustomerIdNull1717499751366 = void 0;
const tslib_1 = require("tslib");
class AlterColumnCustomerCartCustomerIdNull1717499751366 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('customer_cart', 'customer_id');
            if (columnExist) {
                yield queryRunner.query(`ALTER TABLE customer_cart MODIFY customer_id INT NULL;`);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterColumnCustomerCartCustomerIdNull1717499751366 = AlterColumnCustomerCartCustomerIdNull1717499751366;
//# sourceMappingURL=1717499751366-AlterColumnCustomerCartCustomerIdNull.js.map