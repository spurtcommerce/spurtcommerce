import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddValuesVendorPermissionModule1752496613651 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO \`vendor_permission_module\` (\`module_id\`, \`name\`, \`slug_name\`, \`sort_order\`, \`module_group_id\`, \`is_listed\`, \`created_date\`) VALUES
            (1, 'List Order', 'list-order', 1, 1, 1, NOW()),
            (2, 'View Order', 'view-order', 2, 1, 0, NOW()),
            (3, 'Create Order', 'create-order', 3, 1, 0, NOW()),
            (4, 'Export Order', 'export-order', 4, 1, 0, NOW()),
            (5, 'Update Order', 'update-order', 5, 1, 0, NOW()),

            (6, 'List Back Order', 'list-back-order', 1, 2, 1, NOW()),
            (7, 'View Back Order', 'view-back-order', 2, 2, 0, NOW()),
            (8, 'Export Back Order', 'export-back-order', 3, 2, 0, NOW()),
            (9, 'Fulfill Now Back Order', 'fulfill-now-back-order', 4, 2, 0, NOW()),

            (10, 'List Archive Orders', 'list-archive-orders', 1, 3, 1, NOW()),
            (11, 'View Archive Orders', 'view-archive-orders', 2, 3, 0, NOW()),
            (12, 'Export Archive Orders', 'export-archive-orders', 3, 3, 0, NOW()),
            (13, 'Revoke Archive Orders', 'revoke-archive-orders', 4, 3, 0, NOW()),

            (14, 'List Product', 'list-product', 1, 4, 1, NOW()),
            (15, 'Create Product', 'create-product', 2, 4, 0, NOW()),
            (16, 'Edit Product', 'edit-product', 3, 4, 0, NOW()),
            (17, 'Delete Product', 'delete-product', 4, 4, 0, NOW()),
            (18, 'Export Product', 'export-product', 5, 4, 0, NOW()),

            (19, 'Stock List', 'stock-list', 1, 5, 1, NOW()),
            (20, 'Update Stock', 'update-stock', 2, 5, 0, NOW()),

            (21, 'List Categories', 'list-categories', 1, 6, 1, NOW()),
            (22, 'Create Categories', 'create-categories', 2, 6, 0, NOW()),
            (23, 'Edit Categories', 'edit-categories', 3, 6, 0, NOW()),
            (24, 'Delete Categories', 'delete-categories', 4, 6, 0, NOW()),
            (25, 'Export Categories', 'export-categories', 5, 6, 0, NOW()),
            (26, 'Localization', 'localization', 6, 6, 0, NOW()),

            (27, 'Standard Import', 'standard-import', 1, 7, 0, NOW()),
            (28, 'Custom Import', 'custom-import', 2, 7, 0, NOW()),

            (29, 'List Localization', 'list-localization', 1, 8, 1, NOW()),
            (30, 'Edit Localization', 'edit-localization', 2, 8, 0, NOW()),

            (31, 'List Customer', 'list-customer', 1, 9, 1, NOW()),
            (32, 'Create Customer', 'create-customer', 2, 9, 0, NOW()),
            (33, 'Edit Customer', 'edit-customer', 3, 9, 0, NOW()),
            (34, 'Delete Customer', 'delete-customer', 4, 9, 0, NOW()),
            (35, 'Export Customer', 'export-customer', 5, 9, 0, NOW()),

            (36, 'List Customer User', 'list-customer-user', 1, 10, 1, NOW()),
            (37, 'Create Customer User', 'create-customer-user', 2, 10, 0, NOW()),
            (38, 'Edit Customer User', 'edit-customer-user', 3, 10, 0, NOW()),
            (39, 'Delete Customer User', 'delete-customer-user', 4, 10, 0, NOW()),
            (40, 'Export Customer User', 'export-customer-user', 5, 10, 0, NOW()),

            (41, 'List Customer User Role', 'list-customer-user-role', 1, 11, 1, NOW()),
            (42, 'Create Customer User Role', 'create-customer-user-role', 2, 11, 0, NOW()),
            (43, 'Edit Customer User Role', 'edit-customer-user-role', 3, 11, 0, NOW()),
            (44, 'Delete Customer User Role', 'delete-customer-user-role', 4, 11, 0, NOW()),
            (45, 'Export Customer User Role', 'export-customer-user-role', 5, 11, 0, NOW()),
            (46, 'Edit Access Control', 'edit-access-control', 6, 11, 0, NOW()),

            (47, 'List Customer Group', 'list-customer-group', 1, 12, 1, NOW()),
            (48, 'Create Customer Group', 'create-customer-group', 2, 12, 0, NOW()),
            (49, 'Edit Customer Group', 'edit-customer-group', 3, 12, 0, NOW()),
            (50, 'Delete Customer Group', 'delete-customer-group', 4, 12, 0, NOW()),
            (51, 'Manage Customer Group', 'manage-customer-group', 5, 12, 0, NOW()),

            (52, 'List Banners', 'list-banners', 1, 13, 1, NOW()),
            (53, 'Create Banners', 'create-banners', 2, 13, 0, NOW()),
            (54, 'Edit Banners', 'edit-banners', 3, 13, 0, NOW()),
            (55, 'Delete Banners', 'delete-banners', 4, 13, 0, NOW()),
            (56, 'Export Banners', 'export-banners', 5, 13, 0, NOW()),

            (57, 'View Website Settings', 'view-website-settings', 1, 14, 0, NOW()),
            (58, 'Edit Website Settings', 'edit-website-settings', 2, 14, 0, NOW()),

            (59, 'List Setting Localization', 'list-setting-localization', 1, 15, 1, NOW()),

            (60, 'List Role', 'list-role', 1, 16, 1, NOW()),
            (61, 'Create Role', 'create-role', 2, 16, 0, NOW()),
            (62, 'Edit Role', 'edit-role', 3, 16, 0, NOW()),
            (63, 'Delete Role', 'delete-role', 4, 16, 0, NOW()),
            (64, 'Edit Permission', 'edit-permission', 5, 16, 0, NOW()),
            (65, 'List User', 'list-user', 6, 16, 1, NOW()),
            (66, 'Create User', 'create-user', 7, 16, 0, NOW()),
            (67, 'Edit User', 'edit-user', 8, 16, 0, NOW()),
            (68, 'Delete User', 'delete-user', 9, 16, 0, NOW()),

            (69, 'Maintenance', 'maintenance', 1, 17, 0, NOW()),
            (70, 'Audit Log', 'audit-log', 2, 17, 0, NOW()),

            (71, 'List Email Template', 'list-email-template', 5, 18, 1, NOW()),
            (72, 'Edit Email Template', 'edit-email-template', 6, 18, 0, NOW()),
            (73, 'Delete Email Template', 'delete-email-template', 7, 18, 0, NOW()),

            (74, 'List Order Status', 'list-order-status', 1, 19, 1, NOW()),
            (75, 'Create Order Status', 'create-order-status', 2, 19, 0, NOW()),
            (76, 'Edit Order Status', 'edit-order-status', 3, 19, 0, NOW()),
            (77, 'Delete Order Status', 'delete-order-status', 4, 19, 0, NOW()),

            (78, 'Add-On', 'add-on', 1, 20, 0, NOW());
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // --
  }

}
