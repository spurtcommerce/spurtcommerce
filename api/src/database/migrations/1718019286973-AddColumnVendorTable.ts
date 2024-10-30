import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnVendorTable1718019286973 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor', 'vendor_description');
        if (!columnExist) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'vendor_description',
                type: 'text',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
