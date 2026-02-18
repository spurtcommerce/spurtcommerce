"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRouteRatingReview1724760533135 = void 0;
const tslib_1 = require("tslib");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
class AddRouteRatingReview1724760533135 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeormLoader_1.getDataSource)().getRepository(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'rating-review',
                },
            });
            if (plugin) {
                plugin.pluginName = 'RatingAndReview';
                plugin.pluginTimestamp = 1665135474947; // This Add-on's Plugin Migration Timestamp
                plugin.routes = '~/api/admin-product-rating~,~/api/product-store~,~/api/product-store~,~/api/vendor-product~,~/api/admin-product-rating/Get-Product-rating~,~/api/admin-product-rating/~,~/api/product-store/Get-Product-rating~,~/api/product-store/get-product-rating-count~,~/api/product-store/get-rating-statistics~,~/api/product-store/add-rating~,~/api/product-store/add-reviews~,~/api/product-store/rating-detail-by-order~,,~/api/product-store/get-vendor-product-rating-count~,~/api/product-store/vendor-product-review-list~,~/api/vendor-product/vendorproduct-rating-list~,~/api/vendor-product/vendorproduct-rating-status/~,~/api/vendor-product-rating/vendor-product-rating-status~',
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
exports.AddRouteRatingReview1724760533135 = AddRouteRatingReview1724760533135;
//# sourceMappingURL=1724760533135-AddRouteRatingReview.js.map