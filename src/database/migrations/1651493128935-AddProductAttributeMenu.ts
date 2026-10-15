import { MigrationInterface, QueryRunner } from 'typeorm';
import moment = require('moment/moment');
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddProductAttributeMenu1651493128935 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const BlogsSeed = [
            {
                menuName: 'Products Attribute',
                menuModule: 'catalog',
                path: '#/catalog/product_attribute',
                icon: '',
                parentId: 0,
                status: 1,
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        await getDataSource().getRepository('PluginMenu').save(BlogsSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ----
    }

}
