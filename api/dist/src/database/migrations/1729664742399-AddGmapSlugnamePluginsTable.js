"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddGmapSlugnamePluginsTable1729664742399 = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../../api/core/models/Plugin");
const typeorm_1 = require("typeorm");
class AddGmapSlugnamePluginsTable1729664742399 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = queryRunner.manager.getRepository(Plugin_1.Plugins);
            const ifGmapSlugName = yield repo.findOne({
                where: {
                    id: 19,
                    pluginName: 'gmap',
                    slugName: (0, typeorm_1.IsNull)(),
                },
            });
            if (ifGmapSlugName) {
                ifGmapSlugName.slugName = 'gmap';
                yield repo.save(ifGmapSlugName);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddGmapSlugnamePluginsTable1729664742399 = AddGmapSlugnamePluginsTable1729664742399;
//# sourceMappingURL=1729664742399-AddGmapSlugnamePluginsTable.js.map