import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddPermissionOrderUpdate1741592391317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const permissionModuleExist: any = await getDataSource().getRepository('VendorPermissionModuleGroup').findOne({ where: { slugName: 'order' } });
        if (permissionModuleExist) {
            const PermissionSeed = [
                {
                    moduleGroupId: permissionModuleExist.moduleGroupId,
                    name: 'Order Invoice',
                    slugName: 'order-invoice',
                    sortOrder: '310',
                },
                {
                    moduleGroupId: permissionModuleExist.moduleGroupId,
                    name: 'Order Archive',
                    slugName: 'order-archive',
                    sortOrder: '311',
                },
            ];
            await getDataSource().getRepository('VendorPermissionModule').save(PermissionSeed);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
