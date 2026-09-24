import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnVendorTable1718004573878 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor', 'capabilities');
        if (!columnExist) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'capabilities',
                type: 'json',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
