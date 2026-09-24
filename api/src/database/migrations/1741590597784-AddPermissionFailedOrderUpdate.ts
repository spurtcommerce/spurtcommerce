import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddPermissionFailedOrderUpdate1741590597784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await getDataSource().getRepository('VendorPermissionModule').update(
            { slugName: 'move-failed-order-to-main-order' },
            { name: 'Export Failed Order', slugName: 'export-failed-order' }
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
