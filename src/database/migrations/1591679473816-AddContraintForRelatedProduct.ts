import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddContraintForRelatedProduct1591679473816 implements MigrationInterface {
    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_product_related_tbl_product_foreignKey',
        columnNames: ['related_product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('product_related');
        const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('related_product_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('product_related');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('related_product_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

}
