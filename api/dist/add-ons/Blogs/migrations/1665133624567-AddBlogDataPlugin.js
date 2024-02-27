"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBlogDataPlugin1665133624567 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddBlogDataPlugin1665133624567 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'Blogs',
                    slugName: 'blog',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginType: 'CMS',
                    pluginTimestamp: 1665133624567,
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/blog~,~/api/blog/~,~/api/blog-category~,~/api/blog/delete-multiple-blog~,~/api/blog/blog-detail~,~/api/blog/blog-count~,~/api/blog-category/~,~/api/blog-category/blog-category-detail~,~/api/blog-category/category-count~,~/api/blog-category/update-blog-category-status/~,~/api/list/related-blog-list~,~/api/list/blog/blog-detail/~,~/api/list/blog/blog-list~',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('Plugins').save(SeoSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddBlogDataPlugin1665133624567 = AddBlogDataPlugin1665133624567;
//# sourceMappingURL=1665133624567-AddBlogDataPlugin.js.map