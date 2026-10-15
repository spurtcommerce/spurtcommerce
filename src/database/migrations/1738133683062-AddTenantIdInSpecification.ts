import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddTenantIdColumnsAndForeignKey1738133683062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Add tenant_id column to the attribute table
        await queryRunner.addColumn('attribute', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            isNullable: false, // Make tenant_id non-nullable
        }));

        // 2. Add tenant_id column to the attribute_group table
        await queryRunner.addColumn('attribute_group', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            isNullable: false, // Make tenant_id non-nullable
        }));

        // 3. Add tenant_id column to the attribute_to_group table
        await queryRunner.addColumn('attribute_to_group', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            isNullable: false, // Make tenant_id non-nullable
        }));

        // 4. Add index on tenant_id column in attribute table (required for foreign key)
        await queryRunner.createIndex('attribute', new TableIndex({
            name: 'IDX_ATTRIBUTE_TENANT_ID',
            columnNames: ['tenant_id'],
        }));

        // 5. Add index on tenant_id column in attribute_group table (required for foreign key)
        await queryRunner.createIndex('attribute_group', new TableIndex({
            name: 'IDX_ATTRIBUTE_GROUP_TENANT_ID',
            columnNames: ['tenant_id'],
        }));

        // 6. Create foreign key from attribute_to_group's tenant_id to attribute's tenant_id
        await queryRunner.createForeignKey('attribute_to_group', new TableForeignKey({
            name: 'fk_attribute_to_group_attribute_tenant_id',
            columnNames: ['tenant_id'],
            referencedTableName: 'attribute',
            referencedColumnNames: ['tenant_id'],
            onDelete: 'CASCADE',
        }));

        // 7. Create foreign key from attribute_to_group's tenant_id to attribute_group's tenant_id
        await queryRunner.createForeignKey('attribute_to_group', new TableForeignKey({
            name: 'fk_attribute_to_group_attribute_group_tenant_id',
            columnNames: ['tenant_id'],
            referencedTableName: 'attribute_group',
            referencedColumnNames: ['tenant_id'],
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Drop foreign keys related to tenant_id
        const table = await queryRunner.getTable('attribute_to_group');
        const foreignKeys = table.foreignKeys.filter(fk => fk.columnNames.includes('tenant_id'));
        for (const fk of foreignKeys) {
            await queryRunner.dropForeignKey('attribute_to_group', fk);
        }

        // 2. Drop tenant_id columns from each table
        await queryRunner.dropColumn('attribute_to_group', 'tenant_id');
        await queryRunner.dropColumn('attribute_group', 'tenant_id');
        await queryRunner.dropColumn('attribute', 'tenant_id');

        // 3. Drop indexes created for tenant_id
        await queryRunner.dropIndex('attribute', 'IDX_ATTRIBUTE_TENANT_ID');
        await queryRunner.dropIndex('attribute_group', 'IDX_ATTRIBUTE_GROUP_TENANT_ID');
    }
}
