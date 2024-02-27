"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInWidget1679900284517 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
class AddPluginTimestampInWidget1679900284517 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'widget',
                },
            });
            if (plugin) {
                plugin.pluginName = 'Widget';
                plugin.pluginTimestamp = 1665135644842; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInWidget1679900284517 = AddPluginTimestampInWidget1679900284517;
//# sourceMappingURL=1679900284517-AddPluginTimestampInWidget.js.map