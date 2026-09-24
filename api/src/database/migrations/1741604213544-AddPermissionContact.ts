import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddPermissionContact1741604213544 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const permissionModuleExist = await getDataSource().getRepository('VendorPermissionModuleGroup').findOne({ where: { slugName: 'contact' } });
        if (!permissionModuleExist) {
            const val: any = await getDataSource().getRepository('VendorPermissionModuleGroup').save([{
                name: 'Contact',
                slugName: 'contact',
                sortOrder: 81,
            }]);
            if (val) {
                const PermissionSeed = [
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Contact List',
                        slugName: 'contact-list',
                        sortOrder: '310',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Add Contact',
                        slugName: 'add-contact',
                        sortOrder: '311',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Edit Contact',
                        slugName: 'edit-contact',
                        sortOrder: '312',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Export Contact',
                        slugName: 'export-contact',
                        sortOrder: '312',
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Delete Contact',
                        slugName: 'delete-contact',
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
