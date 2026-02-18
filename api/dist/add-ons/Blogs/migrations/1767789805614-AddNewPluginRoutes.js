"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewPluginRoutes1767789805614 = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddNewPluginRoutes1767789805614 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
            const blogPlugin = yield pluginRepository.findOne({ where: { slugName: 'blog' } });
            if (blogPlugin) {
                blogPlugin.id = blogPlugin.id;
            }
            blogPlugin.pluginName = 'Blogs';
            blogPlugin.pluginType = 'CMS';
            blogPlugin.pluginStatus = 1;
            blogPlugin.isEditable = 0;
            blogPlugin.pluginTimestamp = 1765972844005;
            blogPlugin.displayName = 'Blog Categories & Posts';
            blogPlugin.slugName = 'blog';
            blogPlugin.routes = '~/api/blog~,~/api/blog/~,~/api/blog-category~,~/api/blog/delete-multiple-blog~,~/api/blog/blog-detail~,~/api/blog/blog-count~,~/api/blog-category/~,~/api/blog-category/blog-category-detail~,~/api/blog-category/category-count~,~/api/blog-category/update-blog-category-status/~,~/api/list/related-blog-list~,~/api/list/blog/blog-detail/~,~/api/list/blog/blog-list~,~/api/blog/download-blog-sample~,~/api/blog/import-blog-data~';
            blogPlugin.pluginAvatar = 'blog.png';
            blogPlugin.pluginAvatarPath = 'addon/';
            yield pluginRepository.save(blogPlugin);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddNewPluginRoutes1767789805614 = AddNewPluginRoutes1767789805614;
//# sourceMappingURL=1767789805614-AddNewPluginRoutes.js.map