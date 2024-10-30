import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateZoneToGeoZoneTable1546523068121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'zone_to_geo_zone',
            columns: [
                {
                    name: 'zone_to_geo_zone_id',
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
                    isNullable: true,
                }, {
                    name: 'zone_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'geo_zone_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                } , {
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
        const ifExsist = await queryRunner.hasTable('zone_to_geo_zone');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('zone_to_geo_zone', true);
    }

}
