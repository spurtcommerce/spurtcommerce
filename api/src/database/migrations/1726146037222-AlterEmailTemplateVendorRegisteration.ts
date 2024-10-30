import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class AlterEmailTemplateVendorRegisteration1726146037222 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const emailData: any = await getRepository('email_template').findOne({ where: { emailTemplateId: 11 } });
        if (emailData) {
            emailData.content = `<p>Dear {name},<br />
&nbsp;</p>

<p>Thank you for expressing your interest and signing up as a Seller with Spurt Cart..</p>

<p>Your Vendor registration is with the Admin for approval. Once approved by the Admin, you will be able to login to the Seller Panel.</p>

<p>Meanwhile, for any other information, visit {storeName}</p>
`;
            emailData.dynamicFieldsRef = '{name},{storeName}';
            emailData.subject = ' You just signed-up as a Seller with Spurt Cart ';

            await getRepository('email_template').save(emailData);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
