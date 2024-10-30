import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import moment = require('moment/moment');

export class AddFacebookData1648273183310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginAdditionalInfo = {
            AppId: '',
            AppSecretKey: '',
            defaultRoute: '/facebook-login',
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
            postRoute: '/admin-facebook/update-setting',
        };
        const FacebookSeed = [
            {
                pluginName: 'Facebook',
                pluginAvatar: 'Img_1564575414973.png',
                pluginAvatarPath: '/logo',
                pluginTimestamp: 1648273183310,
                pluginType: 'Oauth',
                pluginAdditionalInfo: JSON.stringify(pluginAdditionalInfo),
                pluginFormInfo: JSON.stringify(pluginFormInfo),
                pluginStatus: 1,
                isEditable: 1,
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        await getRepository('Plugins').save(FacebookSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ---
    }

}
