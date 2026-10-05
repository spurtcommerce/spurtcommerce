import { getDataSource } from '../../loaders/typeormLoader';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnsureVendorOrderStatusData1792000000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const vendorRepository = getDataSource().getRepository('Vendor');
        const orderStatusRepository = getDataSource().getRepository('OrderStatus');

        const vendors: any[] = await vendorRepository.find({
            select: ['vendorId'],
        });

        const defaultStatuses = [
            {
                name: 'Awaiting Confirmation',
                description: 'Order placed, waiting for buyer or seller confirmation (common in B2B before processing).',
                defaultStatus: 1,
                colorCode: '#9feaff',
            },
            {
                name: 'Confirmed',
                description: 'Seller has approved the order, stock and pricing confirmed, preparing invoice.',
                defaultStatus: 1,
                colorCode: '#acd9ff',
            },
            {
                name: 'Dispatched',
                description: 'Goods shipped with logistics partner, tracking available.',
                defaultStatus: 1,
                colorCode: '#a0ffa0',
            },
            {
                name: 'Delivered',
                description: 'Buyer has received goods, GRN (Goods Receipt Note) issued.',
                defaultStatus: 1,
                colorCode: '#f8c0c0',
            },
            {
                name: 'Closed',
                description: 'Payment cleared, order cycle officially closed.',
                defaultStatus: 1,
                colorCode: '#d3d3d3',
            },
        ];

        for (const vendor of vendors) {
            for (let index = 0; index < defaultStatuses.length; index++) {
                const status = defaultStatuses[index];
                const statusId = index + 1;

                const existing = await orderStatusRepository.findOne({
                    where: {
                        tenantId: vendor.vendorId,
                        statusId,
                    },
                });

                if (!existing) {
                    await orderStatusRepository.save(
                        orderStatusRepository.create({
                            name: status.name,
                            description: status.description,
                            defaultStatus: status.defaultStatus,
                            colorCode: status.colorCode,
                            tenantId: vendor.vendorId,
                            isActive: 1,
                            statusId,
                            priority: 0,
                            parentId: 0,
                            isAdmin: 0,
                            isVendor: 1,
                            isBuyer: 0,
                            isApi: 0,
                        })
                    );
                }
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
