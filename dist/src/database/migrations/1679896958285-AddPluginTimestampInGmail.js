"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInGmail1679896958285 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
class AddPluginTimestampInGmail1679896958285 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    pluginName: 'Gmail',
                },
            });
            if (plugin) {
                plugin.slugName = 'gmail';
                plugin.pluginTimestamp = 1648273222013; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInGmail1679896958285 = AddPluginTimestampInGmail1679896958285;
//# sourceMappingURL=1679896958285-AddPluginTimestampInGmail.js.map