import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateCountryTable1546580085881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'country',
            columns: [
                {
                    name: 'country_id',
                    type: 'int',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '128',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'iso_code_2',
                    type: 'varchar',
                    length: '2',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'iso_code_3',
                    type: 'varchar',
                    length: '3',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'address_format',
                    type: 'text',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'postcode_required',
                    type: 'tinyint',
                    length: '1',
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
        const ifExsist = await queryRunner.hasTable('country');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('country', true);
    }
}
