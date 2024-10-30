import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class UpdateForgotPasswordLinkContant1718606500309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const existData: any = await getRepository('email_template').findOne({ where: { emailTemplateId: 23 } });
        if (existData) {
            const data = `Dear {name}, <p>We've received a request to change your login
        password. To proceed, please Click THe Below Link
        to verify your identity:</p> \n
        <a href="{link}"> Click Here</a> <p> for reset your password </p> \n
        <p>Regards,</p>\n
        <p>{appName} Team</p>`;
            existData.content = data;

            await getRepository('email_template').update(existData.emailTemplateId, existData);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
