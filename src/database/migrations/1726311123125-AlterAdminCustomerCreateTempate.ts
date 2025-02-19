import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AlterAdminCustomerCreateTempate1726311123125 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const emailData: any = await getRepository('email_template').findOne({ where: { emailTemplateId: 4 } });
        if (emailData) {
            emailData.content = `Dear {name},<br><br>
            <p>We are pleased to inform you that you have been added as a customer at <b>{storeName}</b>. Here are your login credentials: </p><br>
              <p><b>User ID :</b> {username}<br>
              <b>Password :</b> {password}</p> <br>
              <p> You can log in using the above credentials.
Wishing you the best eCommerce experience with <b>{storeName}</b>. </p>`;
            emailData.dynamicFieldsRef = '{name},{storeName},{username},{password}';
            emailData.subject = 'Customer Login created successfully';

            await getRepository('email_template').save(emailData);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
