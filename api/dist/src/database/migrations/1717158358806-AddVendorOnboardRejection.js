"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVendorOnboardRejection1717158358806 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddVendorOnboardRejection1717158358806 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.hasTable('email_template');
            if (exist) {
                const templateStyle = `<td style=\"padding: 40px 0; border-width: 1px 0 1px 0; border-color:#D8DEE3; border-style: solid;\">
            <h1 style=\"font-size: 24px; line-height: 29px; font-weight: 600;margin: 0 0 12px 0;color:#1F2328;\"> Hi {name},
            </h1>
            <p style=\"font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 24px 0;\"> We regret to
                inform you that your onboarding request as a Seller at {appName} has been rejected for the following reasons.
            </p>
            <div style=\"padding: 16px; background-color: #F9F9FC;margin: 0 0 24px 0;\">
                <h2 style=\"color: #1F2328;font-size: 14px;line-height: 24px;font-weight: 600;margin:0 0 8px 0;\"> Reasons:
                </h2>
                <p style=\"font-size: 14px;line-height: 18px;color: #262626;font-weight: normal; margin: 0;\"> {comments} </p>
            </div>
            <p style=\"font-size: 14px;line-height: 17px;color: #1F2328; margin: 0 0 5px 0; font-weight: normal;\"> Regards,
            </p>
            <h3 style=\"font-size: 14px;line-height: 17px;color: #1F2328; margin: 0 0 5px 0; font-weight: 600;\"> {appName} Team
            </h3>
            <div> <a href=\"{storeUrl}\" style=\"font-size: 14px;line-height: 17px;color: #1F2328; margin: 0 0 0 0; font-weight:
                    normal; text-decoration: none;\"> {storeUrl} </a> </div>
        </td>`;
                const changeMailSeed = [{
                        emailTemplateId: 44,
                        title: 'Vendor Onboard Rejection',
                        subject: 'Rejection of Seller Onboarding Request',
                        content: templateStyle,
                        isActive: 1,
                    },
                ];
                yield (0, typeorm_1.getRepository)('email_template').save(changeMailSeed);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddVendorOnboardRejection1717158358806 = AddVendorOnboardRejection1717158358806;
//# sourceMappingURL=1717158358806-AddVendorOnboardRejection.js.map