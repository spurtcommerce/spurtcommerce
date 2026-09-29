import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameNameForSomePermissionGroups1761722802264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Setting Localization → Localization Setting
        await queryRunner.query(`
            UPDATE vendor_permission_module_group
            SET name = 'Localization Setting', slug_name = 'localization-setting'
            WHERE name = 'Setting Localization';
        `);

        // Settings System → System Settings
        await queryRunner.query(`
            UPDATE vendor_permission_module_group
            SET name = 'System Settings', slug_name = 'system-settings'
            WHERE name = 'Settings System';
        `);

        // Settings Personalize → Personalize Settings
        await queryRunner.query(`
            UPDATE vendor_permission_module_group
            SET name = 'Personalize Settings', slug_name = 'personalize-settings'
            WHERE name = 'Settings Personalize';
        `);

        // Settings Order Status → Order Status Settings
        await queryRunner.query(`
            UPDATE vendor_permission_module_group
            SET name = 'Order Status Settings', slug_name = 'order-status-settings'
            WHERE name = 'Settings Order Status';
        `);

        // Settings Add-Ons → Add-Ons Settings
        await queryRunner.query(`
            UPDATE vendor_permission_module_group
            SET name = 'Add-Ons Settings', slug_name = 'add-ons-settings'
            WHERE name = 'Settings Add-Ons';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
