import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInVendorTable1602321897451 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('vendor', 'company_cover_image');
        if (!ifExist) {
        await queryRunner.addColumn('vendor', new TableColumn({
                name: 'company_cover_image',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
        const ifExistt = await queryRunner.hasColumn('vendor', 'company_cover_image_path');
        if (!ifExistt) {
        await queryRunner.addColumn('vendor', new TableColumn({
                name: 'company_cover_image_path',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor', 'company_cover_image');
        await queryRunner.dropColumn('vendor', 'company_cover_image_path');
    }

}
