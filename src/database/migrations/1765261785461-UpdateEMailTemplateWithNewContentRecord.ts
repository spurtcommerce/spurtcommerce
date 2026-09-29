import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateEMailTemplateWithNewContentRecord1765261785461 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            INSERT INTO email_template
            (id, shortname, subject, message, is_active, created_date, modified_date, created_by, modified_by, dynamic_fields_ref, template_group)
            VALUES
            (1, 'Register Content', 'Registration successful – welcome to {storeName}',
            '<h1 style="font-size: 20px; line-height: 29px; font-weight: 600;margin: 0 0 12px 0;color:#1F2328;">Hi {name},</h1>
            <p style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 24px 0;">
            Thank you for signing up with <b>{storeName}</b> - your gateway to a smarter, more seamless eCommerce experience.<br>
            We’re excited to have you with us and look forward to delivering an exceptional shopping journey every time you visit.<br>
            </p>',
            1, NOW(), NOW(), NULL, NULL, '{name}', 'buyer'),

            (2, 'Forgot Password Content', 'Reset your {storeName} password',
            'Dear {name},<br/><br/>
            <p style="margin-bottom:.5em; margin: 0 0 10px 0; text-indent: 50px;">
            Your password has been reset successfully. Your new temporary password is: {xxxxxx}<br/><br/>
            For your security, please sign in and change this password to one of your choice at the earliest.
            </p>',
            1, NOW(), NOW(), NULL, NULL, '{name},{xxxxxx}', 'seller'),

            (3, 'Contact Content', 'New enquiry received via Contact Us',
            '<p>Dear Admin,</p><br/><br/>
            <p style="margin-bottom:.5em; margin: 0 0 10px 0; text-indent: 50px;">
            You have received a new enquiry through the Contact Us form. Below are the details:<br>
            </p><br>
            <p>
                <b>Name :</b> {name},<br>
                <b>Email:</b> {email},<br>
                <b>Phone Number :</b> {phoneNumber},<br>
                <b>Company Name :</b> {companyName},<br>
                <b>Message :</b> {message}.
            </p><br>
            <p>Please review this enquiry and respond as appropriate.</p>',
            1, NOW(), NOW(), NULL, NULL, '{name},{phoneNumber},{email},{message}', 'seller'),

            (4, 'Create Customer Content', 'Customer Login created successfully',
            'Dear {name},<br><br>
            <p> Welcome to <b>{storeName}</b>! Your customer account has been created successfully.Here are your login credentials: </p><br>
              <p><b>User ID :</b> {username}<br>
              <b>Temporary password :</b> {password}</p> <br>
              <p> You can now log in using these credentials and start shopping. For security, please change your password after your first login. Wishing you a smooth and enjoyable eCommerce experience with <b>{storeName}</b>. </p>',
            1, NOW(), NOW(), NULL, NULL, '{name},{storeName},{username},{password}', 'buyer'),

            (5, 'Customer Order Content', 'Details of your recent Order',
            '<h1 style="font-size: 24px; line-height: 29px; font-weight: 600;margin: 0 0 12px 0;color:#1F2328;">Hi {name},</h1>
            <p style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 40px 0;">
            Thank you for your purchase! Your order has been placed successfully.
            Here are the details of your order below for your reference.
            </p>',
            1, NOW(), NOW(), NULL, NULL, '{name}', 'buyer'),

            (6, 'Admin Mail Content', 'New order placed – {orderId}', '<h1 style=\"font-size: 24px; line-height: 29px; font-weight: 600;margin: 0 0 12px 0;color:#1F2328;\">Hi {adminname},</h1><p style=\"font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 40px 0;\">A new order <b>{orderId}</b> has been successfully placed by customer <b>{name}</b>. Please review the order details in the admin panel and process it at the earliest.</p>', 1, NOW(), NOW(), NULL, NULL, '{adminname},{orderId},{name}', 'seller'),

(7,
'Create admin user Content',
'Login credentials for your admin access',
'<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color:#1F2328;">
  Hi {name},
</h1>
<br>

<p style="font-size: 16px; line-height: 24px; color:#1F2328; font-weight: normal; margin: 0 0 24px 0;">
  You have been added as an admin user in <b>{storeName}</b>. Here are your login credentials:<br><br>
  <b>User ID:</b> {username}<br>
  <b>Temporary password:</b> {password}<br><br>
  You can now log in with these credentials and start managing the store as an additional admin user.
  For security, please change your password after your first login.
</p>
<br>',
1, NOW(), NOW(), NULL, NULL,
'{name},{storeName},{username},{password}',
'fullfilled'),

