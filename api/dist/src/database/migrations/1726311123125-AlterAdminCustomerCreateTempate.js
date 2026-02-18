"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterAdminCustomerCreateTempate1726311123125 = void 0;
const tslib_1 = require("tslib");
const EmailTemplate_1 = require("../../api/core/models/EmailTemplate");
class AlterAdminCustomerCreateTempate1726311123125 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const repo = queryRunner.manager.getRepository(EmailTemplate_1.EmailTemplate);
            const emailData = yield repo.findOne({ where: { emailTemplateId: 4 } });
            if (emailData) {
                emailData.content = `Dear {name},<br><br>
            <p>We are pleased to inform you that you have been added as a customer at <b>{storeName}</b>. Here are your login credentials: </p><br>
              <p><b>User ID :</b> {username}<br>
              <b>Password :</b> {password}</p> <br>
              <p> You can log in using the above credentials.
Wishing you the best eCommerce experience with <b>{storeName}</b>. </p>`;
                emailData.dynamicFieldsRef = '{name},{storeName},{username},{password}';
                emailData.subject = 'Customer Login created successfully';
                yield repo.save(emailData);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AlterAdminCustomerCreateTempate1726311123125 = AlterAdminCustomerCreateTempate1726311123125;
//# sourceMappingURL=1726311123125-AlterAdminCustomerCreateTempate.js.map