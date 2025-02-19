import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInVendorOrder1604489633939 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('vendor_orders', 'make_settlement');
        if (!ifExist) {
        await queryRunner.addColumn('vendor_orders', new TableColumn({
                name: 'make_settlement',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('vendor_orders', 'make_settlement');
    }

}
