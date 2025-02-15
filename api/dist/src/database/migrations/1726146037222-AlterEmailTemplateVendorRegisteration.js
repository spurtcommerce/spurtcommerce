"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterEmailTemplateVendorRegisteration1726146037222 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterEmailTemplateVendorRegisteration1726146037222 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const emailData = yield (0, typeorm_1.getRepository)('email_template').findOne({ where: { emailTemplateId: 11 } });
            if (emailData) {
                emailData.content = `<p>Dear {name},<br />
&nbsp;</p>

<p>Thank you for expressing your interest and signing up as a Seller with Spurt Cart..</p>

<p>Your Vendor registration is with the Admin for approval. Once approved by the Admin, you will be able to login to the Seller Panel.</p>

<p>Meanwhile, for any other information, visit {storeName}</p>
`;
                emailData.dynamicFieldsRef = '{name},{storeName}';
                emailData.subject = ' You just signed-up as a Seller with Spurt Cart ';
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
exports.AlterEmailTemplateVendorRegisteration1726146037222 = AlterEmailTemplateVendorRegisteration1726146037222;
//# sourceMappingURL=1726146037222-AlterEmailTemplateVendorRegisteration.js.map