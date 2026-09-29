import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnCustomerTable1750143887796 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('customer', new TableColumn({
            name: 'payment_term_id',
            type: 'int',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
