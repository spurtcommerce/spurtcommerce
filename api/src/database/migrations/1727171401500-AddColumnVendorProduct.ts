import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnVendorProduct1727171401500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnCheck = await queryRunner.hasColumn('vendor_product', 'reject_reason');
        if (!columnCheck) {
            await queryRunner.addColumn('vendor_product', new TableColumn(
                {
                    name: 'reject_reason',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
