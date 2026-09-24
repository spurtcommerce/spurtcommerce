import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmailTemplateForSubscription1763538965985 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO email_template (shortname, subject, message, dynamic_fields_ref) VALUES (
          'Subscription Cancelled',
          'Your Subscription Has Been Cancelled',
          '<h2 style="font-size: 23px; line-height: 28px; font-weight: 600; margin: 0 0 16px 0; color:#1F2328;">
            Hi {name},
          </h2>

          <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 14px 0;">
            Your subscription <strong>{subscriptionName}</strong> has been successfully cancelled.
          </p>

          <h3 style="font-size: 20px; line-height: 26px; font-weight: 700; color:#1F2328; margin: 16px 0 10px 0;">
            Cancellation Summary
          </h3>

          <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 6px 0;">
            <strong>Cancelled On:</strong> {date}
          </p>

          <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 14px 0;">
            <strong>Reason:</strong> {cancelReason}
          </p>

          <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 20px 0;">
            Your access will remain active until <strong>{expiryDate}</strong>.
          </p>',
          '{name},{subscriptionName},{date},{cancelReason},{expiryDate}'
        );`);

        await queryRunner.query(`INSERT INTO email_template (shortname, subject, message, dynamic_fields_ref) VALUES (
          'Subscription Created',
          'Your Subscription Has Been Activated',
          '<h2 style="font-size: 23px; line-height: 28px; font-weight: 600; margin: 0 0 16px 0; color:#1F2328;">
            Hi {name},
          </h2>

          <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 14px 0;">
            Welcome! Your subscription <strong>{subscriptionName}</strong> has been successfully created.
          </p>

          <h3 style="font-size: 20px; line-height: 26px; font-weight: 700; color:#1F2328; margin: 16px 0 10px 0;">
            Subscription Details
          </h3>

          <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 6px 0;">
            <strong>Start Date:</strong> {startDate}
          </p>

          <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 6px 0;">
            <strong>Next Billing Date:</strong> {nextBillingDate}
          </p>

          <h3 style="font-size: 20px; line-height: 26px; font-weight: 700; color:#1F2328; margin: 20px 0 10px 0;">
            What Happens Next?
          </h3>

          <p style="font-size: 16px; line-height: 24px; color:#1F2328; margin: 0 0 14px 0;">
            You now have full access to all features included in your <strong>{subscriptionName}</strong> plan.
            Your subscription will renew automatically unless cancelled before the next billing date.
          </p>',
          '{name},{subscriptionName},{startDate},{nextBillingDate}'
        );`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
