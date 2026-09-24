import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddForignKeyCustomerPermissionModueToGroup1749618846753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'customer_permission_module',
            new TableForeignKey({
                columnNames: ['module_group_id'],
                referencedTableName: 'customer_permission_module_group',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                name: 'FK_module_group_to_permission_module',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
