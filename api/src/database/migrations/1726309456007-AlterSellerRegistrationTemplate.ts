import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AlterSellerRegistrationTemplate1726309456007 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const emailData: any = await getRepository('email_template').findOne({ where: { emailTemplateId: 11 } });
        if (emailData) {
            emailData.content = `<p>Dear {name},<br />
&nbsp;</p>

<p>Thank you for expressing your interest and signing up as a seller with <b>{storeName}</b>.</p>

<p>Your Seller registration is currently under review by the admin. Once approved, you will receive further instructions.</p>`;
            emailData.dynamicFieldsRef = '{name},{storeName}';
            emailData.subject = 'You Just Signed Up as a Seller with {storeName}!';

            await getRepository('email_template').save(emailData);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
