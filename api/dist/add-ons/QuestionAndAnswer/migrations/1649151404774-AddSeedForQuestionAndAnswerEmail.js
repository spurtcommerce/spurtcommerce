"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSeedForQuestionAndAnswerEmail1649151404774 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddSeedForQuestionAndAnswerEmail1649151404774 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const questionData = '<p>Dear {name},<br />' + '&nbsp;</p>' +
                '<p>A Customer has just posted a question for the product - {title}.</p>' +
                '<p><em>Question</em> : {question}</p>' +
                '<p><strong><em>User Name:</em></strong><br />' +
                'Name: {username}</p>' +
                '<p>&nbsp;</p>';
            const answerData = '<p>Dear {name},<br />' +
                '&nbsp;</p>' +
                '<p>One of your Customers, who purchased the Product - {title}, just answered a question posted on the product.</p>' +
                '<p><em>Question</em> : {question}</p>' +
                '<p><em>Answer</em> : {answer}</p>' +
                '<p><br />' +
                '<strong><em>User Name:</em></strong><br />' +
                'Name: {username}</p>' +
                '<p>&nbsp;</p>' +
                '<p>&nbsp;</p>';
            const reportAbuseData = '<p>Dear {name},<br />&nbsp;</p><p>{username} posted Report Abuse for your product <u>{title}</u>,<br></p><p><i>Question</i> : {question}</p></p><p><i>Answer</i> : {answer}</p><br>';
            const exist = yield queryRunner.query('SELECT * FROM `email_template` WHERE `id` = ' + '"17"');
            if (exist.length === 0) {
                const QuestionAndAnswerEmailSeed = [
                    {
                        emailTemplateId: 17,
                        title: 'Email posting question',
                        subject: 'Product Question Alert',
                        content: questionData,
                        isActive: 1,
                    },
                ];
                yield (0, typeorm_1.getRepository)('EmailTemplate').save(QuestionAndAnswerEmailSeed);
            }
            const exist1 = yield queryRunner.query('SELECT * FROM `email_template` WHERE `id` = ' + '"18"');
            if (exist1.length === 0) {
                const AnswerEmailSeed = [
                    {
                        emailTemplateId: 18,
                        title: 'Email posting answer',
                        subject: 'Product Answer notification',
                        content: answerData,
                        isActive: 1,
                    },
                ];
                yield (0, typeorm_1.getRepository)('EmailTemplate').save(AnswerEmailSeed);
            }
            const exist3 = yield queryRunner.query('SELECT * FROM `email_template` WHERE `id` = ' + '"19"');
            if (exist3.length === 0) {
                const ReportEmailSeed = [
                    {
                        emailTemplateId: 19,
                        title: 'Report Abuse',
                        subject: 'Report Abuse',
                        content: reportAbuseData,
                        isActive: 1,
                    },
                ];
                yield (0, typeorm_1.getRepository)('EmailTemplate').save(ReportEmailSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // ---
        });
    }
}
exports.AddSeedForQuestionAndAnswerEmail1649151404774 = AddSeedForQuestionAndAnswerEmail1649151404774;
//# sourceMappingURL=1649151404774-AddSeedForQuestionAndAnswerEmail.js.map