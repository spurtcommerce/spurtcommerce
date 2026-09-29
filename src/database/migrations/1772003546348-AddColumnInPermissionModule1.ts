import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnInPermissionModule11772003546348 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE customer_permission_module
            SET is_listed = true
            WHERE slug_name = 'view-customer-user'
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
