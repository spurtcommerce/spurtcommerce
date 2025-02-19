import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUnwantedPermissionModule1733402809834 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM permission_module_group
            WHERE slug_name IN ('settings-delivery-location', 'buyer-group', 'settings-stock-status', 'sales-archive-payment', 'sales-inventory', 'sales-quotation-request', 'variant-stock-update', 'bulk-import-mapping', 'bulk-product-imports', 'market-place-sales');
        `);
        await queryRunner.query(`
            DELETE FROM permission_module
            WHERE slug_name IN ('attribute-settings', 'variant-settings', 'audit-log-single-excel');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
