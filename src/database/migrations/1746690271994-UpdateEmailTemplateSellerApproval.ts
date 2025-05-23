import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEmailTemplateSellerApproval1746690271994 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE email_template
            SET message = '<h1
        style="font-size: 20px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color: #1F2328;">
        Hi {name},
    </h1><br><br>

    <p
    style="font-size: 16px; line-height: 24px; color: #1F2328; font-weight: normal; margin: 0 0 24px 0;">
    We are glad to inform you that you are now an Approved Seller on <b>{siteName}.</b><br><br>
    In your Seller Panel, now you can start adding products and start your selling business at <b>{siteName}.</b><br><br>
    Should you face any problems in adding products or using the SpurtCart Seller Panel, please feel free to contact our support team at
    <a href="{supportUrl}"><b>{supportUrl}</b></a>.
    We will be more than happy to assist you.<br><br>
    Alternatively, you may use the chat option on your dashboard to directly message the Admin in case of any urgent assistance required.<br>
    Wish you a wonderful Journey as a Seller on <b>{siteName}.</b>
    </p><br><br>'
            WHERE id = 15;
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
