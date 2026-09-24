import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRecomandationPermissionModules1770271329891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO vendor_permission_module
            (module_group_id, name, slug_name, sort_order)
            VALUES
            (45, 'List Product Recommendations', 'list-vendor-product-recommendations', 1),
            (45, 'Configure Product Recomandations', 'configure-Product-recomandations', 2)
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
