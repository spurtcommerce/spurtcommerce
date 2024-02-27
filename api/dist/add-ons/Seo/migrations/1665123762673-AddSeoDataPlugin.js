"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSeoDataPlugin1665123762673 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddSeoDataPlugin1665123762673 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'Seo',
                    slugName: 'seo',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginTimestamp: 1665123762673,
                    pluginType: 'CMS',
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/blog-seo~,~/api/blog-seo/~,~/api/category-seo~,~/api/category-seo/~,~/api/page-seo~,~/api/page-seo/~,~/api/product-seo~,~/api/product-seo/~,~/api/seo/product/~,~/api/seo/category/~,~/api/seo/page/~,~/api/seo/blog/~',
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
exports.AddSeoDataPlugin1665123762673 = AddSeoDataPlugin1665123762673;
//# sourceMappingURL=1665123762673-AddSeoDataPlugin.js.map