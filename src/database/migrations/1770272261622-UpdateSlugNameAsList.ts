import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSlugNameAsList1770272261622 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            UPDATE vendor_permission_module
            SET slug_name = 'list-vendor-specification-mapping'
            WHERE slug_name = 'vendor-specification-mapping'
        `);

        await queryRunner.query(`
            UPDATE vendor_permission_module
            SET slug_name = 'list-vendor-product-family'
            WHERE slug_name = 'vendor-product-family'
        `);

        await queryRunner.query(`
            UPDATE vendor_permission_module
            SET slug_name = 'list-vendor-product-specification'
            WHERE slug_name = 'vendor-product-specification'
        `);

        await queryRunner.query(`
            UPDATE vendor_permission_module
            SET slug_name = 'list-vendor-product-attribute-group'
            WHERE slug_name = 'vendor-product-attribute-group'
        `);

    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
