import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm';

export class AddTenantIdInSpecificationAttributeGroupToAttrTable1738217173504 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('spec_attr_grp_to_attribute', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            isNullable: false, // Make tenant_id non-nullable
        }));

        await queryRunner.createIndex('spec_attr_grp_to_attribute', new TableIndex({
            name: 'IDX_SPECIFICATION_ATTR_GRP_TO_ATTR_TENANT_ID',
            columnNames: ['tenant_id'],
        }));

        // 3. Add foreign key constraint for tenant_id in specification_to_attribute_group referencing specification's tenant_id
        await queryRunner.createForeignKey('spec_attr_grp_to_attribute', new TableForeignKey({
            name: 'fk_spec_attr_grp_to_attribute_attribute_tenant_id',
            columnNames: ['tenant_id'],
            referencedTableName: 'attribute',
            referencedColumnNames: ['tenant_id'],
            onDelete: 'CASCADE', // Adjust delete behavior
            onUpdate: 'CASCADE',  // Adjust update behavior
        }));

        // 4. Add foreign key constraint for tenant_id in specification_to_attribute_group referencing attribute_group's tenant_id
        await queryRunner.createForeignKey('spec_attr_grp_to_attribute', new TableForeignKey({
            name: 'Fk_spec_attr_grp_to_attr_spec_to_attr_group_tenant_id',
            columnNames: ['tenant_id'],
            referencedTableName: 'specification_to_attribute_group',
            referencedColumnNames: ['tenant_id'],
            onDelete: 'CASCADE', // Adjust delete behavior
            onUpdate: 'CASCADE',  // Adjust update behavior
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
