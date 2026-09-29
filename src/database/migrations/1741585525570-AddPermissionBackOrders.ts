import moment from 'moment';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddPermissionBackOrders1741585525570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const permissionModuleExist = await getDataSource().getRepository('VendorPermissionModuleGroup').findOne({ where: { slugName: 'back-orders' } });
        if (!permissionModuleExist) {
            const val: any = await getDataSource().getRepository('VendorPermissionModuleGroup').save([{
                name: 'Back Orders',
                slugName: 'back-orders',
                sortOrder: 81,
            }]);
            if (val) {
                const PermissionSeed = [
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Back Orders List',
                        slugName: 'back-orders-list',
                        sortOrder: '310',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'View Back Orders',
                        slugName: 'view-back-orders',
                        sortOrder: '311',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Export Back Orders',
                        slugName: 'export-back-orders',
                        sortOrder: '312',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Fullfill now',
                        slugName: 'fullfill-now',
                        sortOrder: '313',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                await getDataSource().getRepository('VendorPermissionModule').save(PermissionSeed);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
