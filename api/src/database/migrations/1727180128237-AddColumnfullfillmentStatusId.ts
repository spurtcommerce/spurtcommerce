import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnfullfillmentStatusId1727180128237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('order_product', 'fullfillment_status_id');

        if (!columnExist) {
            await queryRunner.addColumn('order_product', new TableColumn(
                {
                    name: 'fullfillment_status_id',
                    type: 'int',
                    isNullable: true,
                }
            ));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
