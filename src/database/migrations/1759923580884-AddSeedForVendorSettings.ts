import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSeedForVendorSettings1759923580884 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      UPDATE vendor_settings
      SET
        product_create_count = NULL,
        feature_access = JSON_OBJECT(
          'api_access', TRUE,
          'badges_removal', TRUE,
          'own_domain_name', TRUE,
          'custom_email_name', TRUE,
          'multiple_templates', TRUE,
          'self_hosted_option', TRUE,
          'source_code_access', TRUE,
          'customize_store_templates', TRUE
        );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
