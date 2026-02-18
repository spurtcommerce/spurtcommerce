"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterQuotationPluginTable1721040070252 = void 0;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AlterQuotationPluginTable1721040070252 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findQuotationRequest = yield (0, typeormLoader_1.getDataSource)().getRepository('Plugins').findOne({ where: { slugName: 'product-quotation' } });
            if (findQuotationRequest) {
                findQuotationRequest.routes = '~/api/quotation~, ~/api/quotation/delete/~, ~/api/admin-quotation~, ~/api/vendor-quotation~, ~/api/vendor-quotation/detail/~, ~/api/vendor-quotation/update/~, ~/api/vendor-quotation/export~';
                yield (0, typeormLoader_1.getDataSource)().getRepository('Plugins').save(findQuotationRequest);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterQuotationPluginTable1721040070252 = AlterQuotationPluginTable1721040070252;
//# sourceMappingURL=1721040070252-AlterQuotationPluginTable.js.map