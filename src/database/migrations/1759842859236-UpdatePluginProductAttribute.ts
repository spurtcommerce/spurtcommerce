import { Plugins } from '../../../src/api/core/models/Plugin';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class UpdatePluginProductAttribute1759842859236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        const productAttributesPlugin = await pluginRepository.findOne({ where: { slugName: 'product-attribute' } });
        if (productAttributesPlugin) {
            productAttributesPlugin.id = productAttributesPlugin.id;
        }
        productAttributesPlugin.pluginName = 'ProductAttribute';
        productAttributesPlugin.pluginType = 'Catalog';
        productAttributesPlugin.pluginStatus = 1;
        productAttributesPlugin.isEditable = 1;
        productAttributesPlugin.pluginTimestamp = 1759842859236;
        productAttributesPlugin.displayName = 'Product Attributes';
        productAttributesPlugin.slugName = 'product-attribute';
        productAttributesPlugin.routes = '~/api/store-product-attributes~,~/api/attribute~,~api/attribute-group~,~/api/product-attributes~,~/api/vendor-product-attribute~,~/api/attribute/~,~/api/attribute/get-attribute/~,~/api/attribute-group/~,~/api/attribute-group~,~/api/attribute-group/get-attribute-group/~,~/api/product-attributes/~,~/api/product-attributes/product-detail/~,~/api/store-product-attributes/product-detail/~,~/api/vendor-product-attribute/vendor-product-attribute-list~,~/api/vendor-product-attribute/update-vendor-product/~,~/api/vendor-product-attribute/vendor-product-attribute-detail/~,~/api/vendor-product-attribute/attribute-group~,~/api/specification-translation/specification/~,~/api/specification-translation/specification~,~/api/attribute-group-translation/attribute-group/~,~/api/attribute-group-translation/attribute-group~,~/api/attribute-translation/attribute~,~/api/attribute-translation/attribute/~,~/api/product-specification/products~,~/api/specification~,~/api/specification/~,~/api/product-specification/product/~,~/api/specification/category~,~/api/store-product-variant/product/~,~/api/store-product-attributes/product/~,~/api/product-variant~,~/api/vendor-attribute~,~/api/vendor-specification~,~/api/vendor-specification/category~,~/api/vendor-attribute/~,~/api/vendor-attribute-group/~,~/api/vendor-attribute-group~,~/api/vendor-product-specification/product/~,~/api/vendor-product-specification/product~,~/api/vendor-specification/~,~/api/vendor-specification~,~/api/vendor-product-specification/attribute-slug/product/~,~/api/vendor-product-specification/attribute-slug/product~,~/api/vendor-product-specification/~,~/api/vendor-product-specification~,~/api/vendor-specification/vendor-family~,~/api/vendor-specification/vendor-category-list~,~/api/vendor-specification-translation/specification/~,~/api/vendor-specification-translation/specification~';
        productAttributesPlugin.pluginAvatar = 'ProductAttributes.png';
        productAttributesPlugin.pluginAvatarPath = 'addon/';
        productAttributesPlugin.pluginAdditionalInfo = '{"isSimplified":0}';
        await pluginRepository.save(productAttributesPlugin);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
