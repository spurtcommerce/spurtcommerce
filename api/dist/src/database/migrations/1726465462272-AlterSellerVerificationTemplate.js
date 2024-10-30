"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterSellerVerificationTemplate1726465462272 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterSellerVerificationTemplate1726465462272 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const emailData = yield (0, typeorm_1.getRepository)('email_template').findOne({ where: { emailTemplateId: 42 } });
            if (emailData) {
                emailData.content = `<p>Dear {name},</p>
<br>
<p> To proceed with the activation of your seller account, please click the link below to complete the verification process. This step is essential to ensure your account is set up correctly and securely.</p>
<br><b><a href= {link}>Click Here</a></b>  <br> <p> If you have any questions or need assistance, feel free to contact our support team <b>{storeUrl}</b>.</pr>`;
                yield (0, typeorm_1.getRepository)('email_template').save(emailData);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterSellerVerificationTemplate1726465462272 = AlterSellerVerificationTemplate1726465462272;
//# sourceMappingURL=1726465462272-AlterSellerVerificationTemplate.js.map