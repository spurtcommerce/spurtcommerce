"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterAdminCustomerCreateTempate1726311123125 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterAdminCustomerCreateTempate1726311123125 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const emailData = yield (0, typeorm_1.getRepository)('email_template').findOne({ where: { emailTemplateId: 4 } });
            if (emailData) {
                emailData.content = `Dear {name},<br><br>
            <p>We are pleased to inform you that you have been added as a customer at <b>{storeName}</b>. Here are your login credentials: </p><br>
              <p><b>User ID :</b> {username}<br>
              <b>Password :</b> {password}</p> <br>
              <p> You can log in using the above credentials.
Wishing you the best eCommerce experience with <b>{storeName}</b>. </p>`;
                emailData.dynamicFieldsRef = '{name},{storeName},{username},{password}';
                emailData.subject = 'Customer Login created successfully';
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
exports.AlterAdminCustomerCreateTempate1726311123125 = AlterAdminCustomerCreateTempate1726311123125;
//# sourceMappingURL=1726311123125-AlterAdminCustomerCreateTempate.js.map