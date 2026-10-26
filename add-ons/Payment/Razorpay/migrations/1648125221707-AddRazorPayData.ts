import { MigrationInterface, QueryRunner } from 'typeorm';
import moment = require('moment/moment');
import { getDataSource } from '../../../../src/loaders/typeormLoader';

export class AddRazorPayData1648125221707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginAdditionalInfo = {
            clientId: '',
            clientSecret: '',
            processRoute: '/razorpay-payment/process',
            successRoute: '/razorpay-payment/success',
            cancelRoute: '/razorpay-payment/cancel',
            failureRoute: '/razorpay-payment/failure',
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
            postRoute: '/admin-razor-pay-payment/update-setting',
        };
        const RazorPaySeed = [
            {
                pluginName: 'Razorpay',
                pluginAvatar: 'Img_1567002487693.png',
                pluginAvatarPath: 'logo/',
                pluginType: 'Payment',
                pluginTimestamp: 1648125221707,
                displayName: 'Razorpay',
                pluginAdditionalInfo: JSON.stringify(pluginAdditionalInfo),
                pluginFormInfo: JSON.stringify(pluginFormInfo),
                pluginStatus: 1,
                isEditable: 1,
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        await getDataSource().getRepository('Plugins').save(RazorPaySeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ---
    }

}
