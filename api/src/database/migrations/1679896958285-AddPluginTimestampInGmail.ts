import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Plugins } from '../../../src/api/core/models/Plugin';

export class AddPluginTimestampInGmail1679896958285 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = getRepository(Plugins);
        const plugin = await repo.findOne({
            where: {
                pluginName: 'Gmail',
            },
        });
        if (plugin) {
            plugin.slugName = 'gmail';
            plugin.pluginTimestamp = 1648273222013; // This Add-on's Plugin Migration Timestamp
            await repo.save(plugin);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
