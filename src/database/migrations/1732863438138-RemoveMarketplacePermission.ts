import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveMarketplacePermission1732863438138 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM permission_module
            WHERE slug_name IN ('create-market-place-product', 'edit-market-place-product', 'delete-market-place-product', 'delete-failed-order', 'delete-order');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
