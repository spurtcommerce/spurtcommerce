import { MigrationInterface, QueryRunner } from 'typeorm';
import { Plugins } from '../../api/core/models/Plugin';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class UpdateColumnIsEditingForPlugin1744005861148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const pluginRepository = getDataSource().getRepository(Plugins);
        const slugNames = ['shopify', 'magento', 'woocommerce'];
        const plugins = await pluginRepository.find({
            where: slugNames.map(slug => ({ slugName: slug })),
        });
        if (plugins) {
            for (const plugin of plugins) {
                plugin.isEditable = 1;
            }

            await pluginRepository.save(plugins);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
