import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnPaymentMethodIdInOrderTable1750068444824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('order', new TableColumn({
            name: 'payment_rule_id',
            type: 'int',
            isNullable: true,
        }));

        await queryRunner.addColumn('order_log', new TableColumn({
            name: 'payment_rule_id',
            type: 'int',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
