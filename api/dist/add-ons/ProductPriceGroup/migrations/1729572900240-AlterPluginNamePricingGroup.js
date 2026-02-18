"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterPluginNamePricingGroup1729572900240 = void 0;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AlterPluginNamePricingGroup1729572900240 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository('Plugins');
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'product-price-group',
                },
            });
            if (plugin) {
                plugin.displayName = 'Personalized Pricing';
                yield repo.save(plugin);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterPluginNamePricingGroup1729572900240 = AlterPluginNamePricingGroup1729572900240;
//# sourceMappingURL=1729572900240-AlterPluginNamePricingGroup.js.map