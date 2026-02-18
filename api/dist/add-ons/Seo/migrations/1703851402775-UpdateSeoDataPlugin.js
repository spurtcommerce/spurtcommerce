"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSeoDataPlugin1703851402775 = void 0;
const tslib_1 = require("tslib");
class UpdateSeoDataPlugin1703851402775 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('update plugins set routes="~/api/blog-seo~,~/api/blog-seo/~,~/api/category-seo~,~/api/category-seo/~,~/api/page-seo~,~/api/page-seo/~,~/api/product-seo~,~/api/product-seo/~,~/api/seo/product/~,~/api/seo/category/~,~/api/seo/page/~,~/api/seo/blog/~,~/api/vendor-product-seo~,~/api/vendor-product-seo/~" where plugin_name = "Seo"');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.UpdateSeoDataPlugin1703851402775 = UpdateSeoDataPlugin1703851402775;
//# sourceMappingURL=1703851402775-UpdateSeoDataPlugin.js.map