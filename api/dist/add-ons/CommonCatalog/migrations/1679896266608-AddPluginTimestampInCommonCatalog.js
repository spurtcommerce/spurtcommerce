"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInCommonCatalog1679896266608 = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddPluginTimestampInCommonCatalog1679896266608 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'common-catalog',
                },
            });
            if (plugin) {
                plugin.pluginName = 'CommonCatalog';
                plugin.pluginTimestamp = 1665133966736; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInCommonCatalog1679896266608 = AddPluginTimestampInCommonCatalog1679896266608;
//# sourceMappingURL=1679896266608-AddPluginTimestampInCommonCatalog.js.map