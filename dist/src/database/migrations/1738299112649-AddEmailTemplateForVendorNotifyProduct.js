"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmailTemplateForVendorNotifyProduct1738299112649 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddEmailTemplateForVendorNotifyProduct1738299112649 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const emailData = yield (0, typeorm_1.getRepository)('email_template').findOne({ where: { emailTemplateId: 46 } });
            if (!emailData) {
                yield queryRunner.query(`INSERT INTO email_template
                (id,shortname,subject,message,dynamic_fields_ref)
                VALUES
                (46,'Vendor Notification for Product Inventory Stock Closed',
                'Product Inventory Stock Closed',
                '<h1 style="font-size: 20px; line-height: 29px; font-weight: 600;margin: 0 0 12px 0;color:#1F2328;">
                Hi {name},
                </h1>
                <p
                style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 24px 0;">
                <b>DETAILED REQUIREMENTS:</b><br>{userRequirements} <br><br>
                <b>FullName :</b> {FullName}<br>
                <b>Email ID :</b> {EmailId}<br>
                <b>Attachments :</b> attachments includes<br>
                <br><br>
                </p>',
                '{name},{productName}');`);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddEmailTemplateForVendorNotifyProduct1738299112649 = AddEmailTemplateForVendorNotifyProduct1738299112649;
//# sourceMappingURL=1738299112649-AddEmailTemplateForVendorNotifyProduct.js.map