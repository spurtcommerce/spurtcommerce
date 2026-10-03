import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddColumnTenantIdInCustomer1737189335105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add the tenant_id column to the customer table
        await queryRunner.addColumn('customer', new TableColumn({
            name: 'tenant_id',
            type: 'int', // Adjust the type based on your vendor table primary key column type
            isNullable: true, // Set this to false if tenant_id must always have a value
        }));

        // Add the foreign key constraint
        await queryRunner.createForeignKey('customer', new TableForeignKey({
            name: 'fk_customer_vendor_tenant_id',
            columnNames: ['tenant_id'], // The column in the customer table
            referencedTableName: 'vendor', // The referenced table (vendor)
            referencedColumnNames: ['vendor_id'], // The primary key or unique column in the vendor table
            onDelete: 'CASCADE', // Action when the referenced vendor is deleted. Change as needed
            onUpdate: 'CASCADE', // Action when the referenced vendor id is updated. Change as needed
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the foreign key constraint first
        const table = await queryRunner.getTable('customer');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('tenant_id') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('customer', foreignKey);
        }

        // Drop the tenant_id column
        await queryRunner.dropColumn('customer', 'tenant_id');
    }
}
