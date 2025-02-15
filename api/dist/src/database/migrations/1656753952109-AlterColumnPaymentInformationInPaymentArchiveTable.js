"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnPaymentInformationInPaymentArchiveTable1656753952109 = void 0;
const tslib_1 = require("tslib");
class AlterColumnPaymentInformationInPaymentArchiveTable1656753952109 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `payment_archive` CHANGE `payment_information` `payment_information` TEXT');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `payment_archive` CHANGE `payment_information` `payment_information` TEXT');
        });
    }
}
exports.AlterColumnPaymentInformationInPaymentArchiveTable1656753952109 = AlterColumnPaymentInformationInPaymentArchiveTable1656753952109;
//# sourceMappingURL=1656753952109-AlterColumnPaymentInformationInPaymentArchiveTable.js.map