import { MigrationInterface, QueryRunner } from 'typeorm';
import { Plugins } from '../../api/core/models/Plugin';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddPlatformsImageINPlugin1744016301114 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);
        const shopifyPlugin = await pluginRepository.findOne({
            where: {
                slugName: 'shopify',
            },
        });

        if (shopifyPlugin) {
            shopifyPlugin.pluginAvatar = 'Img_1744017006521.png';
            shopifyPlugin.pluginAvatarPath = 'logo/';
            await pluginRepository.save(shopifyPlugin);
        }

        const magentoPlugin = await pluginRepository.findOne({
            where: {
                slugName: 'magento',
            },
        });

        if (magentoPlugin) {
            magentoPlugin.pluginAvatar = 'Img_1744017039513.png';
            magentoPlugin.pluginAvatarPath = 'logo/';
            await pluginRepository.save(magentoPlugin);
        }

        const woocommercePlugin = await pluginRepository.findOne({
            where: {
                slugName: 'woocommerce',
            },
        });

        if (woocommercePlugin) {
            woocommercePlugin.pluginAvatar = 'Img_1744005311505.png';
            woocommercePlugin.pluginAvatarPath = 'logo/';
            await pluginRepository.save(woocommercePlugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
