import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AlterEmailTemplateVendorVerifyMail1726149005488 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const emailData: any = await getDataSource().getRepository('email_template').findOne({ where: { emailTemplateId: 42 } });
        if (emailData) {
            emailData.content = `<p>Dear {name},</p>
<br>
<p> To proceed with the activation of your seller account, please click the link below to complete the verification process. This step is essential to ensure your account is set up correctly and securely.</p>
<br><a href= {link}>Click Here</a>  <br> <p> If you have any questions or need assistance, feel free to contact our support team.</pr>`;
            await getDataSource().getRepository('email_template').save(emailData);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
