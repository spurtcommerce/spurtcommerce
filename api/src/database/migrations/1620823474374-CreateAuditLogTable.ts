import {MigrationInterface, QueryRunner, TableForeignKey, Table} from 'typeorm';

export class CreateAuditLogTable1620823474374 implements MigrationInterface {

    private tableForeignKey1 = new TableForeignKey({
        name: 'fk_audit_log_user',
        columnNames: ['user_id'],
        referencedColumnNames: ['user_id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
    });
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'audit_log',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    length: '11',
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'user_id',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'user_name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'request_url',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'method',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'object',
                    type: 'TEXT',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'log_type',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'description',
                    type: 'TEXT',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'params',
                    type: 'TEXT',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'browser_info',
                    type: 'TEXT',
                    isPrimary: false,
                    isNullable: true,
                },  {
                    name: 'created_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'created_by',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_by',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                },
            ],
        });
        const ifExsist = await queryRunner.hasTable('audit_log');
        if (!ifExsist) {
            await queryRunner.createTable(table);
        }
        const tables = await queryRunner.getTable('audit_log');
        const ifDataExsist1 = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
        if (!ifDataExsist1) {
            await queryRunner.createForeignKey(tables, this.tableForeignKey1);
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('audit_log', true);
    }

}
