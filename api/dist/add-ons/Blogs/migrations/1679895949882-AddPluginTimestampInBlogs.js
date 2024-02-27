"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInBlogs1679895949882 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
class AddPluginTimestampInBlogs1679895949882 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'blog',
                },
            });
            if (plugin) {
                plugin.pluginName = 'Blogs';
                plugin.pluginTimestamp = 1665133624567; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInBlogs1679895949882 = AddPluginTimestampInBlogs1679895949882;
//# sourceMappingURL=1679895949882-AddPluginTimestampInBlogs.js.map