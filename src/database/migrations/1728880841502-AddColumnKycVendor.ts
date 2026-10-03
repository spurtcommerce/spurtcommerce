import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnKycVendor1728880841502 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('vendor');
        const kycStatusColumn = table?.findColumnByName('kyc_status');

        // Step 1: Add the column as nullable if it doesn't exist
        if (!kycStatusColumn) {
            await queryRunner.addColumn('vendor', new TableColumn({
                name: 'kyc_status',
                type: 'enum',
                enum: ['verified', 'rejected', 'submitted', 'in-review', 'pending'],
                default: `'pending'`, // Set the default value if required
                isNullable: true, // Initially make it nullable
            }));
        }

        // Step 2: Update all existing rows to have 'pending' as the value for 'kyc_status'
        await queryRunner.query(`UPDATE vendor SET kyc_status = 'pending' WHERE kyc_status IS NULL`);

        // Step 3: Alter the column to be non-nullable
        await queryRunner.changeColumn('vendor', 'kyc_status', new TableColumn({
            name: 'kyc_status',
            type: 'enum',
            enum: ['verified', 'rejected', 'submitted', 'in-review', 'pending'],
            default: `'pending'`,
            isNullable: false, // Now make it non-nullable
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('vendor');
        const kycStatusColumn = table?.findColumnByName('kyc_status');

        // Drop the 'kyc_status' column if it exists
        if (kycStatusColumn) {
            await queryRunner.dropColumn('vendor', 'kyc_status');
        }
    }
}
