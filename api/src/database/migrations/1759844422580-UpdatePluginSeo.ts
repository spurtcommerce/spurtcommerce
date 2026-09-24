import { Plugins } from '../../../src/api/core/models/Plugin';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class UpdatePluginSeo1759844422580 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        const seoPlugin = await pluginRepository.findOne({ where: { slugName: 'seo' } });
        if (seoPlugin) {
            seoPlugin.id = seoPlugin.id;
        }
        seoPlugin.pluginName = 'Seo';
        seoPlugin.pluginType = 'CMS';
        seoPlugin.pluginStatus = 1;
        seoPlugin.isEditable = 0;
        seoPlugin.pluginTimestamp = 1759844422580;
        seoPlugin.displayName = 'SEO';
        seoPlugin.slugName = 'seo';
        seoPlugin.routes = '~/api/blog-seo~,~/api/blog-seo/~,~/api/category-seo~,~/api/category-seo/~,~/api/page-seo~,~/api/page-seo/~,~/api/product-seo~,~/api/product-seo/~,~/api/seo/product/~,~/api/seo/category/~,~/api/seo/page/~,~/api/seo/blog/~,~/api/vendor-product-seo~,~/api/vendor-product-seo/~,~/api/site-map~,~/api/site-map/~,~/api/site-map/get-sitemap~,~/api/vendor-blog-seo~,~/api/vendor-blog-seo/~,~/api/vendor-category-seo~,~/api/vendor-category-seo/~,~/api/vendor-page-seo~,~/api/vendor-page-seo/~,~/api/vendor-site-map~,~/api/vendor-site-map/~,~/api/vendor-site-map/get-sitemap~';
        seoPlugin.pluginAvatar = 'SEO.png';
        seoPlugin.pluginAvatarPath = 'addon/';
        await pluginRepository.save(seoPlugin);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
