import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AlterForgotPasswordLinkEmailTemplate1722429342058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const existData: any = await getDataSource().getRepository('email_template').findOne({ where: { emailTemplateId: 40 } });
        if (existData) {
            const data = `Dear {name},<br><br><p>We've received your request to reset your password.If you wish to change your password please click on the link given below.</p><br><a href= {link}>Click Here</a > <br><p> for reset your password < /p> <p>Regards,</p > <br><p>The Spurt Commerce Team </p>`;
            existData.content = data;

            await getDataSource().getRepository('email_template').update(existData.emailTemplateId, existData);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
