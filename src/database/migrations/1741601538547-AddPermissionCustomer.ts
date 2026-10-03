import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddPermissionCustomer1741601538547 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const permissionModuleExist = await getDataSource().getRepository('VendorPermissionModuleGroup').findOne({ where: { slugName: 'customer' } });
        if (!permissionModuleExist) {
            const val: any = await getDataSource().getRepository('VendorPermissionModuleGroup').save([{
                name: 'Customer',
                slugName: 'customer',
                sortOrder: 81,
            }]);
            if (val) {
                const PermissionSeed = [
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Customer List',
                        slugName: 'customer-list',
                        sortOrder: '310',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'View Customer History',
                        slugName: 'view-customer-history',
                        sortOrder: '311',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Export Customer',
                        slugName: 'export-customer',
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
