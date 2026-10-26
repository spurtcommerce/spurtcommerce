import { MigrationInterface, QueryRunner } from 'typeorm';
import moment = require('moment/moment');
import { getDataSource } from '../../../../src/loaders/typeormLoader';

export class AddPaypalData1648018102673 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginAdditionalInfo = {
            clientId: '',
            clientSecret: '',
            processRoute: '/paypal-payment/process',
            successRoute: '/paypal-payment/success',
            cancelRoute: '/paypal-payment/cancel',
            failureRoute: '/paypal-payment/failure',
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
            postRoute: '/admin-paypal-payment/update-setting',
        };
        const PaypalSeed = [
            {
                pluginName: 'Paypal',
                pluginAvatar: 'Img_1564650679795.png',
                pluginAvatarPath: 'logo/',
                pluginType: 'Payment',
                pluginTimestamp: 1648018102673,
                displayName: 'Paypal',
                pluginAdditionalInfo: JSON.stringify(pluginAdditionalInfo),
                pluginFormInfo: JSON.stringify(pluginFormInfo),
                pluginStatus: 1,
                isEditable: 1,
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        await getDataSource().getRepository('Plugins').save(PaypalSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ---
    }

}
