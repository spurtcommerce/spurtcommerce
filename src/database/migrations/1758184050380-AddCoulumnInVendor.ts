import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCoulumnInVendor1758184050380 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('vendor', new TableColumn({
            name: 'stripe_customer_id',
            type: 'varchar',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
