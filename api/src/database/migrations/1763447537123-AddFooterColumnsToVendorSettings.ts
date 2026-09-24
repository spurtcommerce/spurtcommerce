import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFooterColumnsToVendorSettings1763447537123 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const hasFooterTitle = await queryRunner.hasColumn('vendor_settings', 'footer_title');
        if (!hasFooterTitle) {
            await queryRunner.addColumn(
                'vendor_settings',
                new TableColumn({
                    name: 'store_title',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //
    }
}
