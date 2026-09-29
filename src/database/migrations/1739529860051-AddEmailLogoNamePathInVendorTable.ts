import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddEmailLogoNamePathInVendorTable1739529860051 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('vendor', new TableColumn(
            {
                name: 'email_logo_name',
                type: 'varchar',
                length: '32',
                isPrimary: false,
                isNullable: true,
            }
        ));

        await queryRunner.addColumn('vendor', new TableColumn(
            {
                name: 'email_logo_path',
                type: 'varchar',
                length: '32',
                isPrimary: false,
                isNullable: true,
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
