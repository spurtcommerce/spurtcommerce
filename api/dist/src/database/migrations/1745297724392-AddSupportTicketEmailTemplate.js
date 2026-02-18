"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSupportTicketEmailTemplate1745297724392 = void 0;
const tslib_1 = require("tslib");
class AddSupportTicketEmailTemplate1745297724392 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`INSERT INTO email_template
                (shortname,subject,message,dynamic_fields_ref)
                VALUES
                ('Ticket Closed',
                'Ticket Closed by Admin',
                'Dear {name},<br/><br/>
                <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
                  The ticket regarding  <strong>{subject}</strong> has been closed by Admin . Please find the details in Your support section.
                </p>',
                '{name},{subject}');`);
            yield queryRunner.query(`UPDATE email_template
            SET message = 'Dear Admin,<br/><br/>
                <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
                <strong>{name}</strong> has raised a new support ticket regarding: <strong>{subject}</strong>.
                </p>

                <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
                Please review the ticket details and take appropriate action.
                </p>'
            WHERE id = 58 AND shortname = 'Support Request';`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddSupportTicketEmailTemplate1745297724392 = AddSupportTicketEmailTemplate1745297724392;
//# sourceMappingURL=1745297724392-AddSupportTicketEmailTemplate.js.map