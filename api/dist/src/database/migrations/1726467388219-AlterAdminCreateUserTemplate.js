"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterAdminCreateUserTemplate1726467388219 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterAdminCreateUserTemplate1726467388219 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const emailData = yield (0, typeorm_1.getRepository)('email_template').findOne({ where: { emailTemplateId: 7 } });
            if (emailData) {
                emailData.content = ` <p>Dear {name}, <br />
            &nbsp;</p><p>We are pleased to inform you that you have been added as an admin user in <b>{storeName}</b>. Here are your login credentials:</p>
            <p><b>User ID :</b> {username}</p>
            <p><b>Password :</b> {password}</p>
            <p>&nbsp;</p><p>You can log in using the above credentials and begin your journey as an 'Additional Admin User' at <b>{storeName}</b>.</p><p>&nbsp;</p>`;
                emailData.dynamicFieldsRef = '{name},{storeName},{username},{password},{storeName}';
                emailData.subject = 'Login Credentials for Additional Admin User';
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
exports.AlterAdminCreateUserTemplate1726467388219 = AlterAdminCreateUserTemplate1726467388219;
//# sourceMappingURL=1726467388219-AlterAdminCreateUserTemplate.js.map