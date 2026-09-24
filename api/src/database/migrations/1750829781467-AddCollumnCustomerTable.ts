import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumnCustomerTable1750829781467 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('customer', new TableColumn({
            name: 'company_name',
            type: 'varchar',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
