"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmailTemplateSellerApproval1746690271994 = void 0;
const tslib_1 = require("tslib");
class UpdateEmailTemplateSellerApproval1746690271994 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            UPDATE email_template
            SET message = '<h1
        style="font-size: 20px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color: #1F2328;">
        Hi {name},
    </h1><br><br>

    <p
    style="font-size: 16px; line-height: 24px; color: #1F2328; font-weight: normal; margin: 0 0 24px 0;">
    We are glad to inform you that you are now an Approved Seller on <b>{siteName}.</b><br><br>
    In your Seller Panel, now you can start adding products and start your selling business at <b>{siteName}.</b><br><br>
    Should you face any problems in adding products or using the SpurtCart Seller Panel, please feel free to contact our support team at
    <a href="{supportUrl}"><b>{supportUrl}</b></a>.
    We will be more than happy to assist you.<br><br>
    Alternatively, you may use the chat option on your dashboard to directly message the Admin in case of any urgent assistance required.<br>
    Wish you a wonderful Journey as a Seller on <b>{siteName}.</b>
    </p><br><br>'
            WHERE id = 15;
            `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.UpdateEmailTemplateSellerApproval1746690271994 = UpdateEmailTemplateSellerApproval1746690271994;
//# sourceMappingURL=1746690271994-UpdateEmailTemplateSellerApproval.js.map