import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecomandationPermissionMOduleGroup1770271294960 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO vendor_permission_module_group
            (module_group_id, name, slug_name, sort_order)
            VALUES
            (45, 'Recommendations', 'recommendations', 45)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
