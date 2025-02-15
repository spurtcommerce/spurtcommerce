"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterEmailTemplateVendorVerification1726206626353 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterEmailTemplateVendorVerification1726206626353 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const emailData = yield (0, typeorm_1.getRepository)('email_template').findOne({ where: { emailTemplateId: 42 } });
            if (emailData) {
                emailData.content = `<p>Dear {name},<br />
&nbsp;</p>

<p>Thank you for expressing your interest and signing up as a Seller with Spurt Cart..</p>

<p>Your Vendor registration is with the Admin for approval. Once approved by the Admin, you will be able to login to the Seller Panel.</p>

<p>Meanwhile, for any other information,visit <a href="{storeName}">"{storeName}"</a></p>
`;
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
exports.AlterEmailTemplateVendorVerification1726206626353 = AlterEmailTemplateVendorVerification1726206626353;
//# sourceMappingURL=1726206626353-AlterEmailTemplateVendorVerification.js.map