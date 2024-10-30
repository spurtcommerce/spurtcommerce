import moment from 'moment';
import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AddChangeMailTemplateSeed1716373866003 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasTable('email_template');
        if (ifExist) {
            const templateStyle = `<td
            style="padding: 40px 0; border-width: 1px 0 1px 0; border-color:#D8DEE3; border-style: solid;">
            <h1
                style="font-size: 24px; line-height: 29px; font-weight: 600;margin: 0 0 12px 0;color:#1F2328;">
                Hello {name},
                </h1>
            <p
                style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 24px 0;">
                We've received a request to change your login Email Id. To proceed, please <br/>Enter the OTP:</p><br/><br/> {xxxxxx} <br/><br/>
            <p
                style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 26px 0;">
                If you didn’t mean to make this request, just ignore the email, and we’ll forget this ever happened.
                </p>
            <p
                style="font-size: 14px;line-height: 17px;color: #1F2328; margin: 0 0 5px 0;  font-weight: normal;">
                Regards,
                </p>
            <h3
                style="font-size: 14px;line-height: 17px;color: #1F2328; margin: 0 0 5px 0;  font-weight: 600;"> {6} Team,
                </h3>
        </td>`;
            const data = [
                {
                    emailTemplateId: undefined,
                    title: 'change_user_login_email',
                    subject: 'Change User Login Email',
                    content: templateStyle,
                    isActive: 1,
                    dynamicFieldsRef: '{name},{xxxxxx}',
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
