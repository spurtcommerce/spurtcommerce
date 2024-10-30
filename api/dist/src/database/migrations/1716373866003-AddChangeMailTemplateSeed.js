"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddChangeMailTemplateSeed1716373866003 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
class AddChangeMailTemplateSeed1716373866003 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasTable('email_template');
            if (ifExist) {
                const templateStyle = `<td
            style="padding: 40px 0; border-width: 1px 0 1px 0; border-color:#D8DEE3; border-style: solid;">
            <h1
                style="font-size: 24px; line-height: 29px; font-weight: 600;margin: 0 0 12px 0;color:#1F2328;">
                Hello {name},
                </h1>
            <p
                style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 24px 0;">
                We've received a request to change your login Email Id. To proceed, please <br/>Enter the OTP:</p><br/><br/> {xxxxxx} <br/><br/>
            <p
                style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 26px 0;">
                If you didn’t mean to make this request, just ignore the email, and we’ll forget this ever happened.
                </p>
            <p
                style="font-size: 14px;line-height: 17px;color: #1F2328; margin: 0 0 5px 0;  font-weight: normal;">
                Regards,
                </p>
            <h3
                style="font-size: 14px;line-height: 17px;color: #1F2328; margin: 0 0 5px 0;  font-weight: 600;"> {6} Team,
                </h3>
        </td>`;
                const data = [
                    {
                        emailTemplateId: undefined,
                        title: 'change_user_login_email',
                        subject: 'Change User Login Email',
                        content: templateStyle,
                        isActive: 1,
                        dynamicFieldsRef: '{name},{xxxxxx}',
                        createdDate: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                    },
                ];
                yield (0, typeorm_1.getRepository)('email_template').save(data);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddChangeMailTemplateSeed1716373866003 = AddChangeMailTemplateSeed1716373866003;
//# sourceMappingURL=1716373866003-AddChangeMailTemplateSeed.js.map