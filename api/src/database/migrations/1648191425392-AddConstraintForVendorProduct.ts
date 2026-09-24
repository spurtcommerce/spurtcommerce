import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddConstraintForVendorProduct1648191425392 implements MigrationInterface {

    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_vendor_product_tbl_sku_foreignKey',
        columnNames: ['sku_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sku',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('vendor_product');
        const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('sku_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('vendor_product');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('sku_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

}
