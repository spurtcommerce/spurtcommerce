import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AlterCustomerRegistrationTemplate1726307730509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const emailData: any = await getRepository('email_template').findOne({ where: { emailTemplateId: 32 } });
        if (emailData) {
            emailData.content = `<p>Dear {name},<br>
&nbsp;</p>

<p>Thank you for expressing your interest and registering with <b> {storeName}</b>, your gateway to a smarter eCommerce experience.</p>

<p>We look forward to providing you with an exceptional shopping experience.</p>
<br>
<p>Best Regards, </p>
<p> <b>{storeName}</b></p>` ;
            emailData.dynamicFieldsRef = '{name},{storeName}';
            emailData.subject = 'Welcome to {storeName}! Your Regisration is successful';

            await getRepository('email_template').save(emailData);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
