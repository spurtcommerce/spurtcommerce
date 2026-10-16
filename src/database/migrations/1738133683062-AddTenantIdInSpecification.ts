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
        const tables = [['attribute', 'IDX_ATTRIBUTE_TENANT_ID'], ['attribute_group', 'IDX_ATTRIBUTE_GROUP_TENANT_ID']];

        // const table = await queryRunner.getTables(['attribute_group', 'attribute']);
        for (const val of tables) {
            const table = await queryRunner.getTable(val[0]);
            // console.log()
            const indexExists = table?.indices.some(
                index => index.columnNames.includes('tenant_id')
            );

            if (!indexExists) {
                await queryRunner.createIndex(val[0], new TableIndex({
                    name: val[1],
                    columnNames: ['tenant_id'],
                }));
            }
        }

        // // 6. Create foreign key from attribute_to_group's tenant_id to attribute's tenant_id
        // await queryRunner.createForeignKey('attribute_to_group', new TableForeignKey({
        //     name: 'fk_attribute_to_group_attribute_tenant_id',
        //     columnNames: ['tenant_id'],
        //     referencedTableName: 'attribute',
        //     referencedColumnNames: ['tenant_id'],
        //     onDelete: 'CASCADE',
        // }));

        // // 7. Create foreign key from attribute_to_group's tenant_id to attribute_group's tenant_id
        // await queryRunner.createForeignKey('attribute_to_group', new TableForeignKey({
        //     name: 'fk_attribute_to_group_attribute_group_tenant_id',
        //     columnNames: ['tenant_id'],
        //     referencedTableName: 'attribute_group',
        //     referencedColumnNames: ['tenant_id'],
        //     onDelete: 'CASCADE',
        // }));

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