(9,
'Oauth register mail',
'Subject: Welcome to SpurtCommerce – login details',
'Dear {name},<br/><br/>
<p style="margin-bottom: .5em; margin: 0 0 10px 0; text-indent: 50px;">
  Thank you for signing up with SpurtCommerce.<br/><br/>
  For your next login, you can either:<br/><br/>
  Use this temporary password: {xxxxxx},<br/><br/>
  or continue signing in easily via your preferred OAuth provider
  (Google, LinkedIn, etc.).<br/><br/>
  For security, please change your password after logging in with the temporary password.
</p>',
1, NOW(), NOW(), NULL, NULL,
'{name},{xxxxxx}',
NULL),

(11,
'vendor Registration',
'Welcome – your Seller Panel is now active',
'<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color:#1F2328;">
  Hi {name},
</h1>
<br><br>

<p style="font-size: 16px; line-height: 24px; color:#1F2328; font-weight: normal; margin: 0 0 24px 0;">
  Great news! You’re now a registered seller on <b>{siteName}</b>, and you can log in to your Seller Panel.<br><br>
  Once inside, you can:<br/><br/>
  • Create and complete your seller profile<br><br/>
  • Upload and submit your documents for verification to become a Verified Seller<br/><br/>
  If you face any issues while filling your profile or uploading documents, please contact our support team at
  <a href="{siteUrl}" style="color:#0969DA; font-weight:600;">{siteUrl}</a>.
  We will be happy to assist you.<br><br/>
  Wishing you a successful journey as a seller on <b>{siteName}</b>.
</p>
<br>',
1, NOW(), NOW(), NULL, NULL,
'{name},{siteName},{siteUrl}',
'seller'),

(12,
'admin notification for vendor registration',
'New Seller Registration Completed: {sellerName}',
'<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin:0 0 12px 0; color:#1F2328;">
  Hi {name},
</h1><br><br>

<p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 24px 0;">
  We’re pleased to inform you that <b>{sellerName}</b> has successfully registered as a Seller on <b>{siteName}</b>.<br>
  The Seller Panel has been activated, and the seller can now create their profile and submit the required documents for verification to become a Verified Seller.<br><br>

  Please monitor their profile completion and document submission as part of the verification process.<br>
  If any issues arise, kindly provide assistance or notify the support team to ensure a quick resolution.<br><br>

  Let’s work together to make the seller’s onboarding experience on <b>{siteName}</b> smooth and successful.
</p><br>

<p>Best Regards,<br>
The {siteName} Team</p>',
1, NOW(), NOW(), NULL, NULL,
'{name},{sellerName},{siteName}',
NULL),

(13,
'vendor creation',
'Vendor Account Created on Spurtcommerce',
'Dear {name},<br/><br/>
We’re glad to inform you that Spurtcommerce has added you as a Vendor.<br><br>
Here are your login credentials for accessing the application:<br><br>

<p style="margin: 0 0 10px 0;">User ID: {username}</p>
<p style="margin: 0 0 10px 0;">Password: {password}</p><br>

<p style="margin: 0 0 10px 0; text-indent: 50px;">
  You may log in using the above credentials to start managing your products and vendor account.
</p>

<p>Best regards,<br>
The Spurtcommerce Team</p>',
1, NOW(), NOW(), NULL, NULL,
'{name},{username},{password}',
NULL),

(15,
'vendor login Request',
'Congratulations! You’re Now an Approved Seller on {siteName}',
'<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin:0 0 12px 0; color:#1F2328;">
  Hi {name},
</h1><br><br>

<p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 24px 0;">
  Congratulations! You are now an Approved Seller on <b>{siteName}</b>.<br><br>
  Your Seller Panel is now active — you can start adding products and begin your selling journey on <b>{siteName}</b> right away.<br><br>

  If you face any issues while adding products or using the Seller Panel, please reach out to our support team at
  <a href="{supportUrl}" style="color:#0969DA; font-weight:600;">{supportUrl}</a>.
  We’ll be happy to help.<br><br>

  You can also use the chat option on your dashboard to message the Admin directly for any urgent assistance.<br>
  Wishing you great success as you grow your business with <b>{siteName}!</b>
</p><br><br>

<p>Best regards,<br>
The {siteName} Team</p>',
1, NOW(), NOW(), NULL, NULL,
'{name},{supportUrl},{siteName}',
NULL),

