import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from 'typeorm';

export class AddColumnInPriceUpdateFileLog1581600070078 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_vendor_tbl_price_update_file_log_foreignKey',
        columnNames: ['vendor_id'],
        referencedColumnNames: ['vendor_id'],
        referencedTableName: 'vendor',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('price_update_file_log', 'vendor_id');
        if (!ifExist) {
            await queryRunner.addColumn('price_update_file_log', new TableColumn({
                name: 'vendor_id',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                }));
        }

        const table = await queryRunner.getTable('price_update_file_log');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('price_update_file_log', 'vendor_id');
    }

}
