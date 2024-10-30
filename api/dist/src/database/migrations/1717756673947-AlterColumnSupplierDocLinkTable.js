"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnSupplierDocLinkTable1717756673947 = void 0;
const tslib_1 = require("tslib");
class AlterColumnSupplierDocLinkTable1717756673947 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.hasColumn('supplier_link_doc', 'is_approved');
            if (exist) {
                yield queryRunner.query('UPDATE `supplier_link_doc` SET `is_approved` = 0 WHERE `is_approved` IS NULL');
                yield queryRunner.query('ALTER TABLE `supplier_link_doc` MODIFY `is_approved` tinyint DEFAULT 0 NOT NULL');
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterColumnSupplierDocLinkTable1717756673947 = AlterColumnSupplierDocLinkTable1717756673947;
//# sourceMappingURL=1717756673947-AlterColumnSupplierDocLinkTable.js.map