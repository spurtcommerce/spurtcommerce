"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnSupplierLinkDoc1717672050965 = void 0;
const tslib_1 = require("tslib");
class AlterColumnSupplierLinkDoc1717672050965 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('supplier_link_doc', 'document_id');
            if (columnExist) {
                yield queryRunner.query(`ALTER TABLE supplier_link_doc MODIFY document_id INT NULL;`);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterColumnSupplierLinkDoc1717672050965 = AlterColumnSupplierLinkDoc1717672050965;
//# sourceMappingURL=1717672050965-AlterColumnSupplierLinkDoc.js.map