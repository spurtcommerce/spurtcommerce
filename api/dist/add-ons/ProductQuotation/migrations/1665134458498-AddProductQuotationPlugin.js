"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductQuotationPlugin1665134458498 = void 0;
const tslib_1 = require("tslib");
const moment = require("moment/moment");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddProductQuotationPlugin1665134458498 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'ProductQuotation',
                    slugName: 'product-quotation',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginTimestamp: 1665134458498,
                    displayName: 'Product Quotation',
                    pluginType: 'Sales',
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/quotation~, ~/api/quotation/detail~, ~/api/admin-quotation~, ~/api/vendor-quotation~, ~/api/vendor-quotation/detail/~, ~/api/vendor-quotation/update/~',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeormLoader_1.getDataSource)().getRepository('Plugins').save(SeoSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddProductQuotationPlugin1665134458498 = AddProductQuotationPlugin1665134458498;
//# sourceMappingURL=1665134458498-AddProductQuotationPlugin.js.map