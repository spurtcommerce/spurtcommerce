"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterAdminOrderTemplate1726466756648 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AlterAdminOrderTemplate1726466756648 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const emailData = yield (0, typeorm_1.getRepository)('email_template').findOne({ where: { emailTemplateId: 6 } });
            if (emailData) {
                emailData.content = `Dear {adminname},        </td>    </tr>    <tr>
            <td dir='ltr' style='padding:0 0px;color:#078e05;font-weight:400;text-align:left;font-size:16px;line-height:1.5rem;padding-top:10px;font-family: 'Roboto', sans-serif;' valign='top'>
             A new order has been placed.         </td>    </tr>    <tr>
             <td dir='ltr' style='padding:0 0px;color:#000;font-weight:300;text-align:left;font-size:12px;line-height:1.2rem;padding-top:10px;font-family: 'Roboto', sans-serif;' valign='top'>
              The new order <b>{orderId}</b> from the Customer <b>{name}</b> has been successfully placed. Please find the following details of the placed order below:.    </tr> </tbody></table></td> </tr> `;
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
exports.AlterAdminOrderTemplate1726466756648 = AlterAdminOrderTemplate1726466756648;
//# sourceMappingURL=1726466756648-AlterAdminOrderTemplate.js.map