import { MigrationInterface, QueryRunner } from 'typeorm';

export class SignInEmailTemplate1766401120111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE email_template
            SET message = '
                    <h2 style="font-size: 23px; line-height: 28px; font-weight: 600; margin: 0 0 16px 0; color:#1F2328;">
                    Hi,
                    </h2>

                    <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 14px 0;">
                    Thank you for logging in to <strong>{appName}</strong> as a <strong>{type}</strong>.
                    Please verify your login by entering the One-Time Password (OTP) shown below:
                    </p>

                    <h3 style="font-size: 24px; line-height: 30px; font-weight: 700; color:#1F2328; margin: 16px 0;">
                    {3}
                    </h3>

                    <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 14px 0;">
                    This OTP will remain valid for the next <strong>{duration} {durationValue}</strong>. Please use it before it expires.
                    </p>

                    <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 14px 0;">
                    If you did not request this OTP, you can safely ignore this email.
                    </p>
                   '
            WHERE id = 64
        `);

        await queryRunner.query(`
            Update email_template
            set message = '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi there,</h1>
            <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
            Appreciate your first step towards becoming a <b>{type}</b> on <b>{appName}</b>.<br><br>
            To get started, please verify your email using the one-time password (OTP) sent to you. Use the following OTP to verify your email and continue registering as a <b>{type}</b> on <b>{siteName}</b>. This OTP will be valid for only {duration} hours.<br><br>
            </p>
            <h2 style="font-size:22px; font-weight:bold; line-height:26px; color:#1F2328; margin:0 0 32px 0;">{3}</h2>
            <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 26px 0;">
            If you did not make this request, you can safely ignore this email and no changes will be made to your account.
            </p>'
           WHERE id = 31
           `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
