"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterEmailTemplateVendorVerifyMail1726149005488 = void 0;
const tslib_1 = require("tslib");
const EmailTemplate_1 = require("../../api/core/models/EmailTemplate");
class AlterEmailTemplateVendorVerifyMail1726149005488 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = queryRunner.manager.getRepository(EmailTemplate_1.EmailTemplate);
            const emailData = repo.findOne({ where: { emailTemplateId: 42 } });
            if (emailData) {
                emailData.content = `<p>Dear {name},</p>
<br>
<p> To proceed with the activation of your seller account, please click the link below to complete the verification process. This step is essential to ensure your account is set up correctly and securely.</p>
<br><a href= {link}>Click Here</a>  <br> <p> If you have any questions or need assistance, feel free to contact our support team.</pr>`;
                yield repo.save(emailData);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterEmailTemplateVendorVerifyMail1726149005488 = AlterEmailTemplateVendorVerifyMail1726149005488;
//# sourceMappingURL=1726149005488-AlterEmailTemplateVendorVerifyMail.js.map