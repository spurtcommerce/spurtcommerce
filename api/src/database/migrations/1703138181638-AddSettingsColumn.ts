import { MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddSettingsColumn1703138181638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const todatColumn = [
            {
                name: 'site_name',
                type: 'VARCHAR',
                length: '225',
            }, {
                name: 'business_name',
                type: 'VARCHAR',
                length: '225',
            }, {
                name: 'access_key',
                type: 'TEXT',
            }, {
                name: 'site_category',
                type: 'TEXT',
            }, {
                name: 'store_description',
                type: 'TEXT',
            }, {
                name: 'store_address1',
                type: 'VARCHAR',
                length: '225',
            }, {
                name: 'store_address2',
                type: 'VARCHAR',
                length: '225',
            }, {
                name: 'store_city',
                type: 'VARCHAR',
                length: '150',
            }, {
                name: 'store_postal_code',
                type: 'VARCHAR',
                length: '50',
            }, {
                name: 'store_secondary_language_name',
                type: 'VARCHAR',
                length: '50',
            }, {
                name: 'currency_symbol',
                type: 'VARCHAR',
                length: '25',
            }, {
                name: 'currency_format',
                type: 'VARCHAR',
                length: '25',
            }, {
                name: 'date_format',
                type: 'VARCHAR',
                length: '25',
            }, {
                name: 'time_format',
                type: 'VARCHAR',
                length: '25',
            }, {
                name: 'default_country',
                type: 'VARCHAR',
                length: '25',
            }, {
                name: 'country',
                type: 'TEXT',
            }, {
                name: 'pending_status',
                type: 'INT',
                length: '11',
            }, {
                name: 'default_website',
                type: 'INT',
                length: '11',
            },
        ];
        for (const data of todatColumn) {
            const findColumn = await queryRunner.hasColumn('settings', data.name);
        if (!findColumn) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: data.name,
                type: data.type,
                length: data.length ?? data.length,
                isPrimary: false,
                isNullable: true,
            }));
        }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
