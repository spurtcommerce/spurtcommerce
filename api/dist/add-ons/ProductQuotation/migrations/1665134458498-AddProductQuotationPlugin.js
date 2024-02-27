"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductQuotationPlugin1665134458498 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
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
                    pluginType: 'Sales',
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/admin-quotation~,~/api/quotation~,~/api/vendor-quotation~,~/api/admin-quotation/product-list~,~/api/admin-quotation/update-quotation-available/~,~/api/admin-quotation/quotation-request-detail/~,~/api/quotation/quotation-request~,~/api/quotation/quotation-request-list~,~/api/vendor-quotation/vendor-products-list~,~/api/vendor-quotation/vendor-product/update-quotation-available/~,~/api/vendor-quotation/vendor-quotation-request-detail/~',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('Plugins').save(SeoSeed);
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