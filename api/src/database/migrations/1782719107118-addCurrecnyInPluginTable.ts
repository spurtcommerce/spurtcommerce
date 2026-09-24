import moment from 'moment';
import { getDataSource } from '../../loaders/typeormLoader';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCurrecnyInPluginTable1782719107118 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const SeoSeed = [
            {
                pluginName: 'Currency',
                slugName: 'currency',
                pluginAvatar: '',
                pluginAvatarPath: '',
                pluginType: 'Setting',
                pluginStatus: 1,
                pluginTimestamp: 1782719107118,
                displayName: 'Currency',
                isEditable: 0,
                routes: '~/api/currency~,~/api/currency/~,~/api/vendor-currency/master-currency~,~/api/vendor-currency~,~/api/vendor-currency/~',
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
