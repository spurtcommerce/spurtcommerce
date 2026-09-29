import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExportLog1704372342483 implements MigrationInterface {
    private tableName = 'export_log';
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: this.tableName,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'module',
                    type: 'VARCHAR',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'record_available',
                    type: 'int',
                    length: '11',
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
                    name: 'created_by',
                    type: 'INT',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifTable = await queryRunner.hasTable(this.tableName);
        if (!ifTable) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName, true);
    }

}
