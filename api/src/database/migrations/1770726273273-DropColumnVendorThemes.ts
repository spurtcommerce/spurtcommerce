import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropColumnVendorThemes1770726273273 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor_themes', 'default_palette');
        await queryRunner.dropColumn('vendor_themes', 'primary_color');
        await queryRunner.dropColumn('vendor_themes', 'secondary_color');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
