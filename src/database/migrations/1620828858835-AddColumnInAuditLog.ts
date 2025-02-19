import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInAuditLog1620828858835 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist3 = await queryRunner.hasColumn('audit_log', 'module');
        if (!ifExist3) {
        await queryRunner.addColumn('audit_log', new TableColumn({
                name: 'module',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('audit_log', 'module');

    }
}
