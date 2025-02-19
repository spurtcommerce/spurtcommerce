import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAdminOrderTemplate1726466756648 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const emailData: any = await getRepository('email_template').findOne({ where: { emailTemplateId: 6 } });
        if (emailData) {
            emailData.content = `Dear {adminname},        </td>    </tr>    <tr>
            <td dir='ltr' style='padding:0 0px;color:#078e05;font-weight:400;text-align:left;font-size:16px;line-height:1.5rem;padding-top:10px;font-family: 'Roboto', sans-serif;' valign='top'>
             A new order has been placed.         </td>    </tr>    <tr>
             <td dir='ltr' style='padding:0 0px;color:#000;font-weight:300;text-align:left;font-size:12px;line-height:1.2rem;padding-top:10px;font-family: 'Roboto', sans-serif;' valign='top'>
              The new order <b>{orderId}</b> from the Customer <b>{name}</b> has been successfully placed. Please find the following details of the placed order below:.    </tr> </tbody></table></td> </tr> `;
            await getRepository('email_template').save(emailData);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
