"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorContactMailTemplate1720699605974 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class VendorContactMailTemplate1720699605974 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.hasTable('email_template');
            if (exist) {
                const templateStyle = `<td
            style="padding: 40px 0; border-width: 1px 0 1px 0; border-color:#D8DEE3; border-style: solid;">
            <h1
                style="font-size: 24px; line-height: 29px; font-weight: 600;margin: 0 0 12px 0;color:#1F2328;">
                Hi {name},
                </h1>
            <h5
                style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 24px 0;">
                DETAILED REQUIREMENTS: <br>
                               <p style="text-indent:123px">{userRequirements} .</p>
                </h5 >
            <h3
                style="font-size: 18px; font-weight: bold;line-height: 26px;color: #1F2328;margin: 0 0 10px 0;"> FullName : {FullName}
            </h3>
            <h3
                style="font-size: 18px; font-weight: bold;line-height: 26px;color: #1F2328;margin: 0 0 10px 0;"> Email ID : {EmailId}
            </h3>
            <p
                style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 26px 0;">
                If you didn’t mean to make this request, just ignore the email, and we’ll forget this ever happened.
                </p>
            <p
                style="font-size: 14px;line-height: 17px;color: #1F2328; margin: 0 0 5px 0;  font-weight: normal;">
                Regards,
                </p>
            <h3
                style="font-size: 14px;line-height: 17px;color: #1F2328; margin: 0 0 5px 0;  font-weight: 600;"> {appName} Team,
                </h3>
        </td>`;
                const changeMailSeed = [{
                        emailTemplateId: undefined,
                        title: 'vendor_contact',
                        subject: 'Store Vendor Contact',
                        dynamicFieldsRef: '{name}, {userRequirements}, {FullName}, {EmailId},{attachments}, {appName}',
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
exports.VendorContactMailTemplate1720699605974 = VendorContactMailTemplate1720699605974;
//# sourceMappingURL=1720699605974-VendorContactMailTemplate.js.map