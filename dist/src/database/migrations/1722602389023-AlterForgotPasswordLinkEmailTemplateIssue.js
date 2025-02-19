"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterForgotPasswordLinkEmailTemplateIssue1722602389023 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterForgotPasswordLinkEmailTemplateIssue1722602389023 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const existData = yield (0, typeorm_1.getRepository)('email_template').findOne({ where: { emailTemplateId: 40 } });
            if (existData) {
                const data = `Dear {name},<br><br>
                        <p>We've received your request to reset your password.If you wish to change your password please click on the link given below.</p><br><a href={link}>Click Here</a> <br>
                        <p> for reset your password
                        <p>Regards,</p> <br>
                        <p>The Spurt Commerce Team </p>`;
                existData.content = data;
                yield (0, typeorm_1.getRepository)('email_template').update(existData.emailTemplateId, existData);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterForgotPasswordLinkEmailTemplateIssue1722602389023 = AlterForgotPasswordLinkEmailTemplateIssue1722602389023;
//# sourceMappingURL=1722602389023-AlterForgotPasswordLinkEmailTemplateIssue.js.map