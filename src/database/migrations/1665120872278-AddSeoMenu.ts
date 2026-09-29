import { MigrationInterface, QueryRunner } from 'typeorm';
import moment = require('moment/moment');
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddSeoMenu1665120872278 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const SeoSeed = [
            {
                menuName: 'Seo',
                menuModule: 'CMS',
                path: '#/cms/manage-seo/seo',
                icon: '',
                parentId: 0,
                status: 1,
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        await getDataSource().getRepository('PluginMenu').save(SeoSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ----
    }

}
