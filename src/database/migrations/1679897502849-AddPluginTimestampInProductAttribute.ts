import { MigrationInterface, QueryRunner } from 'typeorm';
import { Plugins } from '../../../src/api/core/models/Plugin';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddPluginTimestampInProductAttribute1679897502849 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = getDataSource().getRepository(Plugins);
        const plugin = await repo.findOne({
            where: {
                slugName: 'product-attribute',
            },
        });
        if (plugin) {
            plugin.pluginName = 'ProductAttribute';
            plugin.pluginTimestamp = 1665134310790; // This Add-on's Plugin Migration Timestamp
            await repo.save(plugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
