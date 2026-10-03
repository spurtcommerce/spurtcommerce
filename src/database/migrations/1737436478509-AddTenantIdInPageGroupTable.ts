import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTenantIdInPageGroupTable1737436478509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add tenantId column to the PageGroup table
        await queryRunner.addColumn('page_group', new TableColumn({
            name: 'tenant_id',
            type: 'int',  // Adjust the type based on your requirements (e.g., string, uuid, etc.)
            isNullable: false, // Set to true if you want to allow null values
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove tenantId column from the PageGroup table
        await queryRunner.dropColumn('page_group', 'tenant_id');
    }

}
