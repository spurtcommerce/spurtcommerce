import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddValuesVendorPermissionModuleGroup1752496597716 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO \`vendor_permission_module_group\`
            (\`module_group_id\`, \`name\`, \`slug_name\`, \`sort_order\`, \`created_date\`)
          VALUES
            (1, 'Orders', 'orders', 1, NOW()),
            (2, 'Back Orders', 'back-orders', 2, NOW()),
            (3, 'Archive Orders', 'archive-orders', 3, NOW()),
            (4, 'Product List', 'product-list', 4, NOW()),
            (5, 'Stock Update', 'stock-update', 5, NOW()),
            (6, 'Categories', 'categories', 6, NOW()),
            (7, 'Bulk Product Import', 'bulk-product-import', 7, NOW()),
            (8, 'Product Localization', 'product-localization', 8, NOW()),
            (9, 'Customer', 'customer', 9, NOW()),
            (10, 'Customer Users', 'customer-users', 10, NOW()),
            (11, 'Customer User Role', 'customer-user-role', 11, NOW()),
            (12, 'Customer Group', 'customer-group', 12, NOW()),
            (13, 'Banners', 'banners', 13, NOW()),
            (14, 'Website Settings', 'website-settings', 14, NOW()),
            (15, 'Setting Localization', 'setting-localization', 15, NOW()),
            (16, 'User and Permission', 'user-and-permission', 16, NOW()),
            (17, 'Settings System', 'settings-system', 17, NOW()),
            (18, 'Settings Personalize', 'settings-personalize', 18, NOW()),
            (19, 'Settings Order Status', 'settings-order-status', 19, NOW()),
            (20, 'Settings Add-Ons', 'settings-add-ons', 20, NOW());
        `);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // --
  }

}
