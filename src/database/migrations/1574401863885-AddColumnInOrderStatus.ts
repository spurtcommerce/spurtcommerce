import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderStatus1574401863885 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order_status', 'priority');
        if (!ifExist) {
            await queryRunner.addColumn('order_status', new TableColumn({
                name: 'priority',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
               }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order_status', 'priority');
    }

}
