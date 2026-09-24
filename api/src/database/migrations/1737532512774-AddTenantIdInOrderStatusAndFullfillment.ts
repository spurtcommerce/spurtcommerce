import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddTenantIdInOrderStatusAndFullfillment1737532512774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add tenantId column to OrderStatus table
        await queryRunner.addColumn('order_status', new TableColumn({
            name: 'tenant_id',
            type: 'int',  // You can adjust this type based on your requirements (e.g., 'varchar', 'int', etc.)
            isNullable: true,  // Set to true if the column can be null, otherwise false
            default: undefined,
        }));

        // Add tenantId column to Fullfillment table
        await queryRunner.addColumn('order_fulfillment_status', new TableColumn({
            name: 'tenant_id',
            type: 'int',  // You can adjust this type based on your requirements
            isNullable: true,  // Set to true if the column can be null, otherwise false
            default: undefined,
        }));

        // Add foreign key constraint to the tenant_id in OrderStatus table
        await queryRunner.createForeignKey('order_status', new TableForeignKey({
            name: 'fk_order_status_vendor_tenant_id',
            columnNames: ['tenant_id'],
            referencedTableName: 'vendor', // The name of the vendor table
            referencedColumnNames: ['vendor_id'], // Assuming 'id' is the primary key of the vendor table
            onDelete: 'CASCADE', // Action when the referenced vendor is deleted
            onUpdate: 'CASCADE', // Action when the referenced vendor is updated
        }));

        // Add foreign key constraint to the tenant_id in Fullfillment table
        await queryRunner.createForeignKey('order_fulfillment_status', new TableForeignKey({
            name: 'fk_order_fulfillment_status_vendor_tenant_id',
            columnNames: ['tenant_id'],
            referencedTableName: 'vendor', // The name of the vendor table
            referencedColumnNames: ['vendor_id'], // Assuming 'id' is the primary key of the vendor table
            onDelete: 'CASCADE', // Action when the referenced vendor is deleted
            onUpdate: 'CASCADE', // Action when the referenced vendor is updated
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints from OrderStatus table
        const orderStatusTable = await queryRunner.getTable('order_status');
        const orderStatusForeignKey = orderStatusTable.foreignKeys.find(fk => fk.columnNames.indexOf('tenant_id') !== -1);
        if (orderStatusForeignKey) {
            await queryRunner.dropForeignKey('order_status', orderStatusForeignKey);
        }

        // Drop foreign key constraints from Fullfillment table
        const fullfillmentTable = await queryRunner.getTable('order_fulfillment_status');
        const fullfillmentForeignKey = fullfillmentTable.foreignKeys.find(fk => fk.columnNames.indexOf('tenant_id') !== -1);
        if (fullfillmentForeignKey) {
            await queryRunner.dropForeignKey('order_fulfillment_status', fullfillmentForeignKey);
        }

        // Drop tenantId column from OrderStatus table
        await queryRunner.dropColumn('order_status', 'tenant_id');

        // Drop tenantId column from Fullfillment table
        await queryRunner.dropColumn('order_fulfillment_status', 'tenant_id');
    }
}
