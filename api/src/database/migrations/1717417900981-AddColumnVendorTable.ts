import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnVendorTable1717417900981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor', 'business_number');
        if (!columnExist) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'business_number',
                type: 'varchar',
                length: '30',
                comment: 'GST NUMBER',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
