import { MigrationInterface, QueryRunner } from 'typeorm';
import { Plugins } from '../../../../src/api/core/models/Plugin';
import { getDataSource } from '../../../../src/loaders/typeormLoader';

export class AddPluginTimestampInPaypal1679897095718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = getDataSource().getRepository(Plugins);
        const plugin = await repo.findOne({
            where: {
                pluginName: 'Paypal',
            },
        });
        if (plugin) {
            plugin.slugName = 'paypal';
            plugin.pluginTimestamp = 1648018102673; // This Add-on's Plugin Migration Timestamp
            await repo.save(plugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
