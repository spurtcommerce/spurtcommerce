import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateIsList1770201343566 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE vendor_permission_module
            SET is_listed = 1
            WHERE slug_name IN (
                'vendor-specification-mapping',
                'vendor-product-family',
                'vendor-product-specification',
                'vendor-product-attribute-group'
            )
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
