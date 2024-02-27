"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInRazorpay1679897259836 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../../../../src/api/core/models/Plugin");
class AddPluginTimestampInRazorpay1679897259836 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    pluginName: 'Razorpay',
                },
            });
            if (plugin) {
                plugin.slugName = 'razorpay';
                plugin.pluginTimestamp = 1648125221707; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInRazorpay1679897259836 = AddPluginTimestampInRazorpay1679897259836;
//# sourceMappingURL=1679897259836-AddPluginTimestampInRazorpay.js.map