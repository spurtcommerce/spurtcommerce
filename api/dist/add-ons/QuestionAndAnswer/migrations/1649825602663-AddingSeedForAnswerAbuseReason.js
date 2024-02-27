"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddingSeedForAnswerAbuseReason1649825602663 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const moment = require("moment/moment");
class AddingSeedForAnswerAbuseReason1649825602663 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const reason1 = 'Inappropriate Content';
            const exist = yield queryRunner.query('SELECT * FROM `answer_abuse_reason` WHERE `id` = ' + '"1"');
            if (exist.length === 0) {
                const answerAbuseReasonSeed1 = [{
                        id: 1,
                        reason: reason1,
                        isActive: 1,
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        modifiedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                yield (0, typeorm_1.getRepository)('AnswerAbuseReason').save(answerAbuseReasonSeed1);
            }
            const reason2 = 'Illegal Content';
            const exist1 = yield queryRunner.query('SELECT * FROM `answer_abuse_reason` WHERE `id` = ' + '"2"');
            if (exist1.length === 0) {
                const answerAbuseReasonSeed2 = [{
                        id: 2,
                        reason: reason2,
                        isActive: 1,
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        modifiedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                yield (0, typeorm_1.getRepository)('AnswerAbuseReason').save(answerAbuseReasonSeed2);
            }
            const reason3 = 'Wrong Content';
            const exist2 = yield queryRunner.query('SELECT * FROM `answer_abuse_reason` WHERE `id` = ' + '"3"');
            if (exist2.length === 0) {
                const answerAbuseReasonSeed3 = [{
                        id: 3,
                        reason: reason3,
                        isActive: 1,
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        modifiedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                yield (0, typeorm_1.getRepository)('AnswerAbuseReason').save(answerAbuseReasonSeed3);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddingSeedForAnswerAbuseReason1649825602663 = AddingSeedForAnswerAbuseReason1649825602663;
//# sourceMappingURL=1649825602663-AddingSeedForAnswerAbuseReason.js.map