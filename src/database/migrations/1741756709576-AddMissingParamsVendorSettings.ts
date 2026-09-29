import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddMissingParamsVendorSettings1741756709576 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnBusinessNameExist = await queryRunner.hasColumn('vendor_settings', 'business_name');

        if (!columnBusinessNameExist) {
            await queryRunner.addColumn('vendor_settings', new TableColumn(
                {
                    name: 'business_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                }
            ));
        }

        const columnStoreOwnerExist = await queryRunner.hasColumn('vendor_settings', 'store_owner');

        if (!columnStoreOwnerExist) {
            await queryRunner.addColumn('vendor_settings', new TableColumn(
                {
                    name: 'store_owner',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                }
            ));
        }

        const columnDefaultCountryExist = await queryRunner.hasColumn('vendor_settings', 'default_country');

        if (!columnDefaultCountryExist) {
            await queryRunner.addColumn('vendor_settings', new TableColumn(
                {
                    name: 'default_country',
                    type: 'varchar',
                    length: '25',
                    isPrimary: false,
                    isNullable: true,
                }
            ));
        }

        const columnStoreLanguageNameExist = await queryRunner.hasColumn('vendor_settings', 'store_language_name');

        if (!columnStoreLanguageNameExist) {
            await queryRunner.addColumn('vendor_settings', new TableColumn(
                {
                    name: 'store_language_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                }
            ));
        }

        const columnStoreSecondaryLanguageNameExist = await queryRunner.hasColumn('vendor_settings', 'store_secondary_language_name');

        if (!columnStoreSecondaryLanguageNameExist) {
            await queryRunner.addColumn('vendor_settings', new TableColumn(
                {
                    name: 'store_secondary_language_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                }
            ));
        }

        const columnLinkedInExist = await queryRunner.hasColumn('vendor', 'linkedin');

        if (!columnLinkedInExist) {
            await queryRunner.addColumn('vendor', new TableColumn(
                {
                    name: 'linkedin',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                }
            ));
        }

        const columnOrderStatusExist = await queryRunner.hasColumn('vendor_settings', 'is_active');

        if (!columnOrderStatusExist) {
            await queryRunner.addColumn('vendor_settings', new TableColumn(
                {
                    name: 'is_active',
                    type: 'tinyint',
                    length: '1',
                    default: 1,
                    isNullable: true,
                }
            ));
        }

        const columnItemsPerPageExist = await queryRunner.hasColumn('vendor_settings', 'items_per_page');

        if (!columnItemsPerPageExist) {
            await queryRunner.addColumn('vendor_settings', new TableColumn(
                {
                    name: 'items_per_page',
                    type: 'int',
                    length: '11',
                    isNullable: true,
                }
            ));
        }

        const columnCurrencySymbolExist = await queryRunner.hasColumn('vendor_settings', 'currency_symbol');

        if (!columnCurrencySymbolExist) {
            await queryRunner.addColumn('vendor_settings', new TableColumn(
                {
                    name: 'currency_symbol',
                    type: 'varchar',
                    length: '11',
                    isNullable: true,
                }
            ));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
