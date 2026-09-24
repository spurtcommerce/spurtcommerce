import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumnCustomerUsers1753700307830 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('customer_users', new TableColumn({
            name: 'oauth_data',
            type: 'varchar',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
