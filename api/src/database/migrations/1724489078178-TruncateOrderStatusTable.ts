import { MigrationInterface, QueryRunner } from 'typeorm';

export class TruncateOrderStatusTable1724489078178 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE from order_product WHERE order_status_id > 1');
        await queryRunner.query('DELETE from order_status WHERE order_status_id > 1');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
