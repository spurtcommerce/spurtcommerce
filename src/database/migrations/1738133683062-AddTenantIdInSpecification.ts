import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddTenantIdColumnsAndForeignKey1738133683062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const columns = ['attribute', 'attribute_group', 'attribute_to_group'];

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
        // const ifExist = await queryRunner.hasColumn('attribute', 'tenant_id');
        const indexesToCreate = [
            { tableName: 'attribute', indexName: 'IDX_ATTRIBUTE_TENANT_ID', columnNames: ['tenant_id'] },
            { tableName: 'attribute_group', indexName: 'IDX_ATTRIBUTE_GROUP_TENANT_ID', columnNames: ['tenant_id'] },
            { tableName: 'attribute', indexName: 'IDX_ATTRIBUTE_ID_TENANT_ID', columnNames: ['id', 'tenant_id'] },
            { tableName: 'attribute_group', indexName: 'IDX_ATTRIBUTE_GROUP_ID_TENANT_ID', columnNames: ['id', 'tenant_id'] },
        ];

        for (const item of indexesToCreate) {
            const table = await queryRunner.getTable(item.tableName);
            const indexExists = table?.indices.some(
                index => index.name === item.indexName ||
                    (index.columnNames.length === item.columnNames.length &&
                     item.columnNames.every((col, idx) => index.columnNames[idx] === col))
            );

            if (!indexExists) {
                await queryRunner.createIndex(item.tableName, new TableIndex({
                    name: item.indexName,
                    columnNames: item.columnNames,
                }));
            }
        }

        const attrToGroupTable = await queryRunner.getTable('attribute_to_group');

        const fkAttrExists = attrToGroupTable?.foreignKeys.some(
            fk => fk.name === 'fk_attribute_to_group_attribute_tenant'
        );
        if (!fkAttrExists) {
            await queryRunner.createForeignKey(
                'attribute_to_group',
                new TableForeignKey({
                    name: 'fk_attribute_to_group_attribute_tenant',
                    columnNames: ['attribute_id', 'tenant_id'],
                    referencedTableName: 'attribute',
                    referencedColumnNames: ['id', 'tenant_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                })
            );
        }

        const fkGroupExists = attrToGroupTable?.foreignKeys.some(
            fk => fk.name === 'fk_attribute_to_group_group_tenant'
        );
        if (!fkGroupExists) {
            await queryRunner.createForeignKey(
                'attribute_to_group',
                new TableForeignKey({
                    name: 'fk_attribute_to_group_group_tenant',
                    columnNames: ['attribute_group_id', 'tenant_id'],
                    referencedTableName: 'attribute_group',
                    referencedColumnNames: ['id', 'tenant_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Drop foreign keys related to tenant_id
        const table = await queryRunner.getTable('attribute_to_group');
        if (table) {
            const foreignKeys = table.foreignKeys.filter(fk => fk.columnNames.includes('tenant_id'));
            for (const fk of foreignKeys) {
                await queryRunner.dropForeignKey('attribute_to_group', fk);
            }
        }

        // 2. Drop indexes created for tenant_id
        const attributeTable = await queryRunner.getTable('attribute');
        if (attributeTable?.indices.some(i => i.name === 'IDX_ATTRIBUTE_ID_TENANT_ID')) {
            await queryRunner.dropIndex('attribute', 'IDX_ATTRIBUTE_ID_TENANT_ID');
        }
        if (attributeTable?.indices.some(i => i.name === 'IDX_ATTRIBUTE_TENANT_ID')) {
            await queryRunner.dropIndex('attribute', 'IDX_ATTRIBUTE_TENANT_ID');
        }

        const attributeGroupTable = await queryRunner.getTable('attribute_group');
        if (attributeGroupTable?.indices.some(i => i.name === 'IDX_ATTRIBUTE_GROUP_ID_TENANT_ID')) {
            await queryRunner.dropIndex('attribute_group', 'IDX_ATTRIBUTE_GROUP_ID_TENANT_ID');
        }
        if (attributeGroupTable?.indices.some(i => i.name === 'IDX_ATTRIBUTE_GROUP_TENANT_ID')) {
            await queryRunner.dropIndex('attribute_group', 'IDX_ATTRIBUTE_GROUP_TENANT_ID');
        }

        // 3. Drop tenant_id columns from each table
        await queryRunner.dropColumn('attribute_to_group', 'tenant_id');
        await queryRunner.dropColumn('attribute_group', 'tenant_id');
        await queryRunner.dropColumn('attribute', 'tenant_id');
    }
}
