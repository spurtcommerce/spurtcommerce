import {MigrationInterface, QueryRunner} from 'typeorm';

export class UpdateSeoDataPlugin1703851402775 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('update plugins set routes="~/api/blog-seo~,~/api/blog-seo/~,~/api/category-seo~,~/api/category-seo/~,~/api/page-seo~,~/api/page-seo/~,~/api/product-seo~,~/api/product-seo/~,~/api/seo/product/~,~/api/seo/category/~,~/api/seo/page/~,~/api/seo/blog/~,~/api/vendor-product-seo~,~/api/vendor-product-seo/~" where plugin_name = "Seo"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
