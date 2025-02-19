import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderTable1584004496240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order', 'coupon_code');
        if (!ifExist) {
        await queryRunner.addColumn('order', new TableColumn({
                name: 'coupon_code',
                type: 'varchar',
                length: '45',
                isPrimary: false,
                isNullable: true,
               }));
        }

        const ifExist1 = await queryRunner.hasColumn('order', 'discount_amount');
        if (!ifExist1) {
        await queryRunner.addColumn('order', new TableColumn({
                name: 'discount_amount',
                type: 'decimal',
                length: '10,2',
                isPrimary: false,
                isNullable: true,
               }));
        }

        const ifExist2 = await queryRunner.hasColumn('order', 'amount');
        if (!ifExist2) {
        await queryRunner.addColumn('order', new TableColumn({
                name: 'amount',
                type: 'decimal',
                length: '10,2',
                isPrimary: false,
                isNullable: true,
               }));
        }
    }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order', 'coupon_code');
        await queryRunner.dropColumn('order', 'discount_amount');
        await queryRunner.dropColumn('order', 'amount');
    }

}
