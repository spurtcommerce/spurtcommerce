import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateVendorThemesColumnAsNull1771324755464 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          UPDATE vendor_themes
          SET
            preview_image = NULL,
            preview_image_path = NULL
        `);
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
