import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderLog1569838152744 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order_log', 'orderId');
        if (!ifExist) {
            await queryRunner.addColumn('order_log', new TableColumn({
                name: 'orderId',
                type: 'int',
                length: '11',
                isPrimary: false,
                isNullable: true,
               }));
        }
        await queryRunner.query('ALTER TABLE `order_log` CHANGE `total` `total` decimal(15,2) DEFAULT NULL' );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order_log', 'orderId');
    }

}
