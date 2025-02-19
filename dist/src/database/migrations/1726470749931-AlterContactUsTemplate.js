"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterContactUsTemplate1726470749931 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterContactUsTemplate1726470749931 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const emailData = yield (0, typeorm_1.getRepository)('email_template').findOne({ where: { emailTemplateId: 3 } });
            if (emailData) {
                emailData.content = `<p>Dear Admin,</p><br/><br/>
            <p style='margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px'>
             You have received a new enquiry. Here are the details: <br> Details: </p><br>
             <p><b>Name :</b> {name},<br>
             <b>bEmail:</b> {email}, <br>
             <b>Phone Number :</b> {phoneNumber}, <br>
             <b>Message :<>/b {message}.  </p><br>
             <p>Please review and respond as necessary.</p>`;
                emailData.dynamicFieldsRef = '{name},{phoneNumber},{email},{message}';
                emailData.subject = `A new enquiry through 'Contact Us'`;
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
exports.AlterContactUsTemplate1726470749931 = AlterContactUsTemplate1726470749931;
//# sourceMappingURL=1726470749931-AlterContactUsTemplate.js.map