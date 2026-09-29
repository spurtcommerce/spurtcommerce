import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAppIdInVendorTable1736762882503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('vendor', new TableColumn({
            name: 'app_id',
            type: 'varchar',
            length: '255',
            isNullable: true,  // Set this to false if app_id is required
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor', 'app_id');
    }
}
