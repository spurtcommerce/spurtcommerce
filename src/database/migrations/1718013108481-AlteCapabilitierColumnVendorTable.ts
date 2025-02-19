import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AlteCapabilitierColumnVendorTable1718013108481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor', 'capabilities');
        if (columnExist) {
            await getRepository('Vendor').update({}, {
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
