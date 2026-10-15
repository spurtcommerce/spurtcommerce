import {MigrationInterface, QueryRunner} from 'typeorm';
import moment = require('moment/moment');
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddAttributeMenu1654336590012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ProductAttributeSeed = [
            {
                menuName: 'Attributes',
                menuModule: 'Catalog Manage Products',
                path: '#/catalog/manage-products/product_attribute',
                icon: '',
                parentId: 0,
                status: 1,
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        await getDataSource().getRepository('PluginMenu').save(ProductAttributeSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ----
    }
}
