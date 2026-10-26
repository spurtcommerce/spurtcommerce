import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertPaymentPluginInPluginsTable1792997113879 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
        const plugins = [
            {
                id: 1,
                plugin_name: 'CashOnDelivery',
                plugin_avatar: 'Img_1710850822607.png',
                plugin_avatar_path: 'logo/',
                plugin_type: 'Payment',
                plugin_status: 1,
                created_date: '2022-11-01 14:54:56',
                modified_date: '2025-10-08 06:02:19',
                slug_name: 'cash-on-delivery',
                is_editable: 0,
                display_name: 'Cash On Delivery',
                description: 'Manage product attributes such as color and size.',
            },
            {
                id: 23,
                plugin_name: 'Paypal',
                plugin_avatar: 'Img_1710850832892.png',
                plugin_avatar_path: 'logo/',
                plugin_type: 'Payment',
                plugin_additional_info: JSON.stringify({
                    clientId: '',
                    clientSecret: '',
                    processRoute: '/paypal-payment/process',
                    successRoute: '/paypal-payment/success',
                    cancelRoute: '/paypal-payment/cancel',
                    failureRoute: '/paypal-payment/failure',
                    isTest: true,
                }),
                plugin_status: 1,
                created_date: '2023-08-11 16:19:43',
                modified_date: '2025-10-08 06:02:19',
                plugin_form_info: JSON.stringify({
                    controls: [
                        {
                            name: 'clientId',
                            label: 'Client Id:',
                            value: '',
                            type: 'text',
                            validators: { required: true },
                        },
                        {
                            name: 'clientSecret',
                            label: 'Client Secret:',
                            value: '',
                            type: 'text',
                            validators: { required: true },
                        },
                        {
                            name: 'isTest',
                            label: 'Is Test:',
                            value: '',
                            type: 'checkbox',
                        },
                    ],
                    postRoute: '/paypal-payment',
                }),
                slug_name: 'paypal',
                is_editable: 1,
                plugin_timestamp: 1759830856875,
                display_name: 'Paypal',
                description: 'Manage product attributes such as color and size.',
            },
            {
                id: 24,
                plugin_name: 'Stripe',
                plugin_avatar: 'Img_1710850837730.png',
                plugin_avatar_path: 'logo/',
                plugin_type: 'Payment',
                plugin_additional_info: JSON.stringify({
                    clientId: '',
                    clientSecret: '',
                    processRoute: '/stripe-payment/process',
                    successRoute: '/stripe-payment/success',
                    cancelRoute: '/stripe-payment/cancel',
                    failureRoute: '/stripe-payment/failure',
                    isTest: true,
                }),
                plugin_status: 1,
                created_date: '2023-08-11 16:19:43',
                modified_date: '2025-10-08 06:02:19',
                plugin_form_info: JSON.stringify({
                    controls: [
                        {
                            name: 'clientId',
                            label: 'Client Id:',
                            value: '',
                            type: 'text',
                            validators: { required: true },
                        },
                        {
                            name: 'clientSecret',
                            label: 'Client Secret:',
                            value: '',
                            type: 'text',
                            validators: { required: true },
                        },
                        {
                            name: 'isTest',
                            label: 'Is Test:',
                            value: '',
                            type: 'checkbox',
                        },
                    ],
                    postRoute: '/admin-stripe-payment/update-setting',
                }),
                slug_name: 'stripe',
                is_editable: 1,
                plugin_timestamp: 1759831597774,
                display_name: 'Stripe',
                description: 'Manage product attributes such as color and size.',
            },
            {
                id: 25,
                plugin_name: 'Razorpay',
                plugin_avatar: 'Img_1710850843554.png',
                plugin_avatar_path: 'logo/',
                plugin_type: 'Payment',
                plugin_additional_info: JSON.stringify({
                    clientId: '',
                    clientSecret: '',
                    processRoute: '/razorpay-payment/process',
                    successRoute: '/razorpay-payment/success',
                    cancelRoute: '/razorpay-payment/cancel',
                    failureRoute: '/razorpay-payment/failure',
                    isTest: true,
                }),
                plugin_status: 1,
                created_date: '2023-08-11 16:19:43',
                modified_date: '2025-10-08 06:02:19',
                plugin_form_info: JSON.stringify({
                    controls: [
                        {
                            name: 'clientId',
                            label: 'Client Id:',
                            value: '',
                            type: 'text',
                            validators: { required: true },
                        },
                        {
                            name: 'clientSecret',
                            label: 'Client Secret:',
                            value: '',
                            type: 'text',
                            validators: { required: true },
                        },
                    ],
                    postRoute: '/admin-razor-pay-payment/update-setting',
                }),
                slug_name: 'razorpay',
                is_editable: 1,
                plugin_timestamp: 1759831248027,
                display_name: 'Razorpay',
                description: 'Manage product attributes such as color and size.',
            },
        ];

        for (const plugin of plugins) {
            const columns = Object.keys(plugin);
            const values = columns.map((column) => plugin[column]);

            await queryRunner.query(
                `INSERT INTO plugins (${columns.map((column) => `\`${column}\``).join(', ')})
                 VALUES (${columns.map(() => '?').join(', ')})
                 ON DUPLICATE KEY UPDATE
                 ${columns
                     .filter((column) => column !== 'id')
                     .map((column) => `\`${column}\` = VALUES(\`${column}\`)`)
                     .join(', ')}`,
                values
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM plugins WHERE id IN (1, 2, 3, 4, 19, 23, 24, 25)`
        );
    }
}
