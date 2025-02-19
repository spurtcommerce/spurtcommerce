import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAdminCreateUserTemplate1726467388219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const emailData: any = await getRepository('email_template').findOne({ where: { emailTemplateId: 7 } });
        if (emailData) {
            emailData.content = ` <p>Dear {name}, <br />
            &nbsp;</p><p>We are pleased to inform you that you have been added as an admin user in <b>{storeName}</b>. Here are your login credentials:</p>
            <p><b>User ID :</b> {username}</p>
            <p><b>Password :</b> {password}</p>
            <p>&nbsp;</p><p>You can log in using the above credentials and begin your journey as an 'Additional Admin User' at <b>{storeName}</b>.</p><p>&nbsp;</p>`;
            emailData.dynamicFieldsRef = '{name},{storeName},{username},{password},{storeName}';
            emailData.subject = 'Login Credentials for Additional Admin User';

            await getRepository('email_template').save(emailData);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
