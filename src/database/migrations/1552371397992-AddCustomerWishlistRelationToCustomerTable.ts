import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddCustomerWishlistRelationToCustomerTable1552371397992 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_wishlist_customer',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customer',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('customer_wishlist');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('customer_wishlist');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }
}
