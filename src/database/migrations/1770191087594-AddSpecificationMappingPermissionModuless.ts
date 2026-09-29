import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSpecificationMappingPermissionModuless1770191087594 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO vendor_permission_module_group
            (module_group_id, name, slug_name, sort_order, description)
            VALUES
            (41, 'Product Attribute Group', 'product-attribute-group', 41, 'Vendor Product Attribute Group Permissions')
        `);

        await queryRunner.query(`
            INSERT INTO vendor_permission_module_group
            (module_group_id, name, slug_name, sort_order)
            VALUES
            (42, 'Product Specification', 'vendor-product-specification-group', 42)
        `);

        await queryRunner.query(`
            INSERT INTO vendor_permission_module_group
            (module_group_id, name, slug_name, sort_order)
            VALUES
            (43, 'Product Family', 'vendor-product-family-group', 43)
        `);

        await queryRunner.query(`
            INSERT INTO vendor_permission_module_group
            (module_group_id, name, slug_name, sort_order)
            VALUES
            (44, 'Specification Mapping', 'vendor-specification-mapping-group', 44)
        `);

        await queryRunner.query(`
            INSERT INTO vendor_permission_module
            (module_group_id, name, slug_name, sort_order)
            VALUES
            (41, 'List Product Attribute Group', 'vendor-product-attribute-group', 1),
            (41, 'Create Product Attribute Group', 'create-vendor-product-attribute-group', 2),
            (41, 'Edit Product Attribute Group', 'edit-vendor-product-attribute-group', 3),
            (41, 'Delete Product Attribute Group', 'delete-vendor-product-attribute-group', 4)
        `);

        await queryRunner.query(`
            INSERT INTO vendor_permission_module
            (module_group_id, name, slug_name, sort_order)
            VALUES
            (42, 'List Product Specification', 'vendor-product-specification', 1),
            (42, 'Create Product Specification', 'create-vendor-product-specification', 2),
            (42, 'Edit Product Specification', 'edit-vendor-product-specification', 3),
            (42, 'Delete Product Specification', 'delete-vendor-product-specification', 4)
        `);

        await queryRunner.query(`
            INSERT INTO vendor_permission_module
            (module_group_id, name, slug_name, sort_order)
            VALUES
            (43, 'List Product Family', 'vendor-product-family', 1),
            (43, 'Create Product Family', 'create-vendor-product-family', 2),
            (43, 'Edit Product Family', 'edit-vendor-product-family', 3),
            (43, 'Delete Product Family', 'delete-vendor-product-family', 4)
        `);

        await queryRunner.query(`
            INSERT INTO vendor_permission_module
            (module_group_id, name, slug_name, sort_order)
            VALUES
            (44, 'List Specification Mapping', 'vendor-specification-mapping', 1),
            (44, 'Edit Specification Mapping', 'edit-vendor-specification-mapping', 2)
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
