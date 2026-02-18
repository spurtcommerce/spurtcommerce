"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnSupplierTable1717672342264 = void 0;
const tslib_1 = require("tslib");
class AlterColumnSupplierTable1717672342264 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.hasColumn('supplier', 'tax_id');
            if (exist) {
                yield queryRunner.query(`ALTER TABLE supplier MODIFY tax_id varchar(30)`);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterColumnSupplierTable1717672342264 = AlterColumnSupplierTable1717672342264;
//# sourceMappingURL=1717672342264-AlterColumnSupplierTable.js.map