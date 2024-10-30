import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateUserGroupTable1546516990326 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'user_group',
            columns: [
                {
                    name: 'group_id',
                    type: 'int',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '64',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'slug',
                    type: 'varchar',
                    length: '64',
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
        const ifExsist = await queryRunner.hasTable('user_group');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user_group', true);
    }

}
