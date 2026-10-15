import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class RemoveColumnProductSpecToAttrGroup1716801716410 implements MigrationInterface {
    private tableForeignKeyy = new TableForeignKey({
        name: 'fk_prd_spec_to_attr_grp_attr_grp_attribute_group_id',
        columnNames: ['attribute_group_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attribute_group',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('product_spec_to_attribute_group');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('attribute_group_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKeyy);
        }

        await queryRunner.query('ALTER TABLE `product_spec_to_attribute_group` DROP COLUMN `attribute_group_id`');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
