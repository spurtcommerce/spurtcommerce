"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSiteMapPluginUrl1729849370507 = void 0;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddSiteMapPluginUrl1729849370507 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository('Plugins');
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'seo',
                },
            });
            if (plugin) {
                plugin.routes = plugin.routes + `,~/api/site-map~,~/api/site-map/~,~/api/site-map/get-sitemap~`;
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
exports.AddSiteMapPluginUrl1729849370507 = AddSiteMapPluginUrl1729849370507;
//# sourceMappingURL=1729849370507-AddSiteMapPluginUrl.js.map