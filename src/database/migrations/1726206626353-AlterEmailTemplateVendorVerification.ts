import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AlterEmailTemplateVendorVerification1726206626353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const emailData: any = await getDataSource().getRepository('email_template').findOne({ where: { emailTemplateId: 42 } });
        if (emailData) {
            emailData.content = `<p>Dear {name},<br />
&nbsp;</p>

<p>Thank you for expressing your interest and signing up as a Seller with Spurt Cart..</p>

<p>Your Vendor registration is with the Admin for approval. Once approved by the Admin, you will be able to login to the Seller Panel.</p>

<p>Meanwhile, for any other information,visit <a href="{storeName}">"{storeName}"</a></p>
`;
            await getDataSource().getRepository('email_template').save(emailData);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
