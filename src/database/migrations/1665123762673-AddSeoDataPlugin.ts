import { MigrationInterface, QueryRunner } from 'typeorm';
import moment = require('moment/moment');
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddSeoDataPlugin1665123762673 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const SeoSeed = [
            {
                pluginName: 'Seo',
                slugName: 'seo',
                pluginAvatar: '',
                pluginAvatarPath: '',
                pluginTimestamp: 1665123762673,
                displayName: 'SEO',
                pluginType: 'SEO',
                pluginStatus: 1,
                isEditable: 0,
                routes: '~/api/blog-seo~,~/api/blog-seo/~,~/api/category-seo~,~/api/category-seo/~,~/api/page-seo~,~/api/page-seo/~,~/api/product-seo~,~/api/product-seo/~,~/api/seo/product/~,~/api/seo/category/~,~/api/seo/page/~,~/api/seo/blog/~',
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        await getDataSource().getRepository('Plugins').save(SeoSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ---
    }
}
