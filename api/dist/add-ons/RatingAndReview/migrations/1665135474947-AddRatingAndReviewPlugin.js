"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRatingAndReviewPlugin1665135474947 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddRatingAndReviewPlugin1665135474947 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'RatingAndReview',
                    slugName: 'rating-review',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginTimestamp: 1665135474947,
                    pluginType: 'CMS',
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/admin-product-rating~,~/api/product-store~,~/api/product-store~,~/api/vendor-product~,~/api/admin-product-rating/Get-Product-rating~,~/api/admin-product-rating/~,~/api/product-store/Get-Product-rating~,~/api/product-store/get-product-rating-count~,~/api/product-store/get-rating-statistics~,~/api/product-store/add-rating~,~/api/product-store/add-reviews~,~/api/product-store/rating-detail-by-order~,,~/api/product-store/get-vendor-product-rating-count~,~/api/product-store/vendor-product-review-list~,~/api/vendor-product/vendorproduct-rating-list~,~/api/vendor-product/vendorproduct-rating-status/~',
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
exports.AddRatingAndReviewPlugin1665135474947 = AddRatingAndReviewPlugin1665135474947;
//# sourceMappingURL=1665135474947-AddRatingAndReviewPlugin.js.map