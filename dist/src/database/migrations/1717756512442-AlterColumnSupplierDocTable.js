"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnSupplierDocTable1717756512442 = void 0;
const tslib_1 = require("tslib");
class AlterColumnSupplierDocTable1717756512442 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.hasColumn('supplier_link_doc', 'is_active');
            if (exist) {
                yield queryRunner.query('UPDATE `supplier_link_doc` SET `is_active` = 1 WHERE `is_active` IS NULL');
                yield queryRunner.query('ALTER TABLE `supplier_link_doc` MODIFY `is_active` tinyint DEFAULT 1 NOT NULL');
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterColumnSupplierDocTable1717756512442 = AlterColumnSupplierDocTable1717756512442;
//# sourceMappingURL=1717756512442-AlterColumnSupplierDocTable.js.map