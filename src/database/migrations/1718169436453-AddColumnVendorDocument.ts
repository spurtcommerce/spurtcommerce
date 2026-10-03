import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnVendorDocument1718169436453 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor_document', 'additional_info');
        if (!columnExist) {
            await queryRunner.addColumn('vendor_document', new TableColumn({
                name: 'additional_info',
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
