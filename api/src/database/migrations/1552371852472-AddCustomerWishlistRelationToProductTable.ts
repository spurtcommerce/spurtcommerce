import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddCustomerWishlistRelationToProductTable1552371852472 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_wishlist_product',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('customer_wishlist');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('customer_wishlist');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }
}
