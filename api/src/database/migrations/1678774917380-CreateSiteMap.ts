import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateSiteMap1678774917380 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'site_map',
            columns: [
                {
                    name: 'id',
                    type: 'INT',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'user_id',
                    type: 'INT',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'user_name',
                    type: 'VARCHAR',
                    length: '225',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'path_name',
                    type: 'VARCHAR',
                    length: '225',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'file_name',
                    type: 'VARCHAR',
                    length: '225',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'created_by',
                    type: 'INT',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'modified_by',
                    type: 'INT',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifSiteMap = await queryRunner.hasTable('site_map');
        if (!ifSiteMap) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('site_map', true);
    }

}
