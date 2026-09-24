import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../loaders/typeormLoader';

export class AddLoginOTPTemplate1762404989918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.hasTable('email_template');
        if (exist) {
            const templateStyle = `<h2 style="font-size: 23px; line-height: 28px; font-weight: 600; margin: 0 0 16px 0; color:#1F2328;">
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
    This OTP will remain valid for the next <strong>{duration} {durationValue}</strong>.
    Please use it before it expires.
  </p>

  <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 14px 0;">
    If you did not request this OTP, you can safely ignore this email.
  </p>

  <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 24px 0;">
    For any assistance, feel free to reach out to us at
    <a href="{contactURL}" style="color:#0969DA; text-decoration:none; font-weight:600;">{contactURL}</a>.
  </p>

`;

    const changeMailSeed = [
        {
            emailTemplateId: 64,
            title: 'Login OTP Verification',
            subject: 'Verify your login',
            content: templateStyle,
            isActive: 1,
            dynamicFieldsRef: '{3},{appName},{duration},{contactURL}',
        },
    ];
            await getDataSource().getRepository('email_template').save(changeMailSeed);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM email_template WHERE Id = 64`);
    }
}
