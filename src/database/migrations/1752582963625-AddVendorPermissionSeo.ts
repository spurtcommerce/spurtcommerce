import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVendorPermissionSeo1752582963625 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO vendor_permission_module_group (name, slug_name, sort_order, created_date)
        VALUES ('Seo', 'seo', 29, NOW());`);

        const seoGroup = await queryRunner.query(`
          SELECT module_group_id FROM vendor_permission_module_group WHERE slug_name = 'seo';`);

        const seoGroupId = seoGroup[0]?.module_group_id;

        await queryRunner.query(`
        INSERT INTO vendor_permission_module (name, slug_name, sort_order, module_group_id, is_listed, created_date)
        VALUES
        ('Product', 'seo-product', 1, ${seoGroupId}, 0, NOW()),
        ('Pages', 'seo-pages', 2, ${seoGroupId}, 0, NOW()),
        ('Category', 'seo-category', 3, ${seoGroupId}, 0, NOW()),
        ('Blog', 'seo-blog', 4, ${seoGroupId}, 0, NOW()),
        ('Site Map', 'seo-site-map', 5, ${seoGroupId}, 0, NOW());`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
