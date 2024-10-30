import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumVendorProduct1691219734490 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const hasColumnName = await queryRunner.hasColumn('vendor_product', 'common_product_date');
        if (!hasColumnName) {
            await queryRunner.addColumn('vendor_product', new TableColumn({
                name: 'common_product_date',
                type: 'timestamp',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor_product', 'common_product_date');
    }

}
