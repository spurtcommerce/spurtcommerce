"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterColumnInVendor1605690489407 = void 0;
const tslib_1 = require("tslib");
class AlterColumnInVendor1605690489407 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `vendor` CHANGE `company_description` `company_description` Text DEFAULT NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `vendor` CHANGE `company_description` `company_description` Text DEFAULT NULL');
        });
    }
}
exports.AlterColumnInVendor1605690489407 = AlterColumnInVendor1605690489407;
//# sourceMappingURL=1605690489407-AlterColumnInVendor.js.map