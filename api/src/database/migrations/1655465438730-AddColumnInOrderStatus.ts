import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderStatus1655465438730 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('order_status', 'default_status');
        if (!ifExist) {
            await queryRunner.addColumn('order_status', new TableColumn({
                name: 'default_status',
                type: 'INTEGER  ',
                isPrimary: false,
                isNullable: false,
                default: '0',
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
