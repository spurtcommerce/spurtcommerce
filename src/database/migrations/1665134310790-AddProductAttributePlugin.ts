import { MigrationInterface, QueryRunner } from 'typeorm';
import moment = require('moment/moment');
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddProductAttributePlugin1665134310790 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const SeoSeed = [
            {
                pluginName: 'ProductAttribute',
                slugName: 'product-attribute',
                pluginAvatar: '',
                pluginAvatarPath: '',
                pluginType: 'Catalog',
                pluginTimestamp: 1665134310790,
                displayName: 'Product Attributes',
                pluginStatus: 1,
                isEditable: 0,
                routes: '~/api/store-product-attributes~,~/api/attribute~,~api/attribute-group~,~/api/product-attributes~,~/api/vendor-product-attribute~,~/api/attribute/~,~/api/attribute/get-attribute/~,~/api/attribute-group/~,~/api/attribute-group~,~/api/attribute-group/get-attribute-group/~,~/api/product-attributes/~,~/api/product-attributes/product-detail/~,~/api/store-product-attributes/product-detail/~,~/api/vendor-product-attribute/vendor-product-attribute-list~,~/api/vendor-product-attribute/update-vendor-product/~,~/api/vendor-product-attribute/vendor-product-attribute-detail/~,~/api/vendor-product-attribute/attribute-group~,~/api/specification-translation/specification/~,~/api/specification-translation/specification~,~/api/attribute-group-translation/attribute-group/~,~/api/attribute-group-translation/attribute-group~,~/api/attribute-translation/attribute~,~/api/attribute-translation/attribute/~,~/api/product-specification/products~,~/api/specification~,~/api/specification/~,~/api/product-specification/product/~,~/api/specification/category~,~/api/store-product-variant/product/~,~/api/store-product-attributes/product/~,~/api/product-variant~',
                createdDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
                updatedDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            },
        ];
        await getDataSource().getRepository('Plugins').save(SeoSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // ---
    }
}
