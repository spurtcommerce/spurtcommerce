import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AddOtpMailTemplatrSed1715775337231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.hasTable('email_template');
        if (exist) {
            const templateStyle = `<td
            style="padding: 40px 0; border-width: 1px 0 1px 0; border-color:#D8DEE3; border-style: solid;">
            <h1
                style="font-size: 24px; line-height: 29px; font-weight: 600;margin: 0 0 12px 0;color:#1F2328;">
                Hi,
                </h1>
            <p
                style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 24px 0;">
                Use the following one-time password (OTP) to sign in to your {appName} account. This OTP will be valid for {duration} hrs till {durationDetail}.
                </p>
            <h3
                style="font-size: 22px; font-weight: bold;line-height: 26px;color: #1F2328;margin: 0 0 32px 0;"> {3}
            </h2>
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
            const changeMailSeed = [{
                emailTemplateId: undefined,
                title: 'otp',
                subject: 'Verify your account with a one-time password.',
                dynamicFieldsRef: '{name}, {appName}, {duration}, {durationDetail}, {otp}, {appName}',
                content: templateStyle,
                isActive: 1,
            },
            ];
            await getRepository('email_template').save(changeMailSeed);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
