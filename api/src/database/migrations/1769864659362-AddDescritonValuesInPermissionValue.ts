import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescritonValuesInPermissionValue1769864659362 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            UPDATE customer_permission_module_group SET description =
            'This allows you to place and view orders in storefront' WHERE id = 1
          `);

          await queryRunner.query(`
            UPDATE customer_permission_module_group SET description =
            'Allows the management of customer shipping and billing address' WHERE id = 2
          `);

          await queryRunner.query(`
            UPDATE customer_permission_module_group SET description =
            'Allow to access the customer profile details including basic details' WHERE id = 3
          `);

          await queryRunner.query(`
            UPDATE customer_permission_module_group SET description =
            'Allows the creation of users who can be assigned below the current customer' WHERE id = 4
          `);

          await queryRunner.query(`
            UPDATE customer_permission_module_group SET description =
            'Allows the access to manage the roles and their necessary actions' WHERE id = 5
          `);

          await queryRunner.query(`
            UPDATE customer_permission_module_group SET description =
            'Allows to view, create and manage the shopping list and their items' WHERE id = 6
          `);

          await queryRunner.query(`
            UPDATE customer_permission_module_group SET description =
            'Enables the access to view and manage the Request for Quotes from customer end' WHERE id = 7
          `);

          await queryRunner.query(`
            UPDATE customer_permission_module_group SET description =
            'View and manage the history of orders and allow the users to access sensitive information related to orders' WHERE id = 8
          `);

          await queryRunner.query(`
            UPDATE customer_permission_module_group SET description =
            'Allows full access to view, accept or reject the quotes coming from seller' WHERE id = 9
          `);

          await queryRunner.query(`
            UPDATE customer_permission_module_group SET description =
            'Allows users the access to edit and manage the shopping list line items' WHERE id = 10
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
