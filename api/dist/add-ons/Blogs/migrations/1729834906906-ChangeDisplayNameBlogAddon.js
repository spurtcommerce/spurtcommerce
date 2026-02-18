"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeDisplayNameBlogAddon1729834906906 = void 0;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class ChangeDisplayNameBlogAddon1729834906906 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository('Plugins');
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'blog',
                },
            });
            if (plugin) {
                plugin.displayName = 'Blog Categories & Posts';
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
exports.ChangeDisplayNameBlogAddon1729834906906 = ChangeDisplayNameBlogAddon1729834906906;
//# sourceMappingURL=1729834906906-ChangeDisplayNameBlogAddon.js.map