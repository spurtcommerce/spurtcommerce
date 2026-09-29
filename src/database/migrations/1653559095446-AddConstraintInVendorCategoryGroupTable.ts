import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddConstraintInVendorCategoryGroupTable1653559095446 implements MigrationInterface {

    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_tbl_vendor_group_category_tbl_vendor_group',
        columnNames: ['vendor_group_id'],
        referencedColumnNames: ['group_id'],
        referencedTableName: 'vendor_group',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('vendor_group_category');
        const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_group_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('vendor_group_category');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_group_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey1);
        }
    }
}
