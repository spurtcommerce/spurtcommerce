"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginRoutesInRatingAndReview1734593959855 = void 0;
const tslib_1 = require("tslib");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddPluginRoutesInRatingAndReview1734593959855 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'rating-review',
                },
            });
            if (plugin) {
                plugin.routes = '~/api/admin-product-rating~,~/api/product-store~,~/api/vendor-product~,~/api/admin-product-rating/Get-Product-rating~,~/api/admin-product-rating/~,~/api/product-store/Get-Product-rating~,~/api/product-store/get-product-rating-count~,~/api/product-store/get-rating-statistics~,~/api/product-store/add-rating~,~/api/product-store/rating-detail-by-order~,~/api/product-store/get-vendor-product-rating-count~,~/api/product-store/vendor-product-review-list~,~/api/vendor-product/vendorproduct-rating-list~,~/api/vendor-product/vendorproduct-rating-status/~,~/api/vendor-product-rating/vendor-product-rating-list~,~/api/product-store/rating~,~/api/product-store/review~,~/api/product-store/rating-by-order~,~/api/product-store/vendor-product-rating-count~,~/api/product-store/rating-statistics/~,~/api/product-store/rating-count/~,~/api/product-store/rating/~,~/api/product-store/vendor-product-review~,~/api/vendor-product-rating~,~/api/vendor-product-rating/status~',
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
exports.AddPluginRoutesInRatingAndReview1734593959855 = AddPluginRoutesInRatingAndReview1734593959855;
//# sourceMappingURL=1734593959855-AddPluginRoutesInRatingAndReview.js.map