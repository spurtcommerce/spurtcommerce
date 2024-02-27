"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInProductAttribute1679897502849 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
class AddPluginTimestampInProductAttribute1679897502849 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'product-attribute',
                },
            });
            if (plugin) {
                plugin.pluginName = 'ProductAttribute';
                plugin.pluginTimestamp = 1665134310790; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInProductAttribute1679897502849 = AddPluginTimestampInProductAttribute1679897502849;
//# sourceMappingURL=1679897502849-AddPluginTimestampInProductAttribute.js.map