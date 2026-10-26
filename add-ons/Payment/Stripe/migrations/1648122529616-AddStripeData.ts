import { MigrationInterface, QueryRunner } from 'typeorm';
import moment = require('moment/moment');
import { getDataSource } from '../../../../src/loaders/typeormLoader';

export class AddStripeData1648122529616 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginAdditionalInfo = {
            clientId: '',
            clientSecret: '',
            processRoute: '/stripe-payment/process',
            successRoute: '/stripe-payment/success',
            cancelRoute: '/stripe-payment/cancel',
            failureRoute: '/stripe-payment/failure',
            isTest: '',
        };
        const pluginFormInfo = {
            controls: [
                {
                    name: 'clientId',
                    label: 'Client Id:',
                    value: '',
                    type: 'text',
                    validators: {
                        required: true,
                    },
                },
                {
                    name: 'clientSecret',
                    label: 'Client Secret:',
                    value: '',
                    type: 'text',
                    validators: {
                        required: true,
                    },
                },
                {
                    name: 'isTest',
                    label: 'Is Test:',
                    value: '',
                    type: 'checkbox',
                },
            ],
            postRoute: '/admin-stripe-payment/update-setting',
        };
        const StripeSeed = [
            {
                pluginName: 'Stripe',
                pluginAvatar: 'Img_1567002127693.png',
                pluginAvatarPath: 'logo/',
                pluginType: 'Payment',
                pluginTimestamp: 1648122529616,
                displayName: 'Razorpay',
                pluginAdditionalInfo: JSON.stringify(pluginAdditionalInfo),
                pluginFormInfo: JSON.stringify(pluginFormInfo),
                pluginStatus: 1,
                isEditable: 1,
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        await getDataSource().getRepository('Plugins').save(StripeSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ---
    }

}
