"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInFacebook1679896672264 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
class AddPluginTimestampInFacebook1679896672264 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    pluginName: 'Facebook',
                },
            });
            if (plugin) {
                plugin.slugName = 'facebook';
                plugin.pluginTimestamp = 1648273183310; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInFacebook1679896672264 = AddPluginTimestampInFacebook1679896672264;
//# sourceMappingURL=1679896672264-AddPluginTimestampInFacebook.js.map