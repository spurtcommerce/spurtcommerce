import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateCurrencyTable1546524333028 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'currency',
            columns: [
                {
                    name: 'currency_id',
                    type: 'int',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'title',
                    type: 'varchar',
                    length: '32',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'code',
                    type: 'varchar',
                    length: '32',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'symbol_left',
                    type: 'varchar',
                    length: '32',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'symbol_right',
                    type: 'varchar',
                    length: '32',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'decimal_place',
                    type: 'decimal(5,0)',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'value',
                    type: 'float(15,8)',
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
        const ifExsist = await queryRunner.hasTable('currency');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('currency', true);
    }

}
