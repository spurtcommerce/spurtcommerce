import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AlteCapabilitierColumnVendorTable1718013108481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor', 'capabilities');
        if (columnExist) {
            await getDataSource().getRepository('Vendor').update({}, {
                capabilities: [{
                    data: '',
                    status: 1,
                }],
            });
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
