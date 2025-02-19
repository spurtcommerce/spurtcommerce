"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVendorEmailVerification1716880934372 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddVendorEmailVerification1716880934372 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.hasTable('email_template');
            if (exist) {
                const templateStyle = `<p>Dear {name},</p> \n<br>\n<p>Click the below link to verify your account.</p>\n<br><a href= {link}>Click Here</a>\n<p>Regards,</p>`;
                const changeMailSeed = [{
                        emailTemplateId: 42,
                        title: 'Vendor Email Verification',
                        subject: 'Email Verification',
                        dynamicFieldsRef: '{name},{link}',
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
exports.AddVendorEmailVerification1716880934372 = AddVendorEmailVerification1716880934372;
//# sourceMappingURL=1716880934372-AddVendorEmailVerification.js.map