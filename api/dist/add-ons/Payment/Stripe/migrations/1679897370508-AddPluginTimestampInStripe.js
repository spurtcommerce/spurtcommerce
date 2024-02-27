"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInStripe1679897370508 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../../../../src/api/core/models/Plugin");
class AddPluginTimestampInStripe1679897370508 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    pluginName: 'Stripe',
                },
            });
            if (plugin) {
                plugin.slugName = 'stripe';
                plugin.pluginTimestamp = 1648122529616; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInStripe1679897370508 = AddPluginTimestampInStripe1679897370508;
//# sourceMappingURL=1679897370508-AddPluginTimestampInStripe.js.map