import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { Plugins } from '../../api/core/models/Plugin';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddRoutesForVendorAddons1739353617609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        // 1. Add new column "description"
        await queryRunner.addColumn('plugins', new TableColumn({
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
        }));

        const blogPlugin = await pluginRepository.findOne({
            where: {
                slugName: 'blog',
            },
        });

        if (blogPlugin) {
            blogPlugin.routes = '~/api/blog~,~/api/blog/~,~/api/blog-category~,~/api/blog/delete-multiple-blog~,~/api/blog/blog-detail~,~/api/blog/blog-count~,~/api/blog-category/~,~/api/blog-category/blog-category-detail~,~/api/blog-category/category-count~,~/api/blog-category/update-blog-category-status/~,~/api/list/related-blog-list~,~/api/list/blog/blog-detail/~,~/api/list/blog/blog-list~,~/api/vendor-blog-category~,~/api/vendor-blog-category/~,~/api/vendor-blog-category/blog-category-detail~,~/api/vendor-blog-category/category-count~,~/api/vendor-blog-category/update-blog-category-status/~,~/api/vendor-blog-category-translation/blog-category/~,~/api/vendor-blog-category-translation/blog-category~,~/api/vendor-blog~,~/api/vendor-blog/~,~/api/vendor-blog/delete-multiple-blog~,~/api/vendor-blog/blog-detail~,~/api/vendor-blog/blog-count~,~/api/vendor-blog-translation/blog/~,~/api/vendor-blog-translation/blog~';
            await pluginRepository.save(blogPlugin);
        }

        const productAttributePlugin = await pluginRepository.findOne({
            where: {
                slugName: 'product-attribute',
            },
        });

        if (productAttributePlugin) {
            productAttributePlugin.routes = '~/api/store-product-attributes/product/~,~/api/attribute~,~/api/product-attributes~,~/api/vendor-product-attribute~,~/api/attribute/~,~/api/attribute/get-attribute/~,~/api/attribute-group/~,~/api/attribute-group~,~/api/attribute-group/get-attribute-group/~,~/api/product-attributes/~,~/api/product-attributes/product-detail/~,~/api/store-product-attributes/product-detail/~,~/api/vendor-product-attribute/vendor-product-attribute-list~,~/api/vendor-product-attribute/update-vendor-product/~,~/api/vendor-product-attribute/vendor-product-attribute-detail/~,~/api/vendor-product-attribute/attribute-group~,~/api/vendor-product-specification/product/~,~/api/vendor-product-specification/products~,~/api/vendor-product-specification~,~/api/vendor-product-specification/attribute-slug/product/~,~/api/specification-translation/specification/~,~/api/specification-translation/specification~,~/api/attribute-group-translation/attribute-group/~,~/api/attribute-group-translation/attribute-group~,~/api/attribute-translation/attribute~,~/api/attribute-translation/attribute/~,~/api/product-specification/attribute-slug/product/~,~/api/product-specification/products~,~/api/product-specification/product/~,~/api/product-specification~,~/api/specification~,~/api/specification/~,~/api/specification/category~,~/api/vendor-specification~,~/api/vendor-specification/~,~/api/store-product-attributes~,~/api/specification/v2~,~/api/vendor-attribute~,~/api/vendor-attribute/~,~/api/vendor-attribute-group~,~/api/vendor-attribute-group/~,~/api/vendor-attribute-group-translation/attribute-group~,~/api/vendor-attribute-group-translation/attribute-group/~,~/api/vendor-attribute-translation/attribute~,~/api/vendor-attribute-translation/attribute/~,~/api/vendor-product-specification/product~,~/api/vendor-specification/~,~/api/vendor-specification/category~,~/api/vendor-specification-translation/specification/~,~/api/vendor-specification-translation/specification~,~/api/vendor-specification/v2~';
            await pluginRepository.save(productAttributePlugin);
        }

        const productQrCodePlugin = await pluginRepository.findOne({
            where: {
                slugName: 'product-qrcode',
            },
        });

        if (productQrCodePlugin) {
            productQrCodePlugin.routes = '~/api/qrCode/generate-qrcode~,~/api/qrCode/created-qrcode~,~/api/qrCode/delete-qr~,~/api/qrCode/download-qrimage/~,~/api/qrCode/qr-list~,~/api/qrCode/product-details/~,~/api/qrCode/detele-product/~,~/api/qrCode/product-list~,~/api/vendor-qrCode/created-qrcode~,~/api/vendor-qrCode/delete-qr~,~/api/vendor-qrCode/download-qrimage/~,~/api/vendor-qrCode/qr-list~,~/api/vendor-qrCode/product-details/~,~/api/vendor-qrCode/delete-product/~,~/api/vendor-qrCode/product-list~';
            await pluginRepository.save(productQrCodePlugin);
        }

        const productVariantPlugin = await pluginRepository.findOne({
            where: {
                slugName: 'product-variants',
            },
        });

        if (productVariantPlugin) {
            productVariantPlugin.routes = '~/api/vendor-product-variant/variants~,~/api/vendor-product-variant/product/~,~/api/vendor-product-variant~,~/api/vendor-product-variants~,~/api/product-variants~,~/api/store-product-variants~,~/api/variants~,~/api/variants/~,~/api/variants/varients-detail~,~/api/product-variants/~,~/api/product-variants/product-detail/~,~/api/product-variants/product-varient-inventory-list~,~/api/product-variants/product-varient-update-stock~,~/api/product-variants/update-product-id-sku~,~/api/store-product-variants/product-detail/~,~/api/vendor-product-variants/vendor-product-list~,~/api/vendor-product-variants/update-vendor-product~,~/api/vendor-product-variants/vendor-product-detail/~,~/api/vendor-product-variants/vendor-product-variant-inventory-list~,~/api/vendor-product-variants/vendor-product-varient-update-stock~,~/api/vendor-product-variants/delete-vendor-product-varient-option/~,~/api/vendor-product-variants/variants~,~/api/variant-translation/variant~,~/api/variant-translation/variant/~,~/api/product-variant~,~/api/product-variant/~,~/api/product-variant/product/~,~/api/product-variant/inventory~,~/api/product-variant/stock~,~/api/product-variant/sku~,~/api/product-variant/variant-option/~,~/api/variant~,~/api/variant/~,~/api/store-product-variant~,~/api/store-product-variant/product/~,~/api/vendor-product-variant/variant-option/~,~/api/vendor-product-variant/~,~/api/vendor-product-variant/inventory~,~/api/vendor-product-variant/stock~,~/api/vendor-variant~,~/api/vendor-variant/~,~/api/variant-translation/variant/~';
            await pluginRepository.save(productVariantPlugin);
        }

        const seoPlugin = await pluginRepository.findOne({
            where: {
                slugName: 'seo',
            },
        });

        if (seoPlugin) {
            seoPlugin.routes = '~/api/blog-seo~,~/api/blog-seo/~,~/api/category-seo~,~/api/category-seo/~,~/api/page-seo~,~/api/page-seo/~,~/api/product-seo~,~/api/product-seo/~,~/api/seo/product/~,~/api/seo/category/~,~/api/seo/page/~,~/api/seo/blog/~,~/api/vendor-product-seo~,~/api/vendor-product-seo/~,~/api/site-map~,~/api/site-map/~,~/api/site-map/get-sitemap~,~/api/vendor-blog-seo~,~/api/vendor-blog-seo/~,~/api/vendor-category-seo~,~/api/vendor-category-seo/~,~/api/vendor-page-seo~,~/api/vendor-page-seo/~,~/api/vendor-site-map~,~/api/vendor-site-map/~,~/api/vendor-site-map/get-sitemap~';
            await pluginRepository.save(seoPlugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
