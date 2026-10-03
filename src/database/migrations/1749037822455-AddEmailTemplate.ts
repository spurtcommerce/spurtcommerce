import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailTemplate1749037822455 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO email_template (shortname, subject, message, dynamic_fields_ref) VALUES (
          'RFQ Submitted',
          'New Request for Quotation (RFQ) Submitted',
          '<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color: #1F2328;">Dear Vendor,</h1>
           <p style="font-size: 16px; line-height: 24px; color: #1F2328; font-weight: normal; margin: 0 0 16px 0;">
             We would like to inform you that <strong>{customerName}</strong> has submitted a new Request for Quotation (RFQ).
           </p>
           <p style="font-size: 16px; line-height: 24px; color: #1F2328; font-weight: normal; margin: 0 0 16px 0;">
             Please log in to your account to view the details and respond at your earliest convenience.
           </p>',
          '{customerName}'
        );`);

        await queryRunner.query(`INSERT INTO email_template (shortname, subject, message, dynamic_fields_ref) VALUES (
          'RFQ Status Update',
          'Your Request for Quotation has been {rfqStatus}',
          '<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color: #1F2328;">
             Hi {customerName},
           </h1>
           <p style="font-size: 16px; line-height: 24px; color: #1F2328; font-weight: normal; margin: 0 0 24px 0;">
             Your Request for Quotation (<strong>#{rfqNumber}</strong>) has been <strong>{rfqStatus}</strong>.
             Please log in to your account to check the details.
           </p>',
          '{customerName},{rfqStatus},{rfqNumber}'
        );`);

        await queryRunner.query(`INSERT INTO email_template (shortname, subject, message, dynamic_fields_ref) VALUES (
          'RFQ Modified Notification',
          'Your Request for Quotation Has Been Modified',
          '<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color: #1F2328;">
             Hi {customerName},
           </h1>
           <p style="font-size: 16px; line-height: 24px; color: #1F2328; font-weight: normal; margin: 0 0 24px 0;">
             It looks like your Request for Quotation (<strong>#{rfqNumber}</strong>) has been modified by <strong>{sellerName}</strong>.
             Please check the details by logging in to your account.
           </p>',
          '{customerName},{rfqNumber},{sellerName}'
        );`);

        await queryRunner.query(`INSERT INTO email_template (shortname, subject, message, dynamic_fields_ref) VALUES (
          'Shopping List Modified',
          'Your Shopping List Has Been Updated',
          '<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color: #1F2328;">
             Hi {customerName},
           </h1>
           <p style="font-size: 16px; line-height: 24px; color: #1F2328; font-weight: normal; margin: 0 0 24px 0;">
             Your shopping list has been modified. Please log in to your account to view the changes.
           </p>',
          '{customerName}'
        );`);

        await queryRunner.query(`INSERT INTO email_template (shortname, subject, message, dynamic_fields_ref) VALUES (
          'New Quotation Received',
          'New Quotation Received',
          '<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color: #1F2328;">
             Hi {customerName},
           </h1>
           <p style="font-size: 16px; line-height: 24px; color: #1F2328; font-weight: normal; margin: 0 0 24px 0;">
             A vendor has created a new quotation for you.<br><br>
             Please log in to your account to view the quotation details and proceed accordingly.
           </p>',
          '{customerName}'
        );`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
