import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePermissions1771594393707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE customer_permission_module
            SET is_listed = true
            WHERE slug_name IN (
                'view-customer-address',
                'view-customer-profile',
                'view-customer-user-role',
                'view-shopping-list'
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE customer_permission_module
            SET is_listed = false
            WHERE slug_name IN (
                'view-customer-address',
                'view-customer-profile',
                'view-customer-user-role',
                'view-shopping-list'
            )
        `);
    }
}
