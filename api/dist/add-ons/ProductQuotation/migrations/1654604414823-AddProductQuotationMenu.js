"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductQuotationMenu1654604414823 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddProductQuotationMenu1654604414823 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ProductQuotationSeed = [
                {
                    menuName: 'Product Quotation',
                    menuModule: 'Sales Manage Orders',
                    path: '#/sales/manage-orders/quotation_request',
                    icon: '',
                    parentId: 0,
                    status: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('PluginMenu').save(ProductQuotationSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddProductQuotationMenu1654604414823 = AddProductQuotationMenu1654604414823;
//# sourceMappingURL=1654604414823-AddProductQuotationMenu.js.map