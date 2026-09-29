import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddValuesCustomerPermissionModule1749643605443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO customer_permission_module (id, name, slug_name, sort_order, module_group_id, created_date) VALUES
            -- Checkout Permissions
            (1, 'View Checkout', 'view-checkout', 1, 1, NOW()),
            (2, 'Create Checkout', 'create-checkout', 2, 1, NOW()),
            (3, 'Edit Checkout', 'edit-checkout', 3, 1, NOW()),
            (4, 'Delete Checkout', 'delete-checkout', 4, 1, NOW()),

            -- Customer Address Permissions
            (5, 'View Customer Address', 'view-customer-address', 1, 2, NOW()),
            (6, 'Create Customer Address', 'create-customer-address', 2, 2, NOW()),
            (7, 'Edit Customer Address', 'edit-customer-address', 3, 2, NOW()),
            (8, 'Delete Customer Address', 'delete-customer-address', 4, 2, NOW()),

            -- Customer Profile Permissions
            (9, 'View Customer Profile', 'view-customer-profile', 1, 3, NOW()),
            (10, 'Create Customer Profile', 'create-customer-profile', 2, 3, NOW()),
            (11, 'Edit Customer Profile', 'edit-customer-profile', 3, 3, NOW()),
            (12, 'Delete Customer Profile', 'delete-customer-profile', 4, 3, NOW()),

            -- Customer User Permissions
            (13, 'View Customer User', 'view-customer-user', 1, 4, NOW()),
            (14, 'Create Customer User', 'create-customer-user', 2, 4, NOW()),
            (15, 'Edit Customer User', 'edit-customer-user', 3, 4, NOW()),
            (16, 'Delete Customer User', 'delete-customer-user', 4, 4, NOW()),

            -- Customer User Role Permissions
            (17, 'View Customer User Role', 'view-customer-user-role', 1, 5, NOW()),
            (18, 'Create Customer User Role', 'create-customer-user-role', 2, 5, NOW()),
            (19, 'Edit Customer User Role', 'edit-customer-user-role', 3, 5, NOW()),
            (20, 'Delete Customer User Role', 'delete-customer-user-role', 4, 5, NOW()),

            -- Order Permissions
            (21, 'View Order History', 'view-order-history', 1, 8, NOW()),
            (22, 'Create Order History', 'create-order-history', 2, 8, NOW()),
            (23, 'Edit Order History', 'edit-order-history', 3, 8, NOW()),

            -- Quote Permissions
            (24, 'View Quote', 'view-quote', 1, 9, NOW()),
            (25, 'Create Quote', 'create-quote', 2, 9, NOW()),

            -- Request For Quote Permissions
            (26, 'View Request For Quote', 'view-request-for-quote', 1, 7, NOW()),
            (27, 'Create Request For Quote', 'create-request-for-quote', 2, 7, NOW()),
            (28, 'Edit Request For Quote', 'edit-request-for-quote', 3, 7, NOW()),

            -- Shopping List Permissions
            (29, 'View Shopping List', 'view-shopping-list', 1, 6, NOW()),
            (30, 'Create Shopping List', 'create-shopping-list', 2, 6, NOW()),
            (31, 'Edit Shopping List', 'edit-shopping-list', 3, 6, NOW()),
            (32, 'Delete Shopping List', 'delete-shopping-list', 4, 6, NOW()),

            -- Shopping List Line Item Permissions
            (33, 'View Shopping List Line Item', 'view-shopping-list-line-item', 1, 10, NOW()),
            (34, 'Edit Shopping List Line Item', 'edit-shopping-list-line-item', 2, 10, NOW()),
            (35, 'Delete Shopping List Line Item', 'delete-shopping-list-line-item', 3, 10, NOW());
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
