import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddTenantIdInSpecificationAttributeGroupToAttrTable1738217173504 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const ifExist = await queryRunner.hasColumn('spec_attr_grp_to_attribute', 'tenant_id');
        if (!ifExist) {
            await queryRunner.addColumn('spec_attr_grp_to_attribute', new TableColumn({
                name: 'tenant_id',
                type: 'int',
                isNullable: false, // Make tenant_id non-nullable
            }));
        }
        await queryRunner.createIndex('spec_attr_grp_to_attribute', new TableIndex({
            name: 'IDX_SPECIFICATION_ATTR_GRP_TO_ATTR_TENANT_ID',
            columnNames: ['tenant_id'],
        }));

        const attrToGroupTable = await queryRunner.getTable('spec_attr_grp_to_attribute');
        const fkAttrExists = attrToGroupTable?.foreignKeys.some(
            fk => fk.name === 'fk_spec_attr_grp_to_attribute_attribute_tenant_id' || (fk.referencedTableName === 'attribute' && fk.columnNames?.includes('tenant_id'))
        );

        if (!fkAttrExists) {
            // 3. Add foreign key constraint for tenant_id in specification_to_attribute_group referencing specification's tenant_id
            await queryRunner.createForeignKey('spec_attr_grp_to_attribute', new TableForeignKey({
                name: 'fk_spec_attr_grp_to_attribute_attribute_tenant_id',
                columnNames: ['tenant_id'],
                referencedTableName: 'attribute',
                referencedColumnNames: ['tenant_id'],
                onDelete: 'CASCADE', // Adjust delete behavior
                onUpdate: 'CASCADE',  // Adjust update behavior
            })).catch((e) => console.log(e));
        }

        const fkAttrExists1 = attrToGroupTable?.foreignKeys.some(
            fk => fk.name === 'Fk_spec_attr_grp_to_attr_spec_to_attr_group_tenant_id' || (fk.referencedTableName === 'specification_to_attribute_group' && fk.columnNames?.includes('tenant_id'))
        );
        if (!fkAttrExists1) {
            // 4. Add foreign key constraint for tenant_id in specification_to_attribute_group referencing attribute_group's tenant_id
            await queryRunner.createForeignKey('spec_attr_grp_to_attribute', new TableForeignKey({
                name: 'Fk_spec_attr_grp_to_attr_spec_to_attr_group_tenant_id',
                columnNames: ['tenant_id'],
                referencedTableName: 'specification_to_attribute_group',
                referencedColumnNames: ['tenant_id'],
                onDelete: 'CASCADE', // Adjust delete behavior
                onUpdate: 'CASCADE',  // Adjust update behavior
            })).catch((e) => console.log(e));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
