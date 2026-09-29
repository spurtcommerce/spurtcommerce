import { MigrationInterface, QueryRunner } from 'typeorm';
import { Plugins } from '../../api/core/models/Plugin';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class UpdateVariantPluginRoutes1743682343674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        const variantPlugin = await pluginRepository.findOne({
            where: {
                slugName: 'product-variants',
            },
        });

        if (variantPlugin) {
            variantPlugin.routes = '~/api/vendor-product-variants~,~/api/product-variants~,~/api/store-product-variants~,~/api/variants~,~/api/variants/~,~/api/variants/varients-detail~,~/api/product-variants/~,~/api/product-variants/product-detail/~,~/api/product-variants/product-varient-inventory-list~,~/api/product-variants/product-varient-update-stock~,~/api/product-variants/update-product-id-sku~,~/api/store-product-variants/product-detail/~,~/api/vendor-product-variants/vendor-product-list~,~/api/vendor-product-variants/update-vendor-product~,~/api/vendor-product-variants/vendor-product-detail/~,~/api/vendor-product-variants/vendor-product-variant-inventory-list~,~/api/vendor-product-variants/vendor-product-varient-update-stock~,~/api/vendor-product-variants/delete-vendor-product-varient-option/~,~/api/vendor-product-variants/variants~,~/api/variant-translation/variant~,~/api/variant-translation/variant/~,~/api/variant~,~/api/vendor-variant~,~/api/vendor-product-variant~';
            await pluginRepository.save(variantPlugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
