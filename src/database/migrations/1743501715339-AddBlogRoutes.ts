import { MigrationInterface, QueryRunner } from 'typeorm';
import { Plugins } from '../../api/core/models/Plugin';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddBlogRoutes1743501715339 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        const attributePlugin = await pluginRepository.findOne({
            where: {
                slugName: 'blog',
            },
        });

        if (attributePlugin) {
            attributePlugin.routes = '~/api/blog~,~/api/blog/~,~/api/blog-category~,~/api/blog/delete-multiple-blog~,~/api/blog/blog-detail~,~/api/blog/blog-count~,~/api/blog-category/~,~/api/blog-category/blog-category-detail~,~/api/blog-category/category-count~,~/api/blog-category/update-blog-category-status/~,~/api/list/related-blog-list~,~/api/list/blog/blog-detail/~,~/api/list/blog/blog-list~,~/api/vendor-blog-category~,~/api/vendor-blog-category/~,~/api/vendor-blog-category/blog-category-detail~,~/api/vendor-blog-category/category-count~,~/api/vendor-blog-category/update-blog-category-status/~,~/api/vendor-blog-category-translation/blog-category/~,~/api/vendor-blog-category-translation/blog-category~,~/api/vendor-blog~,~/api/vendor-blog/~,~/api/vendor-blog/delete-multiple-blog~,~/api/vendor-blog/blog-detail~,~/api/vendor-blog/blog-count~,~/api/vendor-blog-translation/blog/~,~/api/vendor-blog-translation/blog~';
            await pluginRepository.save(attributePlugin);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
