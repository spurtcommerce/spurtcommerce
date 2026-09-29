import {MigrationInterface, QueryRunner} from 'typeorm';

export class UpdateConteactUsEmailTemplate1751433314017 implements MigrationInterface {

public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE email_template
            SET message = '
                <p>Dear Admin,</p><br/><br/>
                <p style="margin-bottom:.5em; margin: 0 0 10px 0; text-indent: 50px">
                    You have received a new enquiry. Here are the details:<br>Details:
                </p><br>
                <p>
                    <b>Name :</b> {name},<br>
                    <b>Email:</b> {email},<br>
                    <b>Phone Number :</b> {phoneNumber},<br>
                    <b>Company Name :</b> {companyName},<br>
                    <b>Message :</b> {message}.
                </p><br>
                <p>Please review and respond as necessary.</p>
            '
            WHERE id = 3
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
