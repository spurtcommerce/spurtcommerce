import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SiteFilterTable1680158996121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'site_filter',
            columns: [{
                name: 'id',
                type: 'int',
                length: '11',
                isPrimary: true,
                isNullable: false,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'filter_name',
                type: 'varchar',
                length: '225',
                isPrimary: false,
                isNullable: false,
            },
            {
                name: 'is_active',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
            },
            {
                name: 'created_date',
                type: 'datetime',
                isPrimary: false,
                isNullable: true,
                default: 'CURRENT_TIMESTAMP',
            },
            {
                name: 'modified_date',
                type: 'datetime',
                isPrimary: false,
                isNullable: true,
                default: 'CURRENT_TIMESTAMP',
            },
            {
                name: 'created_by',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
            },
            {
                name: 'modified_by',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
            },
            ],
        });
        const ifExsist = await queryRunner.hasTable('site_filter');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       // --
    }

}
