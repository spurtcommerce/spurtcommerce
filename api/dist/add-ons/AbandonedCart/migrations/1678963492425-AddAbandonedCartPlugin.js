"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAbandonedCartPlugin1678963492425 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const Plugin_1 = require("../../../src/api/core/models/Plugin");
const typeorm_1 = require("typeorm");
class AddAbandonedCartPlugin1678963492425 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'AbandonedCart',
                    slugName: 'abandoned-cart',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginType: 'Marketplace',
                    pluginTimestamp: 1678963492425,
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/admin-cart~,~/api/admin-cart/~,~/api/admin-cart/abandoned-cart-email~,~/api/guest-cart~,~/api/admin-cart/cart-export~',
                    createdDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${(0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)(Plugin_1.Plugins).save(SeoSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddAbandonedCartPlugin1678963492425 = AddAbandonedCartPlugin1678963492425;
//# sourceMappingURL=1678963492425-AddAbandonedCartPlugin.js.map