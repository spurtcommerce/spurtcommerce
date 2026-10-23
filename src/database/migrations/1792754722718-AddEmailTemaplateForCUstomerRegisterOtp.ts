import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailTemaplateForCUstomerRegisterOtp1792754722718 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<void> {
        const existing = await queryRunner.query(
            `SELECT id FROM email_template WHERE id = 31 LIMIT 1`
        );

        if (existing.length === 0) {
            await queryRunner.query(
                `INSERT INTO email_template (
                    id,
                    shortname,
                    subject,
                    message,
                    is_active,
                    created_date,
                    modified_date,
                    created_by,
                    modified_by,
                    dynamic_fields_ref,
                    template_group
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    31,
                    'otp',
                    'Your OTP for email verification at {siteName}',
                    `<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi there,</h1>
<p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
Appreciate your first step towards becoming a <b>{type}</b> on <b>{appName}</b>.<br><br>
To get started, please verify your email using the one-time password (OTP) sent to you. Use the following OTP to verify your email and continue registering as a <b>{type}</b> on <b>{siteName}</b>. This OTP will be valid for only {duration} hours.<br><br>
</p>
<h2 style="font-size:22px; font-weight:bold; line-height:26px; color:#1F2328; margin:0 0 32px 0;">{3}</h2>
<p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 26px 0;">
If you did not make this request, you can safely ignore this email and no changes will be made to your account.
</p>`,
                    1,
                    '2025-12-09 14:16:59',
                    '2025-12-09 14:16:59',
                    null,
                    null,
                    '{name},{appName},{duration},{otp},{siteName}',
                    'buyer',
                ]
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM email_template WHERE id = 31 AND shortname = 'otp'`
        );
    }
}
