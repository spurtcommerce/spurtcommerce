import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from 'typeorm';

export class AddColumnForSkuIdInProduct1601872052590 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_sku_tbl_product_foreignKey',
        columnNames: ['sku_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sku',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('product', 'sku_id');
        if (!ifExist) {
        await queryRunner.addColumn('product', new TableColumn({
                name: 'sku_id',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const table = await queryRunner.getTable('product');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('sku_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product', 'sku_id');
    }

}
