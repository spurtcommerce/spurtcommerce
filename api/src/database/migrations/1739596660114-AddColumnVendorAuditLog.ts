import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnVendorAuditLog1739596660114 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('vendor_audit_log', new TableColumn(
            {
                name: 'created_by',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }
        ));

        await queryRunner.addColumn('vendor_audit_log', new TableColumn(
            {
                name: 'modified_by',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
