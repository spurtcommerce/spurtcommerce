import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddVendorPermissionModuleTableValue1741583585138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable('vendor_permission_module_group');
        const hasDescription = table?.findColumnByName('description');

        if (!hasDescription) {
            await queryRunner.addColumn('vendor_permission_module_group', new TableColumn({
                name: 'description',
                type: 'varchar',
                length: '255',
                isNullable: true,
            }));
        }

        const permissionModuleGroup = await getDataSource().getRepository('PermissionModuleGroup').find();
        await getDataSource().getRepository('VendorPermissionModuleGroup').save(permissionModuleGroup);

        const permissionModule = await getDataSource().getRepository('PermissionModule').find();
        await getDataSource().getRepository('VendorPermissionModule').save(permissionModule);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
