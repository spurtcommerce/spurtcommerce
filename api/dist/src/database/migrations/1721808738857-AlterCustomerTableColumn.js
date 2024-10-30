"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterCustomerTableColumn1721808738857 = void 0;
const tslib_1 = require("tslib");
class AlterCustomerTableColumn1721808738857 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.hasColumn('customer', 'pincode');
            if (exist) {
                yield queryRunner.query('ALTER TABLE `customer` CHANGE `pincode` `pincode` VARCHAR(10)');
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterCustomerTableColumn1721808738857 = AlterCustomerTableColumn1721808738857;
//# sourceMappingURL=1721808738857-AlterCustomerTableColumn.js.map