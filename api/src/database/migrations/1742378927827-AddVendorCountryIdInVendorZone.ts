import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddVendorCountryIdInVendorZone1742378927827 implements MigrationInterface {

    private tableForeignKeysTenantId = new TableForeignKey({
        name: 'fk_ven_zone_ven_country_id_vendor_country_id',
        columnNames: ['vendor_country_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vendor_country',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const vendorCountryIdExist = await queryRunner.hasColumn('vendor_zone', 'vendor_country_id');

        if (!vendorCountryIdExist) {
            await queryRunner.addColumn('vendor_zone', new TableColumn(
                {
                    name: 'vendor_country_id',
                    type: 'int',
                    length: '11',
                    isNullable: true,
                }
            ));
        }
        const table = await queryRunner.getTable('vendor_zone');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_country_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKeysTenantId);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
