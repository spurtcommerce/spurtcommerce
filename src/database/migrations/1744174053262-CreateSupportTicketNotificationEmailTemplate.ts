import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSupportTicketNotificationEmailTemplate1744174053262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`INSERT INTO email_template
                (shortname,subject,message,dynamic_fields_ref)
                VALUES
                ('Support Request',
                'Support Ticket Notification',
                'Dear Vendor,<br/><br/>
                <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
                <strong>{name}</strong> has raised a new support ticket regarding: <strong>{subject}</strong>.
                </p>

                <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
                Please review the ticket details and take appropriate action.
                </p>

                <p style="margin-top: 20px;">Regards,<br/>Your Support Team</p>',
                '{name},{subject}');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
