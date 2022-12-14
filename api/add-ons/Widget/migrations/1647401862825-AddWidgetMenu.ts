import moment from 'moment';
import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';

export class AddWidgetMenu1647401862825 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const WidgetMenuSeed = [
            {
                menuName: 'widgets',
                menuModule: 'CMS',
                path: '#/cms/widgets',
                icon: 'banner-ico-on.svg',
                parentId: 0,
                status: 1,
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        await getRepository('PluginMenu').save(WidgetMenuSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ---
    }

}
