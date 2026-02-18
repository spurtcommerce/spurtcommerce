"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVendorPriceGroupPLugin1715921959805 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddVendorPriceGroupPLugin1715921959805 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'ProductPriceGroup',
                    slugName: 'product-price-group',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginType: 'Catalog',
                    pluginTimestamp: 1715921959805,
                    displayName: 'personalized pricing',
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/vendor-price-group~,~/api/vendor-price-group/~,~/api/vendor-price-group/status/~,~/api/vendor-customer-group~,~/api/vendor-customer-group/~',
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
exports.AddVendorPriceGroupPLugin1715921959805 = AddVendorPriceGroupPLugin1715921959805;
//# sourceMappingURL=1715921959805-AddVendorPriceGroupPLugin.js.map