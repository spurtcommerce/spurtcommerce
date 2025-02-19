import { Plugins } from '../../api/core/models/Plugin';
import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class UpdateSpecificationPluginRoute1713940499022 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = getRepository(Plugins);
        const plugin = await repo.findOne({
            where: {
                slugName: 'product-attribute',
            },
        });

        if (plugin) {
            plugin.routes = '~/api/store-product-attributes/product/~,~/api/attribute~,~api/attribute-group~,~/api/product-attributes~,~/api/vendor-product-attribute~,~/api/attribute/~,~/api/attribute/get-attribute/~,~/api/attribute-group/~,~/api/attribute-group~,~/api/attribute-group/get-attribute-group/~,~/api/product-attributes/~,~/api/product-attributes/product-detail/~,~/api/store-product-attributes/product-detail/~,~/api/vendor-product-attribute/vendor-product-attribute-list~,~/api/vendor-product-attribute/update-vendor-product/~,~/api/vendor-product-attribute/vendor-product-attribute-detail/~,~/api/vendor-product-attribute/attribute-group~,~/api/vendor-product-specification/product/~,~/api/vendor-product-specification/products~,~/api/vendor-product-specification~,~/api/vendor-product-specification/attribute-slug/product/~,~/api/specification-translation/specification/~,~/api/specification-translation/specification~,~/api/attribute-group-translation/attribute-group/~,~/api/attribute-group-translation/attribute-group~,~/api/attribute-translation/attribute~,~/api/attribute-translation/attribute/~,~/api/product-specification/attribute-slug/product/~,~/api/product-specification/products~,~/api/product-specification/product/~';
            await repo.save(plugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
