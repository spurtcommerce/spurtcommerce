import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import moment = require('moment/moment');

export class AddGmailData1648273222013 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginAdditionalInfo = {
            clientId: '',
            clientSecret: '',
            defaultRoute: '/gmail-login',
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
                        required: false,
                    },
                },
                {
                    name: 'isTest',
                    label: 'Is Test:',
                    value: '',
                    type: 'checkbox',
                },
            ],
            postRoute: '/admin-gmail/update-setting',
        };
        const GmailSeed = [
            {
                pluginName: 'Gmail',
                pluginAvatar: 'Img_1564575462680.jpeg',
                pluginAvatarPath: '/logo',
                pluginType: 'Oauth',
                pluginTimestamp: 1648273222013,
                pluginAdditionalInfo: JSON.stringify(pluginAdditionalInfo),
                pluginFormInfo: JSON.stringify(pluginFormInfo),
                pluginStatus: 1,
                isEditable: 1,
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        await getRepository('Plugins').save(GmailSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ---
    }

}
