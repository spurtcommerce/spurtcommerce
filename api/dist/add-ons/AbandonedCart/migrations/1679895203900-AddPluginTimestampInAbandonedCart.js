"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInAbandonedCart1679895203900 = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddPluginTimestampInAbandonedCart1679895203900 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    pluginName: 'AbandonedCart',
                },
            });
            if (plugin) {
                plugin.pluginTimestamp = 1678963492425; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInAbandonedCart1679895203900 = AddPluginTimestampInAbandonedCart1679895203900;
//# sourceMappingURL=1679895203900-AddPluginTimestampInAbandonedCart.js.map