(16,
'product approval mail',
'Product Approval Notification',
'<h1 style="font-size: 20px; line-height: 29px; font-weight: 600; margin:0 0 12px 0; color:#1F2328;">
  Hi {name},
</h1>

<p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 24px 0;">
  We’re excited to inform you that your product, <b>{productname}</b>, has been successfully reviewed and approved for listing on <b>{siteName}!</b><br><br>

  Your product is now live and available for customers to view and purchase on the platform.<br>
  You can manage your product details, inventory, and sales through your Seller Panel at any time.<br><br>

  If you have any questions or need assistance, please reach out to our support team at
  <a href="{siteUrl}" style="color:#0969DA; font-weight:600;">{siteUrl}</a>. We’ll be happy to help.<br><br>

  Wishing you great success in selling on <b>{siteName}</b>.
</p>

<p>Best regards,<br>
The {siteName} Team</p>',
1, NOW(), NOW(), NULL, NULL,
'{name},{productname},{siteName},{siteUrl}',
NULL),

(
17,
'Email posting question',
'Product Question Alert',
'<h1 style="font-size: 24px; line-height: 29px; font-weight: 600; margin: 0 0 12px 0; color:#1F2328;">
  Hi {name},
</h1>

<p style="font-size: 16px; line-height: 24px; color: #1F2328; font-weight: normal; margin: 0 0 40px 0;">
  A customer has just posted a question about one of your products.
</p>

<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top: 12px;">
  <tbody>
    <tr>
      <td style="border-top: 1px solid #D8DEE3; padding: 16px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tbody>
            <tr>
              <td width="93">
                <img width="93" height="93" src="{productUrl}" alt="product">
              </td>
              <td style="padding:16px 40px 16px 10px; border-top: 1px solid #D8DEE3;">
                <h4 style="color:#262626; font-size:14px; line-height:18px; font-weight:normal; margin:0 0 8px 0;">
                  {title}
                </h4>
                <h5 style="font-size:14px; line-height:17px; font-weight:600; color:#262626; margin:0;">
                  {price}
                </h5>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding: 24px 16px; background-color: #F9F9FC;">
        <p style="margin:0 0 16px 0; font-size:14px; line-height:24px; color:#262626;">Question:</p>
        <h2 style="color:#262626; font-size:18px; line-height:26px; font-weight:600; margin:0;">
          {question}
        </h2>
      </td>
    </tr>
  </tbody>
</table>

<p style="font-size:14px; color:#555; margin-top:20px;">
  You can reply to this question from your Seller Panel to help assist potential buyers and boost customer confidence.
</p>

<p style="margin-top:24px;">
  Best regards,<br>
  The {siteName} Team
</p>',
1,
NOW(),
NOW(),
NULL,
NULL,
'{name},{title},{question},{productUrl},{price},{siteName}',
'seller'
),

(18, 'Email posting answer', 'Product Answer notification',
'<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tbody>
    <tr>
      <td>
        <h1 style="font-size:24px; line-height:29px; font-weight:600; margin:0 0 12px 0; color:#1F2328;">
          Hi {name},
        </h1>
        <p style="font-size:16px; line-height:24px; color:#1F2328; font-weight:normal; margin:0 0 40px 0;">
          {replier} just answered the question you posted for the product.
        </p>
      </td>
    </tr>

    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tbody>
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tbody>
                    <tr>
                      <td style="border-width:1px 0 0 0; border-style:solid; border-color:#D8DEE3; padding:16px 0;">
                        <img width="93" height="93" src="{productUrl}" alt="product" style="display:block;">
                      </td>
                      <td class="product-detail"
                          style="padding:16px 40px 16px 10px; border-width:1px 0 0 0; border-style:solid; border-color:#D8DEE3;">
                        <h4 style="color:#262626; font-size:14px; line-height:18px; font-weight:normal; margin:0 0 8px 0;">
                          {title}
                        </h4>
                        <h5 style="font-size:14px; line-height:17px; font-weight:600; color:#262626; margin:0;">
                          {price}
                        </h5>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding:24px 16px; background-color:#F9F9FC;">
        <p style="margin:0 0 16px 0; font-size:14px; font-weight:normal; line-height:24px; color:#262626;">
          Question & Answer
        </p>
        <h2 style="color:#262626; font-size:18px; line-height:26px; font-weight:600; margin:0 0 12px 0;">
          {question}
        </h2>
        <p style="font-size:14px; line-height:24px; color:#262626; font-weight:normal; margin:0;">
          {answer}
        </p>
      </td>
    </tr>
  </tbody>
</table>',
1, NOW(), NOW(), NULL, NULL,
'{name},{title},{question},{answer},{username}', 'fullfilled'),

