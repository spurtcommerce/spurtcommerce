import { MigrationInterface, QueryRunner } from 'typeorm';
import { Plugins } from '../../../../src/api/core/models/Plugin';
import { getDataSource } from '../../../../src/loaders/typeormLoader';

export class AddPluginTimestampInStripe1679897370508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = getDataSource().getRepository(Plugins);
        const plugin = await repo.findOne({
            where: {
                pluginName: 'Stripe',
            },
        });
        if (plugin) {
            plugin.slugName = 'stripe';
            plugin.pluginTimestamp = 1648122529616; // This Add-on's Plugin Migration Timestamp
            await repo.save(plugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
