import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateImagePathForThemes1770456632365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
          UPDATE vendor_themes
          SET preview_image_path = CONCAT('themes/', preview_image)
          WHERE preview_image IS NOT NULL
        `);
      }
    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
