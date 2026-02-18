"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAddonRoutingUrl1745227124529 = void 0;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class UpdateAddonRoutingUrl1745227124529 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository('Plugins');
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'product-attribute',
                },
            });
            if (plugin) {
                plugin.routes = plugin.routes + `,~/api/family~,~/api/family/~,~/api/family/category~,~/api/vendor-specification/vendor-family~,~/api/vendor-specification/vendor-category-list~`;
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
exports.UpdateAddonRoutingUrl1745227124529 = UpdateAddonRoutingUrl1745227124529;
//# sourceMappingURL=1745227124529-UpdateAddonRoutingUrl.js.map