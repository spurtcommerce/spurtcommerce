import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddRelationToServiceTable1560773355102 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_tbl_service_to_category_tbl_service_category',
        columnNames: ['service_category_id'],
        referencedColumnNames: ['service_category_id'],
        referencedTableName: 'service_category',
        onDelete: 'CASCADE',
    });

    private tableForeignKeys = new TableForeignKey({
        name: 'fk_tbl_service_to_category_tbl_service',
        columnNames: ['service_id'],
        referencedColumnNames: ['service_id'],
        referencedTableName: 'service',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('service_to_category');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('service_category_id') !== -1);
        const ifTableExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('service_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
        if (!ifTableExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKeys);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('service_to_category');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('service_category_id') !== -1);
        const ifTableExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('service_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
        if (ifTableExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKeys);
        }
    }
}
