import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddProductSkuIdInProductRatingTable1734335106062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const columnExist = await queryRunner.hasColumn('product_rating', 'sku_id');

        if (!columnExist) {
            await queryRunner.query(`DELETE FROM product_rating ;`);
            await queryRunner.addColumn('product_rating', new TableColumn({
                name: 'sku_id',
                type: 'int',
                isNullable: false,
                isPrimary: false,
            }));
            await queryRunner.createForeignKey('product_rating', new TableForeignKey({
                columnNames: ['sku_id'],
                referencedTableName: 'sku',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }));

        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
