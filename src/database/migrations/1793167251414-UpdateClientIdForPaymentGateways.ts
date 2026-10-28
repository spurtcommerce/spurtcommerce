import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateClientIdForPaymentGateways1793167251414 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // 1. PayPal configuration
        await queryRunner.query(
            `UPDATE plugins
             SET plugin_additional_info = ?
             WHERE plugin_name = 'Paypal'`,
            [
                JSON.stringify({
                    clientId: 'AYmqapow9hk84axv3GjrNNFsMwsagQqdrsjwS_G_OfwR2WyDq1yMMQPM0mVh2FXR5-mktYYvf2SJGQTo',
                    clientSecret: 'EOOx_hJvgPBLktmMx-AoHOvws-XgSVXtMWndh_7f2ZUYCCPljWwUybgPWTJwo69CkwzUFVsFM9PWGe8I',
                    processRoute: '/paypal-payment/process',
                    successRoute: '/paypal-payment/success',
                    cancelRoute: '/paypal-payment/cancel',
                    failureRoute: '/paypal-payment/failure',
                    isTest: true,
                }),
            ]
        );

        // 2. Stripe configuration
        await queryRunner.query(
            `UPDATE plugins
             SET plugin_additional_info = ?
             WHERE plugin_name = 'Stripe'`,
            [
                JSON.stringify({
                    clientId: 'pk_test_51N0dyFSCXMNAcb3PxWNNrqS0GJk7fzETgex275j9D1dBPVrQpDuk0K1ugxqn9kkGAnPYm1y1btOIQY6aCTewoGEp00jvcMy032',
                    clientSecret: 'sk_test_51N0dyFSCXMNAcb3PnWS3GBkc9GT1lcDDOYKNXsMuIfwAaiy0QgGgu0JROxbUJ246r3J0O1NgqQsPywcJstFGYped00dQCT3fd6',
                    processRoute: '/stripe-payment/process',
                    successRoute: '/stripe-payment/success',
                    cancelRoute: '/stripe-payment/cancel',
                    failureRoute: '/stripe-payment/failure',
                    isTest: true,
                }),
            ]
        );

        // 3. Razorpay configuration
        await queryRunner.query(
            `UPDATE plugins
             SET plugin_additional_info = ?
             WHERE plugin_name = 'Razorpay'`,
            [
                JSON.stringify({
                    clientId: 'rzp_test_qyHZwt4O4Eflkh',
                    clientSecret: 'TPbIsCYcRjDyfqnakkTZ8wee',
                    processRoute: '/razorpay-payment/process',
                    successRoute: '/razorpay-payment/success',
                    cancelRoute: '/razorpay-payment/cancel',
                    failureRoute: '/razorpay-payment/failure',
                    isTest: true,
                }),
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Previous values cannot be restored automatically.
        // Back up the existing configuration before running this migration.
    }
}
