import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSupportTicketEmailTemplate1745297724392 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`INSERT INTO email_template
                (shortname,subject,message,dynamic_fields_ref)
                VALUES
                ('Ticket Closed',
                'Ticket Closed by Admin',
                'Dear {name},<br/><br/>
                <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
                  The ticket regarding  <strong>{subject}</strong> has been closed by Admin . Please find the details in Your support section.
                </p>',
                '{name},{subject}');`);

        await queryRunner.query(`UPDATE email_template
            SET message = 'Dear Admin,<br/><br/>
                <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
                <strong>{name}</strong> has raised a new support ticket regarding: <strong>{subject}</strong>.
                </p>

                <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
                Please review the ticket details and take appropriate action.
                </p>'
            WHERE id = 58 AND shortname = 'Support Request';`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
