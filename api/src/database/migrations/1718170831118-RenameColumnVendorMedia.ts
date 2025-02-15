import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumnVendorMedia1718170831118 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.hasColumn('vendor_media', 'fileName');
        if (exist) {
            await queryRunner.renameColumn('vendor_media', 'fileName', 'file_name');
        }

        const exist2 = await queryRunner.hasColumn('vendor_media', 'filePath');
        if (exist2) {
            await queryRunner.renameColumn('vendor_media', 'filePath', 'file_Path');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
