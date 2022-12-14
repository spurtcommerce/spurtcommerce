import moment from 'moment';
import {getRepository, MigrationInterface, QueryRunner} from 'typeorm';

export class AddWidgetPermission1647402175581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.query('SELECT * FROM `permission_module_group` WHERE `slug_name` = ' + '"wigdets"' );
        if (exist.length === 0) {
        const WidgetPermissionGroupSeed = [
            {
                // moduleGroupId: 5,
                name: 'Widgets',
                slugName: 'widgets',
                sortOrder: '63',
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        const val: any = await getRepository('PermissionModuleGroup').save(WidgetPermissionGroupSeed);
            if (val) {
                const WidgetPermissionSeed = [
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Add Widget',
                        slugName: 'add-widget',
                        sortOrder: '208',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Edit Widget',
                        slugName: 'edit-widget',
                        sortOrder: '209',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Widget list',
                        slugName: 'widget-list',
                        sortOrder: '300',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                    {
                        moduleGroupId: val[0].moduleGroupId,
                        name: 'Widget Delete',
                        slugName: 'widget-delete',
                        sortOrder: '301',
                        createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                        updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                    },
                ];
                await getRepository('PermissionModule').save(WidgetPermissionSeed);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ---
    }

}
