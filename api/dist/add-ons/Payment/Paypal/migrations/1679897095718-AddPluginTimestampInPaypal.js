"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInPaypal1679897095718 = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../../../../src/api/core/models/Plugin");
const typeormLoader_1 = require("../../../../src/loaders/typeormLoader");
class AddPluginTimestampInPaypal1679897095718 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    pluginName: 'Paypal',
                },
            });
            if (plugin) {
                plugin.slugName = 'paypal';
                plugin.pluginTimestamp = 1648018102673; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInPaypal1679897095718 = AddPluginTimestampInPaypal1679897095718;
//# sourceMappingURL=1679897095718-AddPluginTimestampInPaypal.js.map