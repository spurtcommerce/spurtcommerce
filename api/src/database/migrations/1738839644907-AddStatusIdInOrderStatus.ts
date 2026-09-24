import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddStatusIdInOrderStatus1738839644907 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('order_status', new TableColumn({
            name: 'status_id',
            type: 'int',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
