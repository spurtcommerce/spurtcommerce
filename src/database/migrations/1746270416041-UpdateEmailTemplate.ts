import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEmailTemplate1746270416041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE email_template
            SET message = '<h1
        style="font-size: 20px; line-height: 29px; font-weight: 600;margin: 0 0 12px 0;color:#1F2328;">
                Hi {name},<br>
                </h1>
            <p
                style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 24px 0;">
                We have received a request to change the email address associated with your account. To ensure the security of your account, we require verification.
                Please find below the One-Time Password (OTP) necessary to proceed with the email address change: <br><br>
                <b>OTP: {otp}</b> (Please do not share this OTP with anyone)<br> </p>
                <p style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 26px 0;">
		If you did not make this request, just ignore the email and we will forget this ever happened.
                </p>'
            WHERE id = 45;
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
