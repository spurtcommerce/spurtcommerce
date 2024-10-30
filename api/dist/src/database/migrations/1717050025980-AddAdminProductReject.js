"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAdminProductReject1717050025980 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddAdminProductReject1717050025980 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const exist = yield queryRunner.hasTable('email_template');
            if (exist) {
                const templateStyle = `<h3 style=\" font-weight: bold; font-size: 20px; color: #131921; margin-bottom: 16px; font-family: \'Roboto\',
                                        sans-serif; text-align: left; line-height: 24px; \"> Hello {name},, </h3>
                                    <p style=\" color: #222222; text-align: left; font-size: 16px; font-weight: normal; line-height: 27px; font-family:
                                        \'Roboto\', sans-serif; text-align: left; padding-bottom: 32px; \"> We regret to inform you that your Product
                                        request has been rejected for the following reason: </p>
                                    <p style=\" font-size: 18px; font-weight:line-height: 22px; \">
                                    <ul>
                                        <li>{XXXXXX}</li>
                                    </ul>
                                    </p>
                                    <p style=\" color: #222222; text-align: left; font-size: 16px; font-weight: normal; line-height: 27px; font-family:
                                        \'Roboto\', sans-serif; text-align: left; padding-bottom: 32px; \"> If you didn\'t request this change, please \n
                                        contact our support team immediately. </p>
                                    <p style=\"border-bottom: 1px solid #f0f0f0\"></p>`;
                const changeMailSeed = [{
                        emailTemplateId: 43,
                        title: 'Admin Product Reject',
                        subject: 'Product Rejected',
                        dynamicFieldsRef: '{XXXXXX}',
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
exports.AddAdminProductReject1717050025980 = AddAdminProductReject1717050025980;
//# sourceMappingURL=1717050025980-AddAdminProductReject.js.map