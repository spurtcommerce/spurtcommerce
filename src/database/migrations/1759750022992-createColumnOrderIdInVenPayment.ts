import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateColumnOrderIdInVenPayment1759750022992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('vendor_payment', new TableColumn({
            name: 'order_id',
            type: 'int',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
