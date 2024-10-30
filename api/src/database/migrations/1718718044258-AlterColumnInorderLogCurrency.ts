import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnInorderLogCurrency1718718044258 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExistOrder = await queryRunner.hasColumn('order_log', 'currency_id');
        if (columnExistOrder) {
            await queryRunner.query('Alter table `order_log` modify currency_id int null');
        }
        const columnExistOrder2 = await queryRunner.hasColumn('order_log', 'shipping_zone_id');
        if (columnExistOrder2) {
            await queryRunner.query('Alter table `order_log` modify shipping_zone_id int null');
        }
        const columnExistOrder3 = await queryRunner.hasColumn('order_log', 'payment_zone_id');
        if (columnExistOrder3) {
            await queryRunner.query('Alter table `order_log` modify payment_zone_id int null');
        }
        const columnExistOrder4 = await queryRunner.hasColumn('order_log', 'payment_country_id');
        if (columnExistOrder4) {
            await queryRunner.query('Alter table `order_log` modify payment_country_id int null');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