(19, 'Report Abuse', 'Report Abuse Notification',
'<p>Dear {name},<br />&nbsp;</p>
<p>{username} has submitted a “Report Abuse” request for your product: <u>{title}</u>,<br></p>
<p><i>Question</i> : {question}</p>
<p><i>Answer</i> : {answer}</p><br><br>
Please review this report in your Seller Panel and take appropriate action as per the platform guidelines.',
1, NOW(), NOW(), NULL, NULL,
'{name},{username},{title},{question},{answer}', 'seller'),

(20, 'updated cancel request status', 'Update on your order cancellation request',
'Dear {name},<br/><br/>
<p style="margin-bottom:.5em; margin: 0 0 10px 0; text-indent: 50px;">
This is to update you about your request to cancel the product: {productname}.<br/><br/>
Your cancellation request has been {status} by the seller.<br/><br/>
If you have any questions or need further assistance, please reply to this email or contact our support team.
</p>',
1, NOW(), NOW(), NULL, NULL, '{name},{productname},{status}', 'buyer'),

(21, 'order status change update', 'Order status update for your Spurt Cart order',
'Hello {name},<br/><br/>
<p style="margin-bottom:.5em; margin: 0 0 10px 0; text-indent: 50px;">
Here is a new update on your recent order on Spurt Cart.<br/>
The status of the product {title} in order number {order} is now "{status}".<br/>
You can view the complete details of your order status in the My Order History section of your account.<br/><br/>
Thank you for shopping with us.
</p>
<br/>
<p>Best regards,<br/>Spurt Cart Team</p>',
1, NOW(), NOW(), NULL, NULL, '{name},{title},{order},{status}', 'buyer'),

(22, 'Quotation Request Mail', 'Product Quotation Request',
'<p>Dear {name},</p><br/><br/>
<p style="margin-bottom:.5em; margin: 0 0 10px 0; text-indent: 50px;">
You have received a new quotation request for your product {title} from customer {customername}.<br/><br/>
Please log in to your Spurt Cart seller account to view full quotation details and respond to the customer.<br/><br/>
Best regards,<br/>
Spurt Cart Team
</p>',
1, NOW(), NOW(), NULL, NULL, '{name},{title},{customername}', NULL),

(23, 'Forgot password link', 'Reset your password',
'<h1
        style="font-size: 20px; line-height: 29px; font-weight: 600;margin: 0 0 12px 0;color:#1F2328;">
                Hi {name},
                </h1>
            <p
                style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 24px 0;">

A request was received to change the password for your account. To reset your password securely, please click the link below.<br><br>
Reset your password: <b><a href= {link} style="display: block;
    text-decoration: none;
    padding: 16px 40px;
    background-color: #027600;
    border-radius: 6px;
    color: #FFFFFF;
    font-size: 16px;
    line-height: 20px;
    width: fit-content;
    margin: auto;"> {reset_link}</a></b><br>
If you did not request this change, you can safely ignore this email and your current password will remain unchanged.<br/><br/>
Best regards,<br/>
Support Team
</p>',
1, NOW(), NOW(), NULL, NULL, '{name},{link},{reset_link}', 'seller'),

(24, 'Invoice mail', 'Invoice for your order {orderPrefixId}',
'<p>Dear {name},<br />
&nbsp;</p>

<p> Thank you for your purchase. Please find attached the invoice for your order {orderPrefixId}.<br/>

If you have any questions regarding this invoice or your order, feel free to contact our support team. <br/><br/>
Best regards,<br/>
Accounts Teams</p>',
1, NOW(), NOW(), NULL, NULL, '{name},{orderPrefixId}', 'buyer'),

(25, 'Otp Verification', 'OTP sent successfully',
'<p>Dear {name},<br/></p>
<p>{message}<br/><br/>
If you did not request this OTP, please ignore this email or contact support.<br/><br/>
Best regards,<br/>
Support Team
</p>',
1, NOW(), NOW(), NULL, NULL, '{name},{message}', 'seller');
`);

        // await queryRunner.createForeignKey(
        //     'vendor_email_template',
        //     new TableForeignKey({
        //         columnNames: ['email_template_id'],
        //         referencedTableName: 'email_template',
        //         referencedColumnNames: ['id'],
        //         onDelete: 'CASCADE',
        //         onUpdate: 'CASCADE',
        //         name: 'FK_email_template_vendor_email_template_id',
        //     })
        // );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // handle rollback if needed
    }
}
