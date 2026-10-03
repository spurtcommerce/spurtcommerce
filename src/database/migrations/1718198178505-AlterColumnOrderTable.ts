import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterColumnOrderTable1718198178505 implements MigrationInterface {

    private tableForeignKeyyy = new TableForeignKey({
        name: 'fk_order_customer_customer_id',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customer',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('order');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKeyyy);
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
