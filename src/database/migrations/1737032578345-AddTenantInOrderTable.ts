import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTenantInOrderTable1737032578345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add the tenant_id column to the order table
        await queryRunner.addColumn('order', new TableColumn({
            name: 'tenant_id',
            type: 'int',  // Assuming it's an integer. You can change it if needed.
            isNullable: false,  // Set to true if tenant_id can be nullable, false if required
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the tenant_id column from the order table in case of rollback
        await queryRunner.dropColumn('order', 'tenant_id');
    }

}
