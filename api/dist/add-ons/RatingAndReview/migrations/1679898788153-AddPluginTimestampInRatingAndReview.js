"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPluginTimestampInRatingAndReview1679898788153 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../../../src/api/core/models/Plugin");
class AddPluginTimestampInRatingAndReview1679898788153 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = (0, typeorm_1.getRepository)(Plugin_1.Plugins);
            const plugin = yield repo.findOne({
                where: {
                    slugName: 'rating-review',
                },
            });
            if (plugin) {
                plugin.pluginName = 'RatingAndReview';
                plugin.pluginTimestamp = 1665135474947; // This Add-on's Plugin Migration Timestamp
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
exports.AddPluginTimestampInRatingAndReview1679898788153 = AddPluginTimestampInRatingAndReview1679898788153;
//# sourceMappingURL=1679898788153-AddPluginTimestampInRatingAndReview.js.map