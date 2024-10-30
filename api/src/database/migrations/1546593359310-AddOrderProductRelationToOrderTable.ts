import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddOrderProductRelationToOrderTable1546593359310 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_order_product_order1',
        columnNames: ['order_id'],
        referencedColumnNames: ['order_id'],
        referencedTableName: 'order',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('order_product');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('order_product');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }
}
