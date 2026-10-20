import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnInProductVariantOptionImage1721986539323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const findColumn = await queryRunner.hasColumn('product_varient_option_image', 'sort_order');
        if (!findColumn) {
            await queryRunner.addColumn('product_varient_option_image', new TableColumn({
                name: 'sort_order',
                type: 'INT',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product_varient_option_image', 'sort_order');
    }

}
