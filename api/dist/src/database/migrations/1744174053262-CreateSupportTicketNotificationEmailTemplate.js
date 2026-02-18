"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSupportTicketNotificationEmailTemplate1744174053262 = void 0;
const tslib_1 = require("tslib");
class CreateSupportTicketNotificationEmailTemplate1744174053262 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`INSERT INTO email_template
                (shortname,subject,message,dynamic_fields_ref)
                VALUES
                ('Support Request',
                'Support Ticket Notification',
                'Dear Admin,<br/><br/>
                <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
                <strong>{name}</strong> has raised a new support ticket regarding: <strong>{subject}</strong>.
                </p>

                <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
                Please review the ticket details and take appropriate action.
                </p>

                <p style="margin-top: 20px;">Regards,<br/>Your Support Team</p>',
                '{name},{subject}');`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateSupportTicketNotificationEmailTemplate1744174053262 = CreateSupportTicketNotificationEmailTemplate1744174053262;
//# sourceMappingURL=1744174053262-CreateSupportTicketNotificationEmailTemplate.js.map