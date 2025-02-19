import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddOrderHistoryRelationToOrderStatusTable1546594262644 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_order_history_order_status1',
        columnNames: ['order_status_id'],
        referencedColumnNames: ['order_status_id'],
        referencedTableName: 'order_status',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('order_history');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_status_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('order_history');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_status_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }
}
