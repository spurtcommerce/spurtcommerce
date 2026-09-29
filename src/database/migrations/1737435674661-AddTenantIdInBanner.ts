import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTenantIdInBanner1737435674661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add tenantId column to the Banner table
        await queryRunner.addColumn('banner', new TableColumn({
            name: 'tenant_id',
            type: 'int',  // Adjust the type based on your requirements (e.g., string, uuid, etc.)
            isNullable: false, // Set to true if you want to allow null values
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove tenantId column from the Banner table
        await queryRunner.dropColumn('banner', 'tenant_id');
    }

}
