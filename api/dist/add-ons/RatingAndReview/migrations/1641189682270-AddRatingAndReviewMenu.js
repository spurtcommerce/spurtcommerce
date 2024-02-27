"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRatingAndReviewMenu1641189682270 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddRatingAndReviewMenu1641189682270 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const RatingAndReviewMenuSeed = [
                {
                    menuName: 'Rating & Review',
                    menuModule: 'Products',
                    path: '#/catalog/rating_review',
                    icon: 'cat-rating-review.svg',
                    parentId: 0,
                    status: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeorm_1.getRepository)('PluginMenu').save(RatingAndReviewMenuSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddRatingAndReviewMenu1641189682270 = AddRatingAndReviewMenu1641189682270;
//# sourceMappingURL=1641189682270-AddRatingAndReviewMenu.js.map