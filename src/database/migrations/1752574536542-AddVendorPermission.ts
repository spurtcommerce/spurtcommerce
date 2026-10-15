import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVendorPermission1752574536542 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO vendor_permission_module_group (name, slug_name, sort_order, created_date)
        VALUES ('Product Attribute', 'product-attribute', 22, NOW());`);

        const groupResult = await queryRunner.query(`
        SELECT module_group_id FROM vendor_permission_module_group WHERE slug_name = 'product-attribute';`);
        const groupId = groupResult[0]?.module_group_id;

        await queryRunner.query(`
        INSERT INTO vendor_permission_module (name, slug_name, sort_order, module_group_id, is_listed, created_date)
        VALUES
        ('List Product Attribute', 'list-product-attribute', 1, ${groupId}, 1, NOW()),
        ('Create Product Attribute', 'create-product-attribute', 2, ${groupId}, 0, NOW()),
        ('Edit Product Attribute', 'edit-product-attribute', 3, ${groupId}, 0, NOW()),
        ('Delete Product Attribute', 'delete-product-attribute', 4, ${groupId}, 0, NOW());
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
