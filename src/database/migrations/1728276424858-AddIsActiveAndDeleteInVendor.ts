import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIsActiveAndDeleteInVendor1728276424858 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if 'is_active' column does not exist, then add it
        const isActiveColumn = await queryRunner.hasColumn('vendor', 'is_active');
        if (!isActiveColumn) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'is_active',
                type: 'tinyint',
                default: 1,
            }));
        }

        // Check if 'is_delete' column does not exist, then add it
        const isDeleteColumn = await queryRunner.hasColumn('vendor', 'is_delete');
        if (!isDeleteColumn) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'is_delete',
                type: 'tinyint',
                default: 0,
            }));
        }

        // Update all existing records to have 'is_active' = 1 and 'is_delete' = 0
        await queryRunner.query(`
            UPDATE vendor SET is_active = 1, is_delete = 0
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the 'is_active' column if it exists
        const isActiveColumn = await queryRunner.hasColumn('vendor', 'is_active');
        if (isActiveColumn) {
            await queryRunner.dropColumn('vendor', 'is_active');
        }

        // Drop the 'is_delete' column if it exists
        const isDeleteColumn = await queryRunner.hasColumn('vendor', 'is_delete');
        if (isDeleteColumn) {
            await queryRunner.dropColumn('vendor', 'is_delete');
        }
    }
}
