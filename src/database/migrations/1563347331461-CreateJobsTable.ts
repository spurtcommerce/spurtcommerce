import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateJobsTable1563347331461 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'jobs',
            columns: [
                {
                    name: 'job_id',
                    type: 'int',
                    length: '11',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true,
                    isNullable: false,
                },  {
                    name: 'job_title',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'job_description',
                    type: 'TEXT',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'salary_type',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'job_location',
                    type: 'TEXT',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'contact_person_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'contact_person_email',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'contact_person_mobile',
                    type: 'bigint',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'is_active',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default:  'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('jobs');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('jobs', true);
    }
}
