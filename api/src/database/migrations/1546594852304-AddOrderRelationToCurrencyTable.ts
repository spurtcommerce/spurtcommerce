import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddOrderRelationToCurrencyTable1546594852304 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_order_currency1',
        columnNames: ['currency_id'],
        referencedColumnNames: ['currency_id'],
        referencedTableName: 'currency',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('order');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('currency_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('order');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('currency_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }
}
