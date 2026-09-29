import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLogoColumnsSettings1726893346606 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnCheck = await queryRunner.hasColumn('settings', 'admin_logo');
        if (!columnCheck) {
            await queryRunner.addColumn('settings', new TableColumn(
                {
                    name: 'admin_logo',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
            await queryRunner.addColumn('settings', new TableColumn(
                {
                    name: 'admin_logo_path',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
        }
        const columnCheck2 = await queryRunner.hasColumn('settings', 'seller_logo');
        if (!columnCheck2) {
            await queryRunner.addColumn('settings', new TableColumn(
                {
                    name: 'seller_logo',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
            await queryRunner.addColumn('settings', new TableColumn(
                {
                    name: 'seller_logo_path',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
        }
        const columnCheck3 = await queryRunner.hasColumn('settings', 'seller_logo2');
        if (!columnCheck3) {
            await queryRunner.addColumn('settings', new TableColumn(
                {
                    name: 'seller_logo2',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
            await queryRunner.addColumn('settings', new TableColumn(
                {
                    name: 'seller_logo2_path',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: false,
                    default: false,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
