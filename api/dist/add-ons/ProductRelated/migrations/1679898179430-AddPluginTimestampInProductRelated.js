"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInProductRelated1679898179430 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
class AddPluginTimestampInProductRelated1679898179430 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'product-related',
                },
            });
            if (plugin) {
                plugin.pluginName = 'ProductRelated';
                plugin.pluginTimestamp = 1665134575737; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInProductRelated1679898179430 = AddPluginTimestampInProductRelated1679898179430;
//# sourceMappingURL=1679898179430-AddPluginTimestampInProductRelated.js.map