import moment from 'moment';
import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AddDataEmailTemplate1716011566603 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasTable('email_template');
        if (ifExist) {
            const data = [
                {
                    emailTemplateId: 40,
                    title: 'Forgot password link',
                    subject: 'Forgot password link',
                    content: 'Dear {name},                     <br><br><p>We`ve received your request to reset your password. If you wish to change your password please click on the link given below.</p>                    <br><a href= {link}>Click Her</a>                    <br><p> for reset your password </p> <p>Regards,</p> <br><p>The Spurt Commerce Team</p>',
                    isActive: 1,
                    dynamicFieldsRef: '{name},{link}',
                    createdDate: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
            ];
            await getRepository('email_template').save(data);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
