import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVarientTable1601550779014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'variant',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    length: '11',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'type',
                    type: 'varchar',
                    length: '32',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'sort_order',
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
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('variant');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('varients', true);
    }

}
