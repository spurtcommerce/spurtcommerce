"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterCustomerRegistrationTemplate1726307730509 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterCustomerRegistrationTemplate1726307730509 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const emailData = yield (0, typeorm_1.getRepository)('email_template').findOne({ where: { emailTemplateId: 32 } });
            if (emailData) {
                emailData.content = `<p>Dear {name},<br>
&nbsp;</p>

<p>Thank you for expressing your interest and registering with <b> {storeName}</b>, your gateway to a smarter eCommerce experience.</p>

<p>We look forward to providing you with an exceptional shopping experience.</p>
<br>
<p>Best Regards, </p>
<p> <b>{storeName}</b></p>`;
                emailData.dynamicFieldsRef = '{name},{storeName}';
                emailData.subject = 'Welcome to {storeName}! Your Regisration is successful';
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
exports.AlterCustomerRegistrationTemplate1726307730509 = AlterCustomerRegistrationTemplate1726307730509;
//# sourceMappingURL=1726307730509-AlterCustomerRegistrationTemplate.js.map