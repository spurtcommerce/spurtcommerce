import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnCustomerGroupTable1750149567285 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('customer_group', new TableColumn({
            name: 'payment_term_id',
            type: 'int',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
