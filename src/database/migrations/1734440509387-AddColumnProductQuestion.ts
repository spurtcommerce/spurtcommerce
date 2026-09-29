import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddColumnProductQuestion1734440509387 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_product_question_sku',
        columnNames: ['sku_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sku',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('product_question', 'sku_id');
        if (!columnExist) {
            await queryRunner.query(`DELETE FROM product_question ;`);
            await queryRunner.addColumn('product_question', new TableColumn({
                name: 'sku_id',
                type: 'integer',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const table = await queryRunner.getTable('product_question');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('sku_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product_question', 'sku_id');
    }

}
