"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOauthEmailTemplate1719829703716 = void 0;
const tslib_1 = require("tslib");
class AddOauthEmailTemplate1719829703716 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            INSERT INTO email_template (
              id, shortname, subject, message, is_active, created_date, modified_date, created_by, modified_by, dynamic_fields_ref
            ) VALUES (
              9,
              'Oauth register mail',
              'Oauth register mail',
              'Dear {name},<br/><br/><p style="margin-bottom:.5em; margin: 0 0 10px 0;text-indent: 50px;">Thank you for showing your interest in SpurtCommerce, your temporary password for next time login is: {xxxxxx} or you can login through Oauth</p>',
              1,
              '2019-08-08 00:00:00',
              '2019-08-08 18:45:15',
              NULL,
              NULL,
              NULL
            );
          `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            DELETE FROM email_template WHERE id = 9;
          `);
        });
    }
}
exports.AddOauthEmailTemplate1719829703716 = AddOauthEmailTemplate1719829703716;
//# sourceMappingURL=1719829703716-AddOauthEmailTemplate.js.map