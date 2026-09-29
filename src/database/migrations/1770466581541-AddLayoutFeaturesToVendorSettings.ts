import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLayoutFeaturesToVendorSettings1770466581541 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns('vendor_settings', [
            new TableColumn({
                name: 'enable_advanced_sku_search',
                type: 'int',
                width: 1,
                default: 0,
                isNullable: false,
            }),
            new TableColumn({
                name: 'allow_bulk_csv_ordering',
                type: 'int',
                width: 1,
                default: 0,
                isNullable: false,
            }),
            new TableColumn({
                name: 'show_request_for_quote',
                type: 'int',
                width: 1,
                default: 0,
                isNullable: false,
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
