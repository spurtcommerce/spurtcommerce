"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInSeo1679898902620 = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddPluginTimestampInSeo1679898902620 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'seo',
                },
            });
            if (plugin) {
                plugin.pluginName = 'Seo';
                plugin.pluginTimestamp = 1665123762673; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInSeo1679898902620 = AddPluginTimestampInSeo1679898902620;
//# sourceMappingURL=1679898902620-AddPluginTimestampInSeo.js.map