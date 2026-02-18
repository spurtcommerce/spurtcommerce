"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginSeedForQuotation1716458523533 = void 0;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddPluginSeedForQuotation1716458523533 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findQuotationPlugins = yield (0, typeormLoader_1.getDataSource)().getRepository('Plugins').findOne({
                where: {
                    slugName: 'product-quotation',
                },
            });
            if (findQuotationPlugins) {
                findQuotationPlugins.routes = '~/api/quotation~, ~/api/quotation/delete/~, ~/api/admin-quotation~, ~/api/vendor-quotation~, ~/api/vendor-quotation/detail/~, ~/api/vendor-quotation/update/~';
                yield (0, typeormLoader_1.getDataSource)().getRepository('Plugins').save(findQuotationPlugins);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddPluginSeedForQuotation1716458523533 = AddPluginSeedForQuotation1716458523533;
//# sourceMappingURL=1716458523533-AddPluginSeedForQuotation.js.map