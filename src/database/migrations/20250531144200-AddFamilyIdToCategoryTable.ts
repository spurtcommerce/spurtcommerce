import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFamilyIdToCategoryTable20250531144200 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hasFamilyIdColumn = await queryRunner.hasColumn('category', 'family_id');
        if (!hasFamilyIdColumn) {
            await queryRunner.addColumn(
                'category',
                new TableColumn({
                    name: 'family_id',
                    type: 'INT', // Assuming integer type
                    isNullable: true, // Allow null values
                    default: null,    // Default to null
                }),
            );
            console.log('Column "family_id" added to "category" table.');
        } else {
            console.log('Column "family_id" already exists in "category" table. Skipping addition.');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const hasFamilyIdColumn = await queryRunner.hasColumn('category', 'family_id');
        if (hasFamilyIdColumn) {
            await queryRunner.dropColumn('category', 'family_id');
            console.log('Column "family_id" dropped from "category" table.');
        } else {
            console.log('Column "family_id" does not exist in "category" table. Skipping drop.');
        }
    }
}
