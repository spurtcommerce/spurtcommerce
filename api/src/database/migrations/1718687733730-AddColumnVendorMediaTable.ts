import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnVendorMediaTable1718687733730 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor_media', 'title');
        if (!columnExist) {
            await queryRunner.addColumn('vendor_media', new TableColumn({
                name: 'title',
                type: 'varchar',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
