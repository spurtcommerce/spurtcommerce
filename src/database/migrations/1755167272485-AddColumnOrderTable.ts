import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnOrderTable1755167272485 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('order', new TableColumn({
            name: 'fullfillment_status_id',
            type: 'int',
            isNullable: true,
        }));

        await queryRunner.addColumn('order_log', new TableColumn({
            name: 'fullfillment_status_id',
            type: 'int',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
