import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddPermissionCatalogProduct1741593069466 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const permissionModuleExist = await getDataSource().getRepository('VendorPermissionModuleGroup').findOne({ where: { slugName: 'catalog-products' } });
        if (!permissionModuleExist) {
            const val: any = await getDataSource().getRepository('VendorPermissionModuleGroup').save([{
                name: 'Catalog Products',
                slugName: 'catalog-products',
                sortOrder: 81,
            }]);
            if (val) {
                const PermissionSeed = [
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Product List',
                        slugName: 'product-list',
                        sortOrder: '310',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Create Product',
                        slugName: 'create-product',
                        sortOrder: '311',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Edit Product',
                        slugName: 'edit-product',
                        sortOrder: '312',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Export Product',
                        slugName: 'export-product',
                        sortOrder: '312',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Delete Product',
                        slugName: 'delete-product',
                        sortOrder: '312',
                    },
                ];
                await getDataSource().getRepository('VendorPermissionModule').save(PermissionSeed);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
