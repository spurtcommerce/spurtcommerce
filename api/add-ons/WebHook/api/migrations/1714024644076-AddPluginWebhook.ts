import moment from 'moment';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../../src/loaders/typeormLoader';

export class AddPluginWebhook1714024644076 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const SeoSeed = [
            {
                pluginName: 'WebHook',
                slugName: 'webhook',
                pluginAvatar: '',
                pluginAvatarPath: '',
                pluginTimestamp: 1714024644076,
                pluginType: 'Utility',
                displayName: 'Web Hook (Tech Addon)',
                pluginStatus: 1,
                isEditable: 0,
                routes: '',
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];

        await getDataSource().getRepository('Plugins').save(SeoSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
