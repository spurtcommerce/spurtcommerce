"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeProductSpecialColumnChanges1720096496973 = void 0;
const tslib_1 = require("tslib");
class ChangeProductSpecialColumnChanges1720096496973 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE product_special CHANGE customer_group_id customer_group_id INT NULL DEFAULT NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.ChangeProductSpecialColumnChanges1720096496973 = ChangeProductSpecialColumnChanges1720096496973;
//# sourceMappingURL=1720096496973-ChangeProductSpecialColumnChanges.js.map