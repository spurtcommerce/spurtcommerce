import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderTable1589623032875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order', 'back_orders');
        if (!ifExist) {
        await queryRunner.addColumn('order', new TableColumn({
                name: 'back_orders',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order', 'back_orders');
    }

}
