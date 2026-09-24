import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddPermissionSupplier1741603591194 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const permissionModuleExist = await getDataSource().getRepository('VendorPermissionModuleGroup').findOne({ where: { slugName: 'supplier' } });
        if (!permissionModuleExist) {
            const val: any = await getDataSource().getRepository('VendorPermissionModuleGroup').save([{
                name: 'Supplier',
                slugName: 'supplier',
                sortOrder: 81,
            }]);
            if (val) {
                const PermissionSeed = [
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Supplier List',
                        slugName: 'supplier-list',
                        sortOrder: '310',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Add Supplier',
                        slugName: 'add-supplier',
                        sortOrder: '311',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Edit Supplier',
                        slugName: 'edit-supplier',
                        sortOrder: '312',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Export Supplier',
                        slugName: 'export-supplier',
                        sortOrder: '312',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Delete Supplier',
                        slugName: 'delete-supplier',
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
