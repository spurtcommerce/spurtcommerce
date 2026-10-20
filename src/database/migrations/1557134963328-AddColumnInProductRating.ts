import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from 'typeorm';

export class AddColumnInProductRating1557134963328 implements MigrationInterface {
    private foreignKey = new TableForeignKey({
        name: 'fk_tbl_order_product_product_rating',
        columnNames: ['order_product_id'],
        referencedColumnNames: ['order_product_id'],
        referencedTableName: 'order_product',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('product_rating', 'order_product_id');
        if (!ifExist) {
        await queryRunner.addColumn('product_rating', new TableColumn({
            name: 'order_product_id',
            type: 'int',
            length: '11',
            isPrimary: false,
            isNullable: true,
        }));
        const table = await queryRunner.getTable('product_rating');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.foreignKey);
        }
    }
}
    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('product_rating');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_product_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.foreignKey);
        }
    }
}
