import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddPermissionSalesQuotation1741588094649 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const permissionModuleExist = await getDataSource().getRepository('VendorPermissionModuleGroup').findOne({ where: { slugName: 'sales-quotation-request' } });
        if (!permissionModuleExist) {
            const val: any = await getDataSource().getRepository('VendorPermissionModuleGroup').save([{
                name: 'Sales Quotation Request',
                slugName: 'sales-quotation-request',
                sortOrder: 81,
            }]);
            if (val) {
                const PermissionSeed = [
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Quotation List',
                        slugName: 'quotation-list',
                        sortOrder: '310',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Edit Quotation',
                        slugName: 'edit-quotation',
                        sortOrder: '311',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Export Quotation',
                        slugName: 'export-quotation',
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
