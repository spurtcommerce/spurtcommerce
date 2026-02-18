"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateForgotPasswordLinkContant1718606500309 = void 0;
const tslib_1 = require("tslib");
const EmailTemplate_1 = require("../../api/core/models/EmailTemplate");
class UpdateForgotPasswordLinkContant1718606500309 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const Repo = queryRunner.manager.getRepository(EmailTemplate_1.EmailTemplate);
            const existData = yield Repo.findOne({ where: { emailTemplateId: 23 } });
            if (existData) {
                const data = `Dear {name}, <p>We've received a request to change your login
        password. To proceed, please Click THe Below Link
        to verify your identity:</p> \n
        <a href="{link}"> Click Here</a> <p> for reset your password </p> \n
        <p>Regards,</p>\n
        <p>{appName} Team</p>`;
                existData.content = data;
                yield Repo.update(existData.emailTemplateId, existData);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.UpdateForgotPasswordLinkContant1718606500309 = UpdateForgotPasswordLinkContant1718606500309;
//# sourceMappingURL=1718606500309-UpdateForgotPasswordLinkContant.js.map