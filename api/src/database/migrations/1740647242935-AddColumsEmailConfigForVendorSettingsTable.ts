import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumsEmailConfigForVendorSettingsTable1740647242935 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const mailColumns = [
            { name: 'mail_driver', type: 'varchar', isNullable: true },
            { name: 'mail_host', type: 'varchar', isNullable: true },
            { name: 'mail_username', type: 'varchar', isNullable: true },
            { name: 'mail_password', type: 'varchar', isNullable: true },
            { name: 'mail_port', type: 'int', isNullable: true },
            { name: 'mail_secure', type: 'boolean', isNullable: true },
            { name: 'mail_encryption', type: 'varchar', isNullable: true },
            { name: 'mail_from', type: 'varchar', isNullable: true },
        ];

        await queryRunner.addColumns('vendor_settings', mailColumns.map(column => new TableColumn(column)));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
