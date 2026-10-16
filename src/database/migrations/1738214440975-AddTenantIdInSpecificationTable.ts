import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddTenantIdInSpecificationToAttributeGroup1738214440975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // Column check and execute
        const columns = ['specification', 'specification_to_attribute_group'];

        // const ifExist = await queryRunner.hasColumn('customer', 'local');

        for (const val of columns) {
            const ifExist = await queryRunner.hasColumn(val, 'tenant_id');
            if (!ifExist) {
                await queryRunner.addColumn(val, new TableColumn({
                    name: 'tenant_id',
                    type: 'int',
                    isNullable: false, // Make tenant_id non-nullable
                }));
            }
        }

        await queryRunner.createIndex('specification', new TableIndex({
            name: 'IDX_SPECIFICATION_TENANT_ID',
            columnNames: ['tenant_id'],
        }));

        // 3. Add foreign key constraint for tenant_id in specification_to_attribute_group referencing specification's tenant_id
        await queryRunner.createForeignKey('specification_to_attribute_group', new TableForeignKey({
            name: 'fk_specification_to_attribute_group_specification_tenant_id',
            columnNames: ['tenant_id'],
            referencedTableName: 'specification',
            referencedColumnNames: ['tenant_id'],
            onDelete: 'CASCADE', // Adjust delete behavior
            onUpdate: 'CASCADE',  // Adjust update behavior
        }));

        // 4. Add foreign key constraint for tenant_id in specification_to_attribute_group referencing attribute_group's tenant_id
        await queryRunner.createForeignKey('specification_to_attribute_group', new TableForeignKey({
            name: 'FK_specification_to_attribute_group_attribute_group_tenant_id',
            columnNames: ['tenant_id'],
            referencedTableName: 'attribute_group',
            referencedColumnNames: ['tenant_id'],
            onDelete: 'CASCADE', // Adjust delete behavior
            onUpdate: 'CASCADE',  // Adjust update behavior
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Drop foreign keys related to tenant_id
        const table = await queryRunner.getTable('specification_to_attribute_group');
        const foreignKeys = table.foreignKeys.filter(fk => fk.columnNames.includes('tenant_id'));

        for (const fk of foreignKeys) {
            await queryRunner.dropForeignKey('specification_to_attribute_group', fk);
        }

        // 2. Drop index on tenant_id in specification_to_attribute_group
        await queryRunner.dropIndex('specification_to_attribute_group', 'IDX_specification_to_attribute_group_tenant_id');

        // 3. Remove tenant_id column from specification_to_attribute_group
        await queryRunner.dropColumn('specification_to_attribute_group', 'tenant_id');
    }
}
