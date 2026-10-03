import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVendorPermissionModuleValue1755065751853 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO vendor_permission_module_group (name, slug_name, sort_order, created_date)
        VALUES ('Pages', 'pages', 38, NOW()),('Page Group', 'page-group', 39, NOW());`);

        const pages = await queryRunner.query(`
          SELECT module_group_id FROM vendor_permission_module_group WHERE slug_name = 'pages';`);

        const pagesId = pages[0]?.module_group_id;

        const pagesGroup = await queryRunner.query(`
            SELECT module_group_id FROM vendor_permission_module_group WHERE slug_name = 'page-group';`);

        const pagesGroupId = pagesGroup[0]?.module_group_id;

        await queryRunner.query(`
        INSERT INTO vendor_permission_module (name, slug_name, sort_order, module_group_id, is_listed, created_date)
        VALUES
        ('List Pages', 'list-pages', 1, ${pagesId}, 1, NOW()),
        ('Create Pages', 'create-pages', 2, ${pagesId}, 0, NOW()),
        ('Edit Pages', 'edit-pages', 3, ${pagesId}, 0, NOW()),
        ('Delete Pages', 'delete-pages', 4, ${pagesId}, 0, NOW()),
        ('Localization Pages', 'localization-pages', 5, ${pagesId}, 0, NOW()),
        ('List Page Group', 'list-page-group', 1, ${pagesGroupId}, 1, NOW()),
        ('Create Page Group', 'create-page-group', 2, ${pagesGroupId}, 0, NOW()),
        ('Edit Page Group', 'edit-page-group', 3, ${pagesGroupId}, 0, NOW()),
        ('Delete Page Group', 'delete-page-group', 4, ${pagesGroupId}, 0, NOW()),
        ('Localization Page Group', 'localization-page-group', 5, ${pagesGroupId}, 0, NOW());`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
