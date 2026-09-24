import { MigrationInterface, QueryRunner } from 'typeorm';
import { Plugins } from '../../api/core/models/Plugin';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AbondonedCartPluginRouteMigration1739594596613 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);

        const abandonedCartPlugin = await pluginRepository.findOne({
            where: {
                slugName: 'abandoned-cart',
            },
        });

        if (abandonedCartPlugin) {
            abandonedCartPlugin.routes = '~/api/vendor-cart~,~/api/vendor-cart/~,~/api/abandoned-cart-email~,~/api/cart-export~,~/api/admin-cart~,~/api/admin-cart/~,~/api/admin-cart/abandoned-cart-email~,~/api/guest-cart~,~/api/admin-cart/cart-export~';
            await pluginRepository.save(abandonedCartPlugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
