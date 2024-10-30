import moment from 'moment';
import { PermissionModule } from '../../common/entities-index';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class AddSlugNamePermissionModuleTable1729490178800 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const ifExistBackOrderList = await getRepository(PermissionModule).findOne({
            where: { slugName: 'back-order-list' },
        });
        if (!ifExistBackOrderList) {
            await getRepository(PermissionModule).save({
                name: 'Back Order List',
                slugName: 'back-order-list',
                sortOrder: 357,
                moduleGroupId: 1,
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            });
        }

        const ifExistFailedOrderList = await getRepository(PermissionModule).findOne({
            where: { slugName: 'failed-order-list' },
        });
        if (!ifExistFailedOrderList) {
            await getRepository(PermissionModule).save({
                name: 'Failed Order List',
                slugName: 'failed-order-list',
                sortOrder: 358,
                moduleGroupId: 1,
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            });
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
