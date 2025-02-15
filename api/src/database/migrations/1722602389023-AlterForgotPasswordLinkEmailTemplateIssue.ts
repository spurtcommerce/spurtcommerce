import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class AlterForgotPasswordLinkEmailTemplateIssue1722602389023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const existData: any = await getRepository('email_template').findOne({ where: { emailTemplateId: 40 } });
        if (existData) {
            const data = `Dear {name},<br><br>
                        <p>We've received your request to reset your password.If you wish to change your password please click on the link given below.</p><br><a href={link}>Click Here</a> <br>
                        <p> for reset your password
                        <p>Regards,</p> <br>
                        <p>The Spurt Commerce Team </p>`;
            existData.content = data;

            await getRepository('email_template').update(existData.emailTemplateId, existData);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
