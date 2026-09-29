import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class UpdateEMailTemplateWithNewContentRemainRecord1765269964300 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                INSERT INTO email_template
                (id, shortname, subject, message, is_active, created_date, modified_date, created_by, modified_by, dynamic_fields_ref, template_group)
                VALUES  (
    30,
    'Abandoned Cart Content',
    'Spurt Cart – you left items in your cart',
    'Dear {name},

<p>We noticed that you recently visited our online store and added some items to your shopping cart, but it looks like you did not complete your purchase. This is a friendly reminder about the items you left behind and to offer our help if you need it.</p>

<p>Here''s your cart details:</p>

{cartDetail}

<p>If you have any questions about the products, need help with checkout, or want more information, our customer support team is here for you. You can reach us via email at {supportEmail} or call us at {supportNumber}.</p>

<p>Click the link below to return to your cart and complete your purchase:</p>
{cartLink}

<p>Thank you for shopping with us.</p>

<p>Regards,<br>{storeName}</p>',
    1,
    NOW(),
    NOW(),
    NULL,
    NULL,
    '{name},{cartDetail},{supportEmail},{supportNumber},{cartLink},{storeName}',
    NULL
),

    (31, 'otp', 'Your OTP for email verification at {siteName}',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi there,</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    Appreciate your first step towards becoming a ""{type}"" on <b>{appName}</b>.<br><br>
    To get started, please verify your email using the one-time password (OTP) sent to you. Use the following OTP to verify your email and continue registering as a ""{type}"" on <b>{siteName}</b>. This OTP will be valid for only {duration} hours.<br><br>
    </p>
    <h2 style="font-size:22px; font-weight:bold; line-height:26px; color:#1F2328; margin:0 0 32px 0;">{3}</h2>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 26px 0;">
    If you did not make this request, you can safely ignore this email and no changes will be made to your account.
    </p>',
    1, NOW(), NOW(), NULL, NULL, '{name},{appName},{duration},{otp},{siteName}', 'buyer'),

    (32, 'customer_register', 'Welcome to {storeName}! Your Registration is successful',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    Thank you for registering with <b>{storeName}</b>, your gateway to a smarter eCommerce experience. We are excited to have you with us and look forward to providing you with an exceptional shopping experience.<br>
    You can now log in to your account, explore our products, and start shopping anytime.<br>
    Best regards,<br/>
    Team {storeName}
    </p>',
    1, NOW(), NOW(), NULL, NULL, '{name},{storeName}', 'buyer'),

    (40, 'Forgot password link', 'Reset your password',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    We have received a request to change the password for your account. To proceed, please click the link below to reset your password:<br><br>
    <b><a href={link} style="display:block; text-decoration:none; padding:16px 40px; background-color:#027600; border-radius:6px; color:#FFFFFF; font-size:16px; line-height:20px; width:fit-content; margin:auto;">{reset_link}</a></b><br>
    If you did not request a password change, you can safely ignore this email and your password will remain unchanged.<br/>
    Best regards,<br/>
    Support Team.
    </p>',
    1, NOW(), NOW(), NULL, NULL, '{name},{link}', 'buyer'),

    (41, 'change_user_login_email', 'Change User Login Email',
    '<h1 style="font-size:24px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    We have received a request to change the login email ID for your account. To proceed with this change, please enter the one-time password (OTP) given below:<br><br>
    <b>{xxxxxx}</b>
    </p>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 26px 0;">
    If you did not request this change, you can safely ignore this email and no changes will be made to your account.<br/><br/>
    Best regards,<br/>
    Support Team.
    </p>',
    1, NOW(), NOW(), NULL, NULL, '{name},{xxxxxx}', 'buyer'),

    (42, 'Vendor Email Verification', 'Your Seller Registration has been activated by {siteName} Admin',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    We are glad to inform you that your seller registration has been activated by the admin.<br>
    As the next step, you need to verify your seller credentials. Please click the link below, where you will be asked to enter the email ID and password you used while signing up as a seller.<br><br>
    Click here: <b><a href="{link}" style="display:block; text-decoration:none; padding:16px 40px; background-color:#027600; border-radius:6px; color:#FFFFFF; font-size:16px; line-height:20px; width:fit-content; margin:auto;">{verification_link}</a></b><br>
    Once you provide the correct credentials, your verification will be complete and you can start your seller onboarding process by logging into your seller panel.<br>
    Wish you the best at <b>{storeName}</b>.<br>
    Best regards,<br>{storeName} Team
    </p>',
    1, NOW(), NOW(), NULL, NULL, '{name},{link},{verification_link},{storeName}', NULL),

    (43, 'Admin Product Reject', 'Product Rejected',
    '<h3 style="font-weight:bold; font-size:20px; color:#131921; margin-bottom:16px; font-family:Roboto, sans-serif; line-height:24px;">Hello {name},</h3>
    <p style="color:#222222; font-size:16px; line-height:27px; font-family:Roboto, sans-serif; padding-bottom:32px;">
    We regret to inform you that your product request has been rejected for the following reason:
    </p>
    <p style="font-size:18px; line-height:22px;">
    <ul>
    <li>{XXXXXX}</li>
    </ul>
    </p>
    <p style="color:#222222; font-size:16px; line-height:27px; font-family:Roboto, sans-serif; padding-bottom:32px;">
    If you did not submit this product request or believe this is a mistake, please contact our support team immediately for further assistance.<br>
    Best regards,<br>Support Team
    </p>
    <p style="border-bottom:1px solid #f0f0f0;"></p>',
    1, NOW(), NOW(), NULL, NULL, '{XXXXXX},{name}', NULL),

    (44, 'Vendor Onboard Rejection', 'Rejection of seller onboarding request',
    '<h1 style="font-size:24px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    We regret to inform you that your onboarding request as a seller at {appName} has been rejected for the following reasons:
    </p>
    <div style="padding:16px; background-color:#F9F9FC; margin:0 0 24px 0;">
    <h2 style="color:#1F2328; font-size:17px; line-height:24px; font-weight:600; margin:0 0 8px 0;">Reasons:</h2>
    <p style="font-size:14px; line-height:18px; color:#262626; font-weight:normal; margin:0;">{comments}</p>
    </div>
    <p>If you have any questions or believe this decision was made in error, please contact our support team for further clarification.<br><br>
    Best regards,<br>Support Team
    </p>',
    1, NOW(), NOW(), NULL, NULL, '{name},{appName},{comments}', NULL),

    (45, 'change_mail', 'Change your mail with a one-time password.',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    We have received a request to change the email address associated with your account. To ensure the security of your account, please use the one-time password (OTP) below to proceed with the email change:<br><br>
    <b>OTP: {otp}</b> (Please do not share this OTP with anyone)<br>
    </p>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 26px 0;">
    If you did not make this request, you can safely ignore this email and no changes will be made to your account.<br>
    Best regards,<br>Support Team
    </p>',
    1, NOW(), NOW(), NULL, NULL, '{name},{otp},{companyName}', 'seller'),

    (47, 'Vendor Verification Success', 'Congratulations! Your Seller Onboarding Request is approved!',
    '<h2><strong>Hi {name},</strong></h2>
    <p>Congratulations! Your seller onboarding request submitted to the {companyName} marketplace has been approved. You can now access your seller panel, start building your catalog, and explore all the available features.</p>
    <p>Happy Selling!</p>
    <p>Regards,</p>
    <h3><strong>{companyName} Team</strong></h3>
    <p><a href="{vendorUrl}">{vendorUrl}</a></p>',
    1, NOW(), NOW(), NULL, NULL, '{name},{companyName},{vendorUrl}', 'seller'),

    (48, 'vendor_contact', 'Request from store customer',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    You have received a new request from a store customer with the following details:<br><br>
    <b>DETAILED REQUIREMENTS:</b><br>{userRequirements}<br><br>
    <b>Full Name:</b> {FullName}<br>
    <b>Email ID:</b> {EmailId}<br>
    <b>Attachments:</b> attachments included<br><br>
    Please review the customer’s requirements and respond at the earliest convenience.<br><br>
    Regards,<br>Store Support Team
    </p>', 1, NOW(), NOW(), NULL, NULL, '{name},{productName},{userRequirements},{FullName},{EmailId}', 'seller'),

    (49, 'Customer Backorder Content', 'Order confirmation – back order for {productName}',
    '<h1 style="font-size:24px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 40px 0;">
    Thank you for your order. The product <b>{productName}</b> is currently out of stock and has been placed on back order.<br><br>
    We appreciate your patience as we work to fulfill your order. You will receive a notification as soon as the product is back in stock and ready for shipment.<br><br>
    Best regards,<br>Customer Support Team
    </p>', 1, NOW(), NOW(), NULL, NULL, '{name},{productName}', 'buyer'),

    (50, 'Admin Backorder Content', 'Order notification – back order for {productName}',
    '<h1 style="font-size:24px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 40px 0;">
    This is to inform you that a customer has placed an order for <b>{productName}</b>, which is currently out of stock. The order has been placed on back order with the following details:<br>
    <b>Order Id:</b> {orderId}<br>
    <b>Customer Name:</b> {customerName}<br>
    <b>Customer Mail:</b> {customerMail}<br>
    <b>Quantity:</b> {quantity}<br><br>
    Please prepare to fulfill the order once the product is back in stock.<br>
    Thank you for your attention!<br>Best regards,<br>Support Team
    </p>', 1, NOW(), NOW(), NULL, NULL, '{name},{orderId},{customerName},{customerMail},{quantity},{productName}', 'seller'),

    (51, 'Product Create Admin Intimation', 'New Product Created by {sellerName}: {productName}',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    We would like to inform you that <b>{sellerName}</b> has just created a new product listing, <b>{productName}</b>, on the platform.<br><br>
    Please review the product details and ensure it meets all the necessary criteria for approval. If any discrepancies or issues are found during the review, kindly reach out to the seller for corrections or updates.<br><br>
    Let us ensure that the product is ready to go live at the earliest.
    </p>', 1, NOW(), NOW(), NULL, NULL, '{name},{sellerName},{productName}', 'seller'),

    (52, 'Seller KYC Submitted Intimation to Admin', 'KYC Submission Notification',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    A seller has submitted their KYC documentation for verification. Please review the submitted documents at your earliest convenience.<br><br>
    <b>Seller Details:</b><br>
    <b>Seller Name:</b> {sellerName}<br>
    <b>Seller Id:</b> {sellerId}<br>
    <b>Submission Date:</b> {submissionDate}<br><br>
    Thank you for your prompt attention to this verification.<br>
    Regards,<br>Compliance Team
    </p>', 1, NOW(), NOW(), NULL, NULL, '{sellerName},{sellerId},{submissionDate}', NULL),

    (53, 'Seller KYC Submitted Intimation to Seller', 'KYC submission confirmation',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    Thank you for submitting your KYC documentation. Your documents have been received and are currently under review. We will notify you once the verification process is complete.<br><br>
    If you have any questions in the meantime, please feel free to reach out to our support team.<br><br>
    Regards,<br>Compliance Team
    </p>', 1, NOW(), NOW(), NULL, NULL, '{name}', NULL),

    (54, 'Seller KYC Approval Email', 'KYC Status Update',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    We are pleased to inform you that your KYC documentation has been successfully approved. You now have full access to all features of your seller account.<br><br>
    Thank you for your cooperation. If you have any further questions or need assistance, please do not hesitate to reach out to our support team.<br><br>
    Regards,<br>Compliance Team
    </p>', 1, NOW(), NOW(), NULL, NULL, '{name}', NULL),

    (55, 'Seller KYC Reject Email', 'Important: KYC Rejection Update',
    '<h1 style="font-size:24px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    We regret to inform you that your KYC documentation has been rejected. Please review the following reasons for the rejection:<br><br>
    </p>
    <div style="padding:16px; background-color:#F9F9FC; margin:0 0 24px 0;">
    <p style="font-size:14px; line-height:18px; color:#262626; font-weight:normal; margin:0;">{comments}</p><br>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    To proceed, kindly resubmit the necessary documents for verification. If you have any questions or need assistance, feel free to contact our support team.<br>
    Regards,<br>Compliance Team
    </p>
    </div>', 1, NOW(), NOW(), NULL, NULL, '{name},{comments}', NULL),

    (56, 'Seller sign-up', 'You just signed-up as a Seller with {siteName}',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {name},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    Thank you for expressing your interest and signing up as a seller with <b>{siteName}</b>.<br><br>
    Your seller registration is currently with the admin for approval. Once it is approved, you will be able to log in to your seller panel and start managing your products. If you have any questions, feel free to reach out to our support team.<br><br>
    Regards,<br>{siteName} Team
    </p>', 1, NOW(), NOW(), NULL, NULL, '{name},{siteName}', 'seller'),

    (59, 'RFQ Submitted', 'New Request for Quotation (RFQ) Submitted',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Dear Vendor,</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 16px 0;">
    This is to inform you that <strong>{customerName}</strong> has submitted a new Request for Quotation (RFQ).
    </p>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 16px 0;">
    Please log in to your account to view the RFQ details and respond at your earliest convenience.<br>
    Best regards,<br>{companyName} Procurement Team
    </p>', 1, NOW(), NOW(), NULL, NULL, '{customerName},{companyName}', 'seller'),

    (60, 'RFQ Status Update', 'Your Request for Quotation has been {rfqStatus}',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {customerName},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    Your Request for Quotation (<strong>#{rfqNumber}</strong>) has been <strong>{rfqStatus}</strong>.<br>
    Please log in to your account to check the details.<br>
    Best regards,<br>{companyName} Team
    </p>', 1, NOW(), NOW(), NULL, NULL, '{customerName},{rfqStatus},{rfqNumber}', 'buyer'),

    (61, 'RFQ Modified Notification', 'Your Request for Quotation has been modified',
    '<h1 style="font-size:20px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">Hi {customerName},</h1>
    <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 24px 0;">
    Your Request for Quotation (<strong>#{rfqNumber}</strong>) has been modified by <strong>{sellerName}</strong>.<br>
    Please log in to your account to review the updated details.<br>
    Best regards,<br>{companyName} Team
    </p>', 1, NOW(), NOW(), NULL, NULL, '{customerName},{rfqNumber},{sellerName},{companyName}', 'buyer'),

    (62, 'Shopping List Modified', 'Your shopping list has been updated',
    '<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color: #1F2328;">
    Hi {customerName},
    </h1>
    <p style="font-size: 16px; line-height: 24px; color: #1F2328; font-weight: normal; margin: 0 0 24px 0;">
    Your shopping list has been updated. Please log in to your account to review the latest changes.<br>
    Best regards,<br>
    {companyName} Team
    </p>', NULL, NOW(), NOW(), NULL, NULL, '{customerName}', 'buyer'),

    (63, 'New Quotation Received', 'New Quotation Received',
    '<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color: #1F2328;">
    Hi {customerName},
    </h1>
    <p style="font-size: 16px; line-height: 24px; color: #1F2328; font-weight: normal; margin: 0 0 24px 0;">
    Your shopping list has been updated. Please log in to your account to review the latest changes.<br>
    Best regards,<br>
    {companyName} Team
    </p>', NULL, NOW(), NOW(), NULL, NULL, '{customerName}', 'buyer'),

    (57, 'Support Request', 'Support ticket notification',
    'Dear Vendor,<br><br>
    <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
    <strong>{name}</strong> has raised a new support ticket regarding: <strong>{subject}</strong>.
    </p>
    <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
    Please review the ticket details in your vendor portal and take appropriate action at the earliest.
    </p>
    <p style="margin-top: 20px;">Regards,<br/>Your Support Team</p>', NULL, NOW(), NOW(), NULL, NULL, '{name},{subject}', 'seller'),

    (58, 'Ticket Closed', 'Ticket closed by admin',
    'Dear {name},<br><br>
    <p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px">
    The support ticket regarding <strong>{subject}</strong> has been closed by the admin. Please visit your support section to view the ticket details and resolution.<br>
    If you believe this ticket was closed in error or need further assistance, feel free to reopen the ticket or contact our support team.<br>
    Regards,<br>Your Support Team
    </p>', NULL, NOW(), NOW(), NULL, NULL, '{name},{subject}', 'buyer'),

    (64, 'Login OTP Verification', 'Verify your login',
    '<h2 style="font-size: 23px; line-height: 28px; font-weight: 600; margin: 0 0 16px 0; color:#1F2328;">
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
    <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 24px 0;">
    For any assistance, feel free to reach out to us at
    <a href="{contactURL}" style="color:#0969DA; text-decoration:none; font-weight:600;">{contactURL}</a>.
    </p>', 1, NOW(), NOW(), NULL, NULL, '{3},{appName},{duration},{contactURL}', NULL),

    (65, 'Subscription Cancelled', 'Your subscription has been cancelled',
    '<h2 style="font-size: 23px; line-height: 28px; font-weight: 600; margin: 0 0 16px 0; color:#1F2328;">
    Hi {name},
    </h2>
    <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 14px 0;">
    Your subscription <strong>{subscriptionName}</strong> has been successfully cancelled.
    </p>
    <h3 style="font-size: 20px; line-height: 26px; font-weight: 700; color:#1F2328; margin: 16px 0 10px 0;">
    Cancellation Summary:
    </h3>
    <br/>
    <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 6px 0;">
    <strong>Cancelled On:</strong> {date}
    </p>
    <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 14px 0;">
    <strong>Reason:</strong> {cancelReason}
    </p>
    <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 20px 0;">
    Your access will remain active until <strong>{expiryDate}</strong>. After this date, your subscription benefits will no longer be available.
    <br/>
    If you have any questions or would like to reactivate in the future, please contact our support team.
    </p>', NULL, NOW(), NOW(), NULL, NULL, '{name},{subscriptionName},{date},{cancelReason},{expiryDate}', NULL),

    (
    66,
    'Subscription Created',
    'Your subscription has been activated',
    '<h2 style="font-size: 23px; line-height: 28px; font-weight: 600; margin: 0 0 16px 0; color:#1F2328;">
        Hi {name},
    </h2>

    <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 14px 0;">
        Welcome! Your subscription <strong>{subscriptionName}</strong> has been successfully created.
    </p>

    <h3 style="font-size: 20px; line-height: 26px; font-weight: 700; color:#1F2328; margin: 16px 0 10px 0;">
        Subscription Details:
    </h3>

    <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 6px 0;">
        <strong>Start Date:</strong> {startDate}
    </p>

    <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 6px 0;">
        <strong>Next Billing Date:</strong> {nextBillingDate}
    </p>

    <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 14px 0;">
        You now have full access to all features included in your <strong>{subscriptionName}</strong> plan.
        Your subscription will renew automatically unless cancelled before the next billing date.
        If you have any questions or need assistance, please contact our support team.
    </p>',
    NULL,
    NOW(),
    NOW(),
    NULL,
    NULL,
    '{name},{subscriptionName},{startDate},{nextBillingDate}',
    NULL
);`);

        await queryRunner.createForeignKey('vendor_email_template', new TableForeignKey({
            columnNames: ['email_template_id'],
            referencedTableName: 'email_template',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            name: 'FK_email_template_vendor_email_template_id',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
