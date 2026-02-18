"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInProductVariants1679898444607 = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddPluginTimestampInProductVariants1679898444607 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'product-variants',
                },
            });
            if (plugin) {
                plugin.pluginName = 'ProductVariants';
                plugin.pluginTimestamp = 1665134686072; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInProductVariants1679898444607 = AddPluginTimestampInProductVariants1679898444607;
//# sourceMappingURL=1679898444607-AddPluginTimestampInProductVariants.js.map