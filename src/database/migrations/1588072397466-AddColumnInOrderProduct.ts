import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderProduct1588072397466 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order_product', 'cancel_request');
        if (!ifExist) {
        await queryRunner.addColumn('order_product', new TableColumn({
                name: 'cancel_request',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
                }));
        }
        const ifExist1 = await queryRunner.hasColumn('order_product', 'cancel_request_status');
        if (!ifExist1) {
        await queryRunner.addColumn('order_product', new TableColumn({
                name: 'cancel_request_status',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
                }));
        }
        const ifExist2 = await queryRunner.hasColumn('order_product', 'cancel_reason');
        if (!ifExist2) {
        await queryRunner.addColumn('order_product', new TableColumn({
                name: 'cancel_reason',
                type: 'text',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const ifExist3 = await queryRunner.hasColumn('order_product', 'cancel_reason_description');
        if (!ifExist3) {
        await queryRunner.addColumn('order_product', new TableColumn({
                name: 'cancel_reason_description',
                type: 'text',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order_product', 'cancel_reason');
        await queryRunner.dropColumn('order_product', 'cancel_reason_description');
        await queryRunner.dropColumn('order_product', 'cancel_request');
        await queryRunner.dropColumn('order_product', 'cancel_request_status');
    }

}
