"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddQuestionAndAnswerMenu1646744547224 = void 0;
const tslib_1 = require("tslib");
const moment = require("moment/moment");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
class AddQuestionAndAnswerMenu1646744547224 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const QuestionAndAnswerMenuSeed = [
                {
                    menuName: 'Question & Answer',
                    menuModule: 'Products',
                    path: '#/catalog/product/question',
                    icon: 'ask.png',
                    parentId: 0,
                    status: 1,
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            yield (0, typeormLoader_1.getDataSource)().getRepository('PluginMenu').save(QuestionAndAnswerMenuSeed);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ----
        });
    }
}
exports.AddQuestionAndAnswerMenu1646744547224 = AddQuestionAndAnswerMenu1646744547224;
//# sourceMappingURL=1646744547224-AddQuestionAndAnswerMenu.js.map