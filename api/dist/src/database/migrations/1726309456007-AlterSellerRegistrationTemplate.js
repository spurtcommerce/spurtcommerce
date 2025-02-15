"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterSellerRegistrationTemplate1726309456007 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterSellerRegistrationTemplate1726309456007 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const emailData = yield (0, typeorm_1.getRepository)('email_template').findOne({ where: { emailTemplateId: 11 } });
            if (emailData) {
                emailData.content = `<p>Dear {name},<br />
&nbsp;</p>

<p>Thank you for expressing your interest and signing up as a seller with <b>{storeName}</b>.</p>

<p>Your Seller registration is currently under review by the admin. Once approved, you will receive further instructions.</p>`;
                emailData.dynamicFieldsRef = '{name},{storeName}';
                emailData.subject = 'You Just Signed Up as a Seller with {storeName}!';
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
exports.AlterSellerRegistrationTemplate1726309456007 = AlterSellerRegistrationTemplate1726309456007;
//# sourceMappingURL=1726309456007-AlterSellerRegistrationTemplate.js.map