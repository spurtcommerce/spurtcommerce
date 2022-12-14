import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';
import moment = require('moment/moment');

export class AddWidgetPlugin1665135644842 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const SeoSeed = [
            {
                pluginName: 'Widget',
                slugName: 'widget',
                pluginAvatar: '',
                pluginAvatarPath: '',
                pluginType: 'CMS',
                pluginStatus: 1,
                isEditable: 0,
                routes: '~/api/widget~,~/api/widget/~,~/api/widget/widget-count~,~/api/widget/widget-detail~,~/api/widget/productlist~,~/api/list/widget-list~,~/api/list/widget-detail/~',
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        await getRepository('Plugins').save(SeoSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ---
    }
}
