import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnProductTable1716446010493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('product', 'product_highlights');
        if (!columnExist) {
            await queryRunner.addColumn('product', new TableColumn({
                name: 'product_highlights',
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
