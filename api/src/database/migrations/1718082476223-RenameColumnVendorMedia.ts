import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumnVendorMedia1718082476223 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.hasColumn('vendor_media', 'show_home_page_widget');
        if (exist) {
            await queryRunner.renameColumn('vendor_media', 'show_home_page_widget', 'show_home_page');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
