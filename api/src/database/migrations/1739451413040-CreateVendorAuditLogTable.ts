import { MigrationInterface, QueryRunner, TableForeignKey, Table } from 'typeorm';

export class CreateVendorAuditLogTable1739451413040 implements MigrationInterface {

    private VendorAuditLogToVendorUsersForeignKey = new TableForeignKey({
        name: 'fk_vendor_audit_log_vendor_user_foreignKey',
        columnNames: ['vendor_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vendor_users',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'vendor_audit_log',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'vendor_user_id',
                    type: 'integer',
                    isNullable: false,
                },
                {
                    name: 'user_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'method',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'request_url',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'object',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'log_type',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'params',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'browser_info',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'module',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'tenant_id',
                    type: 'int',
                    length: '11',
                    isNullable: false,
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
            ],
        });

        const ifExists = await queryRunner.hasTable('vendor_audit_log');
        if (!ifExists) {
            await queryRunner.createTable(table);
        }

        await queryRunner.createForeignKey('vendor_audit_log', this.VendorAuditLogToVendorUsersForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
