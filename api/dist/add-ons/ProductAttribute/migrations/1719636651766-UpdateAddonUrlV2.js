"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAddonUrlV21719636651766 = void 0;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class UpdateAddonUrlV21719636651766 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository('Plugins');
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'product-attribute',
                },
            });
            if (plugin) {
                plugin.routes = plugin.routes + `,~/api/specification/v2~`;
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
exports.UpdateAddonUrlV21719636651766 = UpdateAddonUrlV21719636651766;
//# sourceMappingURL=1719636651766-UpdateAddonUrlV2.js.map