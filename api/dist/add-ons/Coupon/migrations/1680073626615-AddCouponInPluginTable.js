"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCouponInPluginTable1680073626615 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddCouponInPluginTable1680073626615 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'Coupon',
                    slugName: 'coupon',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginType: 'Marketplace',
                    pluginStatus: 1,
                    pluginTimestamp: 1680073626615,
                    displayName: 'Coupon',
                    isEditable: 0,
                    routes: '~/api/admin-coupon/add-coupon~,~/api/admin-coupon/admin-coupon-list~,~/api/admin-coupon/coupon-usage-list~,~/api/admin-coupon/coupon-detail~,~/api/admin-coupon/update-coupon/~,~/api/admin-coupon/delete-coupon/~,~/api/admin-coupon/delete-bulk-coupon~,~/api/admin-coupon/bulk-export-admin-coupon-list~,~/api/admin-coupon/export-excel-admin-coupon-list~,~/api/admin-coupon/remove-coupon~,~/api/vendor-coupon/add-coupon~,~/api/vendor-coupon/vendor-coupon-list~,~/api/vendor-coupon/coupon-usage-list~,~/api/vendor-coupon/vendor-coupon-detail~,~/api/vendor-coupon/update-vendor-coupon/~,~/api/vendor-coupon/delete-vendor-coupon/~,~/api/customer-coupon/apply-coupon~',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeormLoader_1.getDataSource)().getRepository('Plugins').save(SeoSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddCouponInPluginTable1680073626615 = AddCouponInPluginTable1680073626615;
//# sourceMappingURL=1680073626615-AddCouponInPluginTable.js.map