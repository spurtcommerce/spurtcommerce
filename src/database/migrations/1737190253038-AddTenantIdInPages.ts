import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddTenantIdInPages1737190253038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add tenantId column to pages table
        await queryRunner.addColumn('pages', new TableColumn({
            name: 'tenant_id',
            type: 'int',
            isNullable: false, // You can make it nullable if needed
        }));

        // Add foreign key constraint referencing vendor table
        await queryRunner.createForeignKey('pages', new TableForeignKey({
            name: 'fk_pages_vendor_tenant_id',
            columnNames: ['tenant_id'],
            referencedTableName: 'vendor', // Assuming vendor is the table with the vendor data
            referencedColumnNames: ['vendor_id'], // The primary key of the vendor table
            onDelete: 'CASCADE', // This will delete pages if the corresponding vendor is deleted
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the foreign key constraint
        const table = await queryRunner.getTable('pages');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('tenant_id') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('pages', foreignKey);
        }

        // Drop the tenantId column
        await queryRunner.dropColumn('pages', 'tenantId');
    }

}
