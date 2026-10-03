import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDescriptionForPermissionModule1769858645838 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'customer_permission_module_group',
            new TableColumn({
                name: 'description',
                type: 'varchar',
                length: '255',
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
