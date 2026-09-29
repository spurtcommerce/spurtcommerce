import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddValuesCustomerPermissionModuleGroup1749640060620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO \`customer_permission_module_group\`
              (\`id\`, \`name\`, \`slug_name\`, \`sort_order\`, \`created_date\`)
            VALUES
              (1, 'Checkout', 'checkout', 1, '2025-06-11 00:00:00'),
              (2, 'Customer Address', 'customer-address', 3, '2025-06-11 00:00:00'),
              (3, 'Customer Profile', 'customer-profile', 4, '2025-06-11 00:00:00'),
              (4, 'Customer User', 'customer-user', 5, '2025-06-11 00:00:00'),
              (5, 'Customer User Role', 'customer-user-role', 6, '2025-06-11 00:00:00'),
              (6, 'Shopping List', 'shopping-list', 7, '2025-06-11 00:00:00'),
              (7, 'Request For Quotes', 'request-for-quotes', 8, '2025-06-11 00:00:00'),
              (8, 'Order History', 'order-history', 9, '2025-06-11 00:00:00'),
              (9, 'Quotes', 'quotes', 10, '2025-06-11 00:00:00'),
              (10, 'Shopping List Line Item', 'shopping-list-line-item', 7, '2025-06-11 00:00:00');
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
