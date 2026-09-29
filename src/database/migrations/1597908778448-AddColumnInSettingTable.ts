import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInSettingTable1597908778448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('settings', 'invoice_logo');
        if (!ifExist) {
        await queryRunner.addColumn('settings', new TableColumn({
                name: 'invoice_logo',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const ifExist1 = await queryRunner.hasColumn('settings', 'invoice_logo_path');
        if (!ifExist1) {
        await queryRunner.addColumn('settings', new TableColumn({
                name: 'invoice_logo_path',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('settings', 'invoice_logo');
        await queryRunner.dropColumn('settings', 'invoice_logo_path');
    }

}
