import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateSettingsTable1546580970382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'settings',
            columns: [
                {
                    name: 'settings_id',
                    type: 'int',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'url',
                    type: 'varchar',
                    length: '250',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'meta_tag_title',
                    type: 'varchar',
                    length: '250',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'meta_tag_description',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'meta_tag_keywords',
                    type: 'varchar',
                    length: '250',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'store_name',
                    type: 'varchar',
                    length: '250',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'store_owner',
                    type: 'varchar',
                    length: '250',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'store_address',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'country_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'zone_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'store_email',
                    type: 'varchar',
                    length: '250',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'store_telephone',
                    type: 'varchar',
                    length: '50',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'store_fax',
                    type: 'varchar',
                    length: '30',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'store_logo',
                    type: 'varchar',
                    length: '250',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'store_logo_path',
                    type: 'varchar',
                    length: '250',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'maintenance_mode',
                    type: 'int',
                    length: '3',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'store_language_name',
                    type: 'varchar',
                    length: '250',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'order_status',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                    default: 1,
                }, {
                    name: 'store_currency_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'store_image',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'store_image_path',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'facebook',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'twitter',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'instagram',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'google',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'invoice_prefix',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'items_per_page',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'category_product_count',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'is_active',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                } , {
                    name: 'created_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                } , {
                    name: 'modified_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                } , {
                    name: 'created_by',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                } , {
                    name: 'modified_by',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                } ,
            ],
        });
        const ifExsist = await queryRunner.hasTable('settings');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('settings', true);
    }
}
