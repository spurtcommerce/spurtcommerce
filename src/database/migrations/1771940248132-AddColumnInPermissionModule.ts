import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnInPermissionModule1771940248132 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            INSERT INTO customer_permission_module
            (name, slug_name, sort_order, module_group_id, is_listed, created_date)
            VALUES
            ('Reject Quote', 'reject-quote', 3, 9, 0, NOW());
        `);

        await queryRunner.query(`
            UPDATE customer_permission_module
            SET name = 'Accept Quote',
                slug_name = 'accept-quote'
            WHERE slug_name = 'create-quote'
        `);

        await queryRunner.query(`
            UPDATE customer_permission_module
            SET is_listed = true
            WHERE slug_name = 'view-shopping-list-line-item'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
