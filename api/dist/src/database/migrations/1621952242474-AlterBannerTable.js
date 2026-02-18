"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterBannerTable1621952242474 = void 0;
const tslib_1 = require("tslib");
class AlterBannerTable1621952242474 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `banner` CHANGE `banner_group_banner_group_id` `banner_group_banner_group_id` int DEFAULT NULL');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `banner` CHANGE `banner_group_banner_group_id` `banner_group_banner_group_id` int DEFAULT NULL');
        });
    }
}
exports.AlterBannerTable1621952242474 = AlterBannerTable1621952242474;
//# sourceMappingURL=1621952242474-AlterBannerTable.js.map