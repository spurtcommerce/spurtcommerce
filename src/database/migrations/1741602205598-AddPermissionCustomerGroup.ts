import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddPermissionCustomerGroup1741602205598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const permissionModuleExist = await getDataSource().getRepository('VendorPermissionModuleGroup').findOne({ where: { slugName: 'customer-group' } });
        if (!permissionModuleExist) {
            const val: any = await getDataSource().getRepository('VendorPermissionModuleGroup').save([{
                name: 'Customer Group',
                slugName: 'customer-group',
                sortOrder: 81,
            }]);
            if (val) {
                const PermissionSeed = [
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Customer Group List',
                        slugName: 'customer-group-list',
                        sortOrder: '310',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Add Cusomer Group',
                        slugName: 'add-customer-group',
                        sortOrder: '311',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Edit Cusomer Group',
                        slugName: 'edit-cusomer-group',
                        sortOrder: '312',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Update Group Status',
                        slugName: 'update-group-status',
                        sortOrder: '312',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Manage Customer',
                        slugName: 'manage-customer',
                        sortOrder: '312',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Delete Cusomer Group',
                        slugName: 'delete-cusomer-group',
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
