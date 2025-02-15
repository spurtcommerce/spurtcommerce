import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddForeignKeyToPermissionModule1733402679634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('permission_module');

        // Check if the foreign key already exists
        const existingForeignKey = table.foreignKeys.find(
            fk => fk.columnNames.indexOf('module_group_id') !== -1
        );

        // If the foreign key doesn't exist, create it
        if (!existingForeignKey) {

            await queryRunner.query(`
                DELETE FROM permission_module
                WHERE module_group_id NOT IN (
                  SELECT module_group_id
                  FROM permission_module_group
                );
              `);

            await queryRunner.createForeignKey(
                'permission_module', // Name of the child table
                new TableForeignKey({
                    columnNames: ['module_group_id'], // Column in the child table
                    referencedTableName: 'permission_module_group', // Parent table name
                    referencedColumnNames: ['module_group_id'], // Column in the parent table
                    onDelete: 'CASCADE', // Optional: Define the action on delete (e.g., CASCADE)
                    onUpdate: 'CASCADE', // Optional: Define the action on update (e.g., CASCADE)
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
