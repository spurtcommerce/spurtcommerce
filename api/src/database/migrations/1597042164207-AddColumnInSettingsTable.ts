import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInSettingsTable1597042164207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('settings', 'email_logo');
        if (!ifExist) {
        await queryRunner.addColumn('settings', new TableColumn({
                name: 'email_logo',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                }));
        }
        const ifExist1 = await queryRunner.hasColumn('settings', 'email_logo_path');
        if (!ifExist1) {
        await queryRunner.addColumn('settings', new TableColumn({
                name: 'email_logo_path',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('settings', 'email_logo');
        await queryRunner.dropColumn('settings', 'email_logo_path');
    }

}
