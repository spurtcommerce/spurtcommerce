import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInProduct1597918254147 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExist = await queryRunner.hasColumn('product', 'pincode_based_delivery');
        if (!ifExist) {
        await queryRunner.addColumn('product', new TableColumn({
                name: 'pincode_based_delivery',
                type: 'integer',
                length: '11',
                isPrimary: false,
                isNullable: true,
                default: 0,
                }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('product', 'pincode_base_delivery');
    }

}
