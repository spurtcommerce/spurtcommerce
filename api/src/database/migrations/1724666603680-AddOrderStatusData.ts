import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AddOrderStatusData1724666603680 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExist = await queryRunner.hasTable('order_status');
        if (tableExist) {
            const data = [
                {
                    orderStatusId: 2,
                    name: 'Order Shipped',
                    colorCode: '#4c7499',
                    isActive: 1,
                    priority: 2,
                    isAdmin: 1,
                    isVendor: 1,
                    isBuyer: 0,
                    isApi: 0,
                    parentId: 0,
                    defaultStatus: 1,
                },
                {
                    orderStatusId: 3,
                    name: 'Order Delivered',
                    colorCode: '#e31919',
                    isActive: 1,
                    priority: 2,
                    isAdmin: 1,
                    isVendor: 1,
                    isBuyer: 0,
                    isApi: 0,
                    parentId: 0,
                    defaultStatus: 1,
                },
                {
                    orderStatusId: 4,
                    name: 'Order cancelled',
                    colorCode: '#25a006',
                    isActive: 1,
                    priority: 2,
                    isAdmin: 1,
                    isVendor: 1,
                    isBuyer: 0,
                    isApi: 0,
                    parentId: 0,
                    defaultStatus: 1,
                },
            ];
            await getRepository('order_status').save(data);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
