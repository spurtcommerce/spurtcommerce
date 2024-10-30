import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class AlterSellerVerificationTemplate1726465462272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const emailData: any = await getRepository('email_template').findOne({ where: { emailTemplateId: 42 } });
        if (emailData) {
            emailData.content = `<p>Dear {name},</p>
<br>
<p> To proceed with the activation of your seller account, please click the link below to complete the verification process. This step is essential to ensure your account is set up correctly and securely.</p>
<br><b><a href= {link}>Click Here</a></b>  <br> <p> If you have any questions or need assistance, feel free to contact our support team <b>{storeUrl}</b>.</pr>`;
            await getRepository('email_template').save(emailData);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
