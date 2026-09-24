import moment from 'moment';
import { PermissionModuleGroup } from '../../../src/api/core/models/PermissionModuleGroup';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddSeoPermissionModule1732520852749 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"seo"');
        if ((exist.length === 0)) {
            const val: any = await getDataSource().getRepository(PermissionModuleGroup).save([{
                name: 'SEO',
                slugName: 'seo',
                sortOrder: 81,
            }]);
            if (val) {
                const CouponPermissionSeed = [
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Product',
                        slugName: 'product-seo',
                        sortOrder: '310',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Pages',
                        slugName: 'pages-seo',
                        sortOrder: '311',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Category',
                        slugName: 'category-seo',
                        sortOrder: '312',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Blog',
                        slugName: 'blog-seo',
                        sortOrder: '313',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Site Map',
                        slugName: 'site-map-seo',
                        sortOrder: '314',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                await getDataSource().getRepository('PermissionModule').save(CouponPermissionSeed);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
