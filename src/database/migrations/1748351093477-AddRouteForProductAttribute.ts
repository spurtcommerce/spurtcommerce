import { MigrationInterface, QueryRunner } from 'typeorm';
import { Plugins } from '../../../src/api/core/models/Plugin';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddRouteForProductAttribute1748351093477 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        const existingPlugin = await pluginRepository.findOne({ where: { pluginName: 'ProductAttribute' } });
        if (!existingPlugin) {
            const attributePlugin = new Plugins();
            attributePlugin.pluginName = 'ProductAttribute';
            attributePlugin.pluginType = 'Catalog';
            attributePlugin.pluginAdditionalInfo = '{"isSimplified":0}';
            attributePlugin.pluginStatus = 1;
            attributePlugin.isEditable = 1;
            attributePlugin.pluginTimestamp = 1748351093477;
            attributePlugin.displayName = 'Product Attributes';
            attributePlugin.slugName = 'product-attribute';
            attributePlugin.routes = '~/api/store-product-attributes~,~/api/attribute~,~api/attribute-group~,~/api/product-attributes~,~/api/vendor-product-attribute~,~/api/attribute/~,~/api/attribute/get-attribute/~,~/api/attribute-group/~,~/api/attribute-group~,~/api/attribute-group/get-attribute-group/~,~/api/product-attributes/~,~/api/product-attributes/product-detail/~,~/api/store-product-attributes/product-detail/~,~/api/vendor-product-attribute/vendor-product-attribute-list~,~/api/vendor-product-attribute/update-vendor-product/~,~/api/vendor-product-attribute/vendor-product-attribute-detail/~,~/api/vendor-product-attribute/attribute-group~,~/api/specification-translation/specification/~,~/api/specification-translation/specification~,~/api/attribute-group-translation/attribute-group/~,~/api/attribute-group-translation/attribute-group~,~/api/attribute-translation/attribute~,~/api/attribute-translation/attribute/~,~/api/product-specification/products~,~/api/specification~,~/api/specification/~,~/api/product-specification/product/~,~/api/specification/category~,~/api/store-product-variant/product/~,~/api/store-product-attributes/product/~,~/api/product-variant~,~/api/vendor-attribute~,~/api/vendor-specification~,~/api/vendor-specification/category~,~/api/vendor-attribute/~,~/api/vendor-attribute-group/~,~/api/vendor-attribute-group~,~/api/vendor-product-specification/product/~,~/api/vendor-product-specification/product~,~/api/vendor-specification/~,~/api/vendor-specification~,~/api/vendor-product-specification/attribute-slug/product/~,~/api/vendor-product-specification/attribute-slug/product~,~/api/vendor-product-specification/~,~/api/vendor-product-specification~,~/api/vendor-specification/vendor-family~,~/api/vendor-specification/vendor-category-list~';
            await pluginRepository.save(attributePlugin);
        } else {
            existingPlugin.pluginName = 'ProductAttribute';
            existingPlugin.pluginType = 'Catalog';
            existingPlugin.pluginAdditionalInfo = '{"isSimplified":0}';
            existingPlugin.pluginStatus = 1;
            existingPlugin.isEditable = 1;
            existingPlugin.pluginTimestamp = 1748351093477;
            existingPlugin.displayName = 'Product Attributes';
            existingPlugin.slugName = 'product-attribute';
            existingPlugin.routes = '~/api/store-product-attributes~,~/api/attribute~,~api/attribute-group~,~/api/product-attributes~,~/api/vendor-product-attribute~,~/api/attribute/~,~/api/attribute/get-attribute/~,~/api/attribute-group/~,~/api/attribute-group~,~/api/attribute-group/get-attribute-group/~,~/api/product-attributes/~,~/api/product-attributes/product-detail/~,~/api/store-product-attributes/product-detail/~,~/api/vendor-product-attribute/vendor-product-attribute-list~,~/api/vendor-product-attribute/update-vendor-product/~,~/api/vendor-product-attribute/vendor-product-attribute-detail/~,~/api/vendor-product-attribute/attribute-group~,~/api/specification-translation/specification/~,~/api/specification-translation/specification~,~/api/attribute-group-translation/attribute-group/~,~/api/attribute-group-translation/attribute-group~,~/api/attribute-translation/attribute~,~/api/attribute-translation/attribute/~,~/api/product-specification/products~,~/api/specification~,~/api/specification/~,~/api/product-specification/product/~,~/api/specification/category~,~/api/store-product-variant/product/~,~/api/store-product-attributes/product/~,~/api/product-variant~,~/api/vendor-attribute~,~/api/vendor-specification~,~/api/vendor-specification/category~,~/api/vendor-attribute/~,~/api/vendor-attribute-group/~,~/api/vendor-attribute-group~,~/api/vendor-product-specification/product/~,~/api/vendor-product-specification/product~,~/api/vendor-specification/~,~/api/vendor-specification~,~/api/vendor-product-specification/attribute-slug/product/~,~/api/vendor-product-specification/attribute-slug/product~,~/api/vendor-product-specification/~,~/api/vendor-product-specification~,~/api/vendor-specification/vendor-family~,~/api/vendor-specification/vendor-category-list~';
            await pluginRepository.save(existingPlugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
