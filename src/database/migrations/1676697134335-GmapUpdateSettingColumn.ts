import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import moment = require('moment/moment');

export class GmapUpdateSettingColumn1676697134335 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginAdditionalInfo = {
            clientId: '',
            clientSecret: '',
            defaultRoute: '/CustomerAddress/add-address',
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
            postRoute: '/admin-gmap/update-setting',
        };
        const GmapSeed = [
            {
                pluginName: 'gmap',
                pluginAvatar: 'Img_1564575414973.png',
                pluginAvatarPath: '/logo',
                pluginType: 'Gmap',
                pluginTimestamp: 1676697134335,
                pluginAdditionalInfo: JSON.stringify(pluginAdditionalInfo),
                pluginFormInfo: JSON.stringify(pluginFormInfo),
                pluginStatus: 1,
                isEditable: 1,
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        await getRepository('Plugins').save(GmapSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ---
    }

}
