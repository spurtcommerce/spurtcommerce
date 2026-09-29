import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnCountryInVendorSettings1743240294043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('vendor_settings', new TableColumn({
            name: 'country',
            type: 'text',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
