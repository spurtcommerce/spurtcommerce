import moment from 'moment';
import { PermissionModuleGroup } from '../../api/core/models/PermissionModuleGroup';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class AddSellerGroupPermissionModule1732521508422 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const exist: any = await getRepository('PermissionModuleGroup').findOne({ where: { slugName: 'market-place-vendor' } });
        if (exist) {
            exist.slugName = 'seller';
            exist.name = 'Seller';
            await getRepository('PermissionModuleGroup').save(exist);
        }
        const val2: any = await getRepository('PermissionModuleGroup').findOne({ where: { slugName: 'seller-group' } });

        if (!val2) {

            const sellerGroupPermissionModule = new PermissionModuleGroup();
            sellerGroupPermissionModule.name = 'Seller Group';
            sellerGroupPermissionModule.slugName = 'seller-group';
            sellerGroupPermissionModule.sortOrder = 20;
            sellerGroupPermissionModule.createdDate = `${moment().format('YYYY-MM-DD HH:mm:ss')}`;
            sellerGroupPermissionModule.modifiedDate = `${moment().format('YYYY-MM-DD HH:mm:ss')}`;

            const val3: any = await getRepository('PermissionModuleGroup').save(sellerGroupPermissionModule);

            const SellerGroupPermissionSeed = [
                {
                    moduleGroupId: val3.moduleGroupId,
                    name: 'Create Seller Group',
                    slugName: 'create-seller-group',
                    sortOrder: '315',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
                {
                    moduleGroupId: val3.moduleGroupId,
                    name: 'Update Seller Group',
                    slugName: 'update-seller-group',
                    sortOrder: '316',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
                {
                    moduleGroupId: val3.moduleGroupId,
                    name: 'List Seller Group',
                    slugName: 'list-seller-group',
                    sortOrder: '317',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
                {
                    moduleGroupId: val3.moduleGroupId,
                    name: 'Delete Seller Group',
                    slugName: 'delete-seller-group',
                    sortOrder: '318',
                    createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                },
            ];
            await getRepository('PermissionModule').save(SellerGroupPermissionSeed);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
