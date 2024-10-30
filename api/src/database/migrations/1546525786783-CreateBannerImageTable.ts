import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateBannerImageTable1546525786783 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'banner_image',
            columns: [
                {
                    name: 'banner_image_id',
                    type: 'int',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'banner_id',
                    type: 'varchar',
                    length: '32',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'link',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                },  {
                    name: 'image',
                    type: 'varchar',
                    length: '45',
                    isPrimary: false,
                    isNullable: false,
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
        const ifExsist = await queryRunner.hasTable('banner_image');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('banner_image');
    }

}
