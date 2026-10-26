import { MigrationInterface, QueryRunner } from 'typeorm';
import { Plugins } from '../../../../src/api/core/models/Plugin';
import { getDataSource } from '../../../../src/loaders/typeormLoader';

export class AddPluginTimestampInRazorpay1679897259836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = getDataSource().getRepository(Plugins);
        const plugin = await repo.findOne({
            where: {
                pluginName: 'Razorpay',
            },
        });
        if (plugin) {
            plugin.slugName = 'razorpay';
            plugin.pluginTimestamp = 1648125221707; // This Add-on's Plugin Migration Timestamp
            await repo.save(plugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
