import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateZoneTable1546580612161 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'zone',
            columns: [
                {
                    name: 'zone_id',
                    type: 'int',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'country_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'code',
                    type: 'varchar',
                    length: '32',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'name',
                    type: 'varchar',
                    length: '128',
                    isPrimary: false,
                    isNullable: true,
                },  {
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
        const ifExsist = await queryRunner.hasTable('zone');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('zone', true);
    }
}
