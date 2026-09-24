import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEmailtemplateIds1765447292069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            UPDATE email_template
SET
    shortname = 'RFQ Submitted',
    subject = 'New Request for Quotation (RFQ) Submitted',
    message = '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Dear Vendor,</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 16px 0;">
    This is to inform you that <strong>{customerName}</strong> has submitted a new Request for Quotation (RFQ).
    </p>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 16px 0;">
    Please log in to your account to view the RFQ details and respond at your earliest convenience.<br>
    Best regards,<br>{companyName} Procurement Team
    </p>',
    is_active = 1,
    modified_date = NOW(),
    dynamic_fields_ref = '{customerName},{companyName}',
    template_group = 'seller'
WHERE id = 57;`);

        queryRunner.query(`
UPDATE email_template
SET
    shortname = 'RFQ Status Update',
    subject = 'Your Request for Quotation has been {rfqStatus}',
    message = '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {customerName},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    Your Request for Quotation (<strong>#{rfqNumber}</strong>) has been <strong>{rfqStatus}</strong>.<br>
    Please log in to your account to check the details.<br>
    Best regards,<br>{companyName} Team
    </p>',
    is_active = 1,
    modified_date = NOW(),
    dynamic_fields_ref = '{customerName},{rfqStatus},{rfqNumber}',
    template_group = 'buyer'
WHERE id = 58;`);

        queryRunner.query(`
UPDATE email_template
SET
    shortname = 'RFQ Modified Notification',
    subject = 'Your Request for Quotation has been modified',
    message = '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {customerName},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    Your Request for Quotation (<strong>#{rfqNumber}</strong>) has been modified by <strong>{sellerName}</strong>.<br>
    Please log in to your account to review the updated details.<br>
    Best regards,<br>{companyName} Team
    </p>',
    is_active = 1,
    modified_date = NOW(),
    dynamic_fields_ref = '{customerName},{rfqNumber},{sellerName},{companyName}',
    template_group = 'buyer'
WHERE id = 59;`);

        queryRunner.query(`
UPDATE email_template
SET
    shortname = 'Shopping List Modified',
    subject = 'Your shopping list has been updated',
    message = '<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color: #1F2328;">
    Hi {customerName},
    </h1>
    <p style="font-size: 16px; line-height: 24px; color: #1F2328; font-weight: normal; margin: 0 0 24px 0;">
    Your shopping list has been updated. Please log in to your account to review the latest changes.<br>
    Best regards,<br>
    {companyName} Team
    </p>',
    modified_date = NOW(),
    dynamic_fields_ref = '{customerName}',
    template_group = 'buyer'
WHERE id = 60;`);

        queryRunner.query(`
UPDATE email_template
SET
    shortname = 'New Quotation Received',
    subject = 'New Quotation Received',
    message = '<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color: #1F2328;">
    Hi {customerName},
    </h1>
    <p style="font-size: 16px; line-height: 24px; color: #1F2328; font-weight: normal; margin: 0 0 24px 0;">
    Your shopping list has been updated. Please log in to your account to review the latest changes.<br>
    Best regards,<br>
    {companyName} Team
    </p>',
    modified_date = NOW(),
    dynamic_fields_ref = '{customerName}',
    template_group = 'buyer'
WHERE id = 61;`);

        queryRunner.query(`
UPDATE email_template
SET
    shortname = 'Support Request',
    subject = 'Support ticket notification',
    message = 'Dear Vendor,<br><br>
    <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
    <strong>{name}</strong> has raised a new support ticket regarding: <strong>{subject}</strong>.
    </p>
    <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
    Please review the ticket details in your vendor portal and take appropriate action at the earliest.
    </p>
    <p style="margin-top: 20px;">Regards,<br/>Your Support Team</p>',
    modified_date = NOW(),
    dynamic_fields_ref = '{name},{subject}',
    template_group = 'seller'
WHERE id = 62;`);

        queryRunner.query(`
UPDATE email_template
SET
    shortname = 'Ticket Closed',
    subject = 'Ticket closed by admin',
    message = 'Dear {name},<br><br>
    <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
    The support ticket regarding <strong>{subject}</strong> has been closed by the admin. Please visit your support section to view the ticket details and resolution.<br>
    If you believe this ticket was closed in error or need further assistance, feel free to reopen the ticket or contact our support team.<br>
    Regards,<br>Your Support Team
    </p>',
    modified_date = NOW(),
    dynamic_fields_ref = '{name},{subject}',
    template_group = 'buyer'
WHERE id = 63;
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
