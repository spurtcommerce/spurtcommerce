import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from 'typeorm';

export class AddColumnInOrderProductTable1582177223557 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_order_status_tbl_order_product_foreignKey',
        columnNames: ['order_status_id'],
        referencedColumnNames: ['order_status_id'],
        referencedTableName: 'order_status',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order_product', 'order_status_id');
        if (!ifExist) {
            await queryRunner.addColumn('order_product', new TableColumn({
                name: 'order_status_id',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExistt = await queryRunner.hasColumn('order_product', 'tracking_url');
        if (!ifExistt) {
            await queryRunner.addColumn('order_product', new TableColumn({
                name: 'tracking_url',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExisttt = await queryRunner.hasColumn('order_product', 'tracking_no');
        if (!ifExisttt) {
            await queryRunner.addColumn('order_product', new TableColumn({
                name: 'tracking_no',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const table = await queryRunner.getTable('order_product');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_status_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order_product', 'order_status_id');
        await queryRunner.dropColumn('order_product', 'tracking_url');
        await queryRunner.dropColumn('order_product', 'tracking_no');
    }

}
