"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDataEmailTemplate1716011566603 = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const typeorm_1 = require("typeorm");
class AddDataEmailTemplate1716011566603 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExist = yield queryRunner.hasTable('email_template');
            if (ifExist) {
                const data = [
                    {
                        emailTemplateId: 40,
                        title: 'Forgot password link',
                        subject: 'Forgot password link',
                        content: 'Dear {name},                     <br><br><p>We`ve received your request to reset your password. If you wish to change your password please click on the link given below.</p>                    <br><a href= {link}>Click Her</a>                    <br><p> for reset your password </p> <p>Regards,</p> <br><p>The Spurt Commerce Team</p>',
                        isActive: 1,
                        dynamicFieldsRef: '{name},{link}',
                        createdDate: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                    },
                ];
                yield (0, typeorm_1.getRepository)('email_template').save(data);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddDataEmailTemplate1716011566603 = AddDataEmailTemplate1716011566603;
//# sourceMappingURL=1716011566603-AddDataEmailTemplate.js.map