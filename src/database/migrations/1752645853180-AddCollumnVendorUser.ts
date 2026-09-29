import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumnVendorUser1752645853180 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('vendor_users', new TableColumn({
            name: 'personalized_settings',
            type: 'json',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
