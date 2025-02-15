import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInVendorOrderLog1581678039045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('vendor_orders_log', 'total');
        if (!ifExist) {
            await queryRunner.addColumn('vendor_orders_log', new TableColumn({
                name: 'total',
                type: 'decimal',
                length: '10,2',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('vendor_orders_log', 'total');
    }

}
