"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddQuestiomAndAnswerPlugin1665135279238 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddQuestiomAndAnswerPlugin1665135279238 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const SeoSeed = [
                {
                    pluginName: 'QuestionAndAnswer',
                    slugName: 'question-answer',
                    pluginAvatar: '',
                    pluginAvatarPath: '',
                    pluginType: 'CMS',
                    pluginTimestamp: 1665135279238,
                    pluginStatus: 1,
                    isEditable: 0,
                    routes: '~/api/admin-product-answer~,~/api/admin-product-question~,~/api/store-question-answer~,~/api/vendor-product-answer~,~/api/vendor-product-question~,~/api/admin-product-answer/update-answer/~,~/api/admin-product-answer/~,~/api/admin-product-answer/make-default-answer/~,~/api/admin-product-question/update-question/~,~/api/admin-product-question/~,~/api/admin-product-question/product-question-list~,~/api/admin-product-question/product-detail-question-list/~,~/api/store-question-answer/add-question~,~/api/store-question-answer/add-answer~,~/api/store-question-answer/update-like-status~,~/api/store-question-answer/abuse-reason-list~,~/api/store-question-answer/add-report-abuse~,~/api/store-question-answer/question-list~,~/api/store-question-answer/answer-list~,~/api/store-question-answer/productdetail-question-list/~,~/api/vendor-product-answer/add-answer~,~/api/vendor-product-answer/update-answer-status/~,~/api/vendor-product-answer/delete-answer/~,~/api/vendor-product-answer/answer-list~,~/api/vendor-product-answer/make-default-answer/~,~/api/vendor-product-question/add-question~,~/api/vendor-product-question/update-question-status/~,~/api/vendor-product-question/delete-question/~,~/api/vendor-product-question/question-list~,~/api/vendor-product-question/vendor-product-question-list~',
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
exports.AddQuestiomAndAnswerPlugin1665135279238 = AddQuestiomAndAnswerPlugin1665135279238;
//# sourceMappingURL=1665135279238-AddQuestiomAndAnswerPlugin.js.map