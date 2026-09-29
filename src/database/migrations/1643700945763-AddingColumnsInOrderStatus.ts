import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddingColumnsInOrderStatus1643700945763 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExistParentId = await queryRunner.hasColumn('order_status', 'parent_id');
        if (!ifExistParentId) {
            await queryRunner.addColumn('order_status', new TableColumn({
                name: 'parent_id',
                type: 'integer',
                length: '11',
                default: 0,
                isPrimary: false,
                isNullable: false,
            }));
        }
        const ifExistIsAdmin = await queryRunner.hasColumn('order_status', 'is_admin');
        if (!ifExistIsAdmin) {
            await queryRunner.addColumn('order_status', new TableColumn({
                name: 'is_admin',
                type: 'integer',
                length: '11',
                default: 1,
                isPrimary: false,
                isNullable: false,
            }));
        }
        const ifExistIsVendor = await queryRunner.hasColumn('order_status', 'is_vendor');
        if (!ifExistIsVendor) {
            await queryRunner.addColumn('order_status', new TableColumn({
                name: 'is_vendor',
                type: 'integer',
                length: '11',
                default: 1,
                isPrimary: false,
                isNullable: false,
            }));
        }
        const ifExistIsBuyer = await queryRunner.hasColumn('order_status', 'is_buyer');
        if (!ifExistIsBuyer) {
            await queryRunner.addColumn('order_status', new TableColumn({
                name: 'is_buyer',
                type: 'integer',
                length: '11',
                default: 1,
                isPrimary: false,
                isNullable: false,
            }));
        }
        const ifExistIsApi = await queryRunner.hasColumn('order_status', 'is_api');
        if (!ifExistIsApi) {
            await queryRunner.addColumn('order_status', new TableColumn({
                name: 'is_api',
                type: 'integer',
                length: '11',
                default: 1,
                isPrimary: false,
                isNullable: false,
            }));
        }
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('order_status', 'parent_id');
        await queryRunner.dropColumn('order_status', 'is_admin');
        await queryRunner.dropColumn('order_status', 'is_vendor');
        await queryRunner.dropColumn('order_status', 'is_buyer');
        await queryRunner.dropColumn('order_status', 'is_api');
    }
}
