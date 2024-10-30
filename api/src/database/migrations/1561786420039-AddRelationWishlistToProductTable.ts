import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddRelationWishlistToProductTable1561786420039 implements MigrationInterface {
        private wishlistToProductForeignKeys = new TableForeignKey({
            name: 'fk_tbl_customer_wishlist_tbl_product',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
        public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('customer_wishlist');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.wishlistToProductForeignKeys);
        }
        }
        public async down(queryRunner: QueryRunner): Promise<any> {
            const table = await queryRunner.getTable('customer_wishlist');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (ifDataExsist) {
                await queryRunner.dropForeignKey(table, this.wishlistToProductForeignKeys);
            }
       }
    }
