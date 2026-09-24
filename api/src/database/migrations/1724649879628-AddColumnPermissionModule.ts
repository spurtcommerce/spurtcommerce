import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnPermissionModule1724649879628 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnCheck = await queryRunner.hasColumn('permission_module', 'is_listed');
        if (!columnCheck) {
            await queryRunner.addColumn('permission_module', new TableColumn({
                name: 'is_listed',
                type: 'Boolean',
                isPrimary: false,
                isNullable: false,
                default: false,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